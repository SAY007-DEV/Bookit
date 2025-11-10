import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

function formatCurrencyINR(amount) {
  try {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount)
  } catch (e) {
    return `₹${amount}`
  }
}

function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const query = (params.get('q') || '').trim().toLowerCase()

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await axios.get('https://bookit-b53v.onrender.com/api/experiences')
        if (!isMounted) return
        setItems(res.data?.data ?? [])
      } catch (err) {
        if (!isMounted) return
        setError('Failed to load experiences. Please try again.')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMounted = false
    }
  }, [])

  const filtered = useMemo(() => {
    if (!query) return items
    return items.filter((e) => {
      const title = (e.title || '').toLowerCase()
      const placeA = (e.locationTag || '').toLowerCase()
      const placeB = (e.cityTag || '').toLowerCase()
      return title.includes(query) || placeA.includes(query) || placeB.includes(query)
    })
  }, [items, query])

  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {loading && (
          <div className="text-center text-sm text-gray-600">Please wait...Loading experiences…</div>
        )}
        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((exp) => (
              <article key={exp.id} className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
                <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                  <img
                    src={exp.imageUrl}
                    alt={exp.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-gray-900 font-medium">{exp.title}</h3>
                    {exp.locationTag && (
                      <span className="shrink-0 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 border border-gray-200">{exp.locationTag}</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {exp.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      <span className="mr-1 text-gray-500">From</span>
                      <span className="font-semibold">{formatCurrencyINR(exp.priceFrom)}</span>
                    </div>
                    <Link
                      to={`/details/${exp.id}`}
                      className="rounded-md bg-yellow-400 px-3 py-2 text-xs font-medium text-gray-900 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center text-sm text-gray-600">No experiences found for "{query}"</div>
        )}
      </div>
    </main>
  )
}

export default Home