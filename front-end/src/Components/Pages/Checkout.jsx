import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

function currency(amount) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  } catch (_) {
    return `₹${amount}`
  }
}

function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()

  if (!state) {
    navigate('/')
    return null
  }

  const { title, date, time, qty, subtotal, taxes, total, experienceId } = state

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [agree, setAgree] = useState(true)
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const [applying, setApplying] = useState(false)

  const isEmailValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  const isValid = fullName.trim().length > 0 && isEmailValid(email) && agree

  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-lg font-semibold text-gray-900">Checkout</h1>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2">
            <div className="rounded-lg bg-gray-50 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Full name</label>
                  <input
                    required
                    value={fullName}
                    placeholder='John Doe'
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email} 
                    placeholder='example@example.com'
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border border-gray-200 bg-gray-200 px-3 py-2 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">Promo code</label>
                  <div className="flex gap-3">
                    <input value={promo} onChange={(e) => setPromo(e.target.value)} className="flex-1 rounded-md border border-gray-200 bg-gray-200 px-3 py-2 text-sm" />
                    <button
                      type="button"
                      onClick={async () => {
                        setApplying(true)
                        try {
                          const res = await axios.post('http://localhost:8000/api/promo/validate', { subtotal, code: promo })
                          setDiscount(res.data?.data?.discount || 0)
                        } finally {
                          setApplying(false)
                        }
                      }}
                      className="rounded-md bg-gray-800 text-white px-4 py-2 text-sm disabled:opacity-70"
                      disabled={applying}
                    >
                      {applying ? 'Applying…' : 'Apply'}
                    </button>
                  </div>
                </div>
                <label className="flex items-center gap-2 text-xs text-gray-700 md:col-span-2">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="h-3 w-3" />
                  I agree to the terms and safety policy
                </label>
              </div>
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="rounded-lg border border-gray-200 bg-white">
              <div className="p-4 border-b border-gray-200">
                <div className="text-sm text-gray-600">Experience</div>
                <div className="text-gray-900">{title}</div>
              </div>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between text-sm">
                <span className="text-gray-600">Date</span>
                <span className="text-gray-900">{date}</span>
              </div>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between text-sm">
                <span className="text-gray-600">Time</span>
                <span className="text-gray-900">{time}</span>
              </div>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between text-sm">
                <span className="text-gray-600">Qty</span>
                <span className="text-gray-900">{qty}</span>
              </div>
              <div className="p-4 border-b border-gray-200 flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{currency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="p-4 border-b border-gray-200 flex items-center justify-between text-sm text-green-700">
                  <span>Promo discount</span>
                  <span>-{currency(discount)}</span>
                </div>
              )}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between text-sm">
                <span className="text-gray-600">Taxes</span>
                <span className="text-gray-900">{currency(taxes)}</span>
              </div>
              <div className="p-4 flex items-center justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{currency(Math.max(total - discount, 0))}</span>
              </div>
              <div className="p-4">
                <button
                  disabled={!isValid}
                  onClick={() => {
                    if (!isValid) return
                    // Generate a short, user-friendly reference id
                    const ref = Math.random().toString(36).slice(2, 6).toUpperCase() +
                      Math.random().toString(36).slice(2, 6).toUpperCase()
                    // save booking
                    axios.post('http://localhost:8000/api/bookings', {
                      experienceId,
                      title,
                      date,
                      time,
                      qty,
                      subtotal,
                      taxes,
                      discount,
                      total: Math.max(total - discount, 0),
                      customerName: fullName,
                      email,
                      promoCode: promo,
                      refId: ref,
                    }).finally(() => {
                      navigate('/result', { state: { refId: ref } })
                    })
                  }}
                  className={`w-full rounded-md px-4 py-2 text-sm font-medium ${isValid ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  Pay and Confirm
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

export default Checkout