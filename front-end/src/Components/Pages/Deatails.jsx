import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function currency(amount) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  } catch (_) {
    return `₹${amount}`
  }
}

function Deatails() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [qty, setQty] = useState(1)

  useEffect(() => {
    let mounted = true
    const run = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`http://localhost:8000/api/experiences/${id}`)
        if (!mounted) return
        const payload = res.data?.data
        setData(payload)
        setSelectedDate(payload?.availableDates?.[0] || '')
      } catch (e) {
        if (!mounted) return
        setError('Failed to load details.')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    run()
    return () => {
      mounted = false
    }
  }, [id])

  const slots = useMemo(() => {
    if (!data || !selectedDate) return []
    return data.slotsByDate?.[selectedDate] || []
  }, [data, selectedDate])

  const subtotal = useMemo(() => {
    const price = selectedSlot?.price ?? data?.startsAt ?? 0
    return price * qty
  }, [selectedSlot, data, qty])

  const taxes = useMemo(() => Math.round(subtotal * 0.059), [subtotal])
  const total = subtotal + taxes

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-600">Loading…</div>
  }
  if (error || !data) {
    return <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-red-600">{error || 'Not found'}</div>
  }

  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
            <img src={data.imageUrl} alt={data.title} className="h-full w-full object-cover" />
          </div>

          <h1 className="mt-6 text-xl font-semibold text-gray-900">{data.title}</h1>
          <p className="mt-2 text-sm text-gray-700">
            {data.description} Helmet and Life jackets along with an expert will accompany in {data.title.toLowerCase()}.
          </p>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">Choose date</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.availableDates.map((d) => {
                const dateObj = new Date(d)
                const label = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
                const isActive = selectedDate === d
                return (
                  <button
                    key={d}
                    onClick={() => { setSelectedDate(d); setSelectedSlot(null) }}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${isActive ? 'bg-yellow-400 border-yellow-400 text-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">Choose time</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {slots.map((slot) => {
                const isSold = slot.soldOut || slot.left <= 0
                const isActive = selectedSlot?.id === slot.id
                return (
                  <button
                    disabled={isSold}
                    onClick={() => setSelectedSlot(slot)}
                    key={slot.id}
                    className={`group rounded-md border px-3 py-2 text-xs text-left transition ${isSold ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' : isActive ? 'border-yellow-400 bg-yellow-50 text-gray-900' : 'bg-white border-gray-200 text-gray-800 hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{slot.label}</span>
                      {!isSold && (
                        <span className="text-[10px] text-gray-500">{slot.left} left</span>
                      )}
                      {isSold && <span className="text-[10px] text-gray-500">Sold out</span>}
                    </div>
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-[11px] text-gray-500">All times are in IST (GMT +5:30)</p>
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900">About</h2>
            <div className="mt-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-700">
              {data.about}
            </div>
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="divide-y divide-gray-200">
              <div className="p-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Starts at</span>
                <span className="font-semibold text-gray-900">{currency(data.startsAt)}</span>
              </div>
              <div className="p-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Quantity</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-6 w-6 grid place-items-center rounded border border-gray-300 text-gray-700">-</button>
                  <span className="w-6 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="h-6 w-6 grid place-items-center rounded border border-gray-300 text-gray-700">+</button>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{currency(subtotal)}</span>
              </div>
              <div className="p-4 flex items-center justify-between text-sm">
                <span className="text-gray-600">Taxes</span>
                <span className="text-gray-900">{currency(taxes)}</span>
              </div>
              <div className="p-4 flex items-center justify-between text-base font-semibold">
                <span className="text-gray-900">Total</span>
                <span className="text-gray-900">{currency(total)}</span>
              </div>
              <div className="p-4">
                <button
                  disabled={!selectedSlot}
                  className={`w-full rounded-md px-4 py-2 text-sm font-medium ${selectedSlot ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default Deatails