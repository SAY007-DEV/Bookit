import React from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const initialQ = params.get('q') || ''
  const [q, setQ] = useState(initialQ)

  useEffect(() => {
    const p = new URLSearchParams(search)
    setQ(p.get('q') || '')
  }, [search])
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 w-max">
            <img src="/vite.svg" alt="logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
            <span className="leading-4 select-none">
              <span className="block text-sm sm:text-base font-medium text-gray-900">highway</span>
              <span className="block -mt-0.5 text-xs sm:text-sm text-gray-600">delite</span>
            </span>
          </Link>

          {/* Search */}
          <form
            className="w-full sm:w-auto sm:flex-1"
            onSubmit={(e) => {
              e.preventDefault()
              const query = q.trim()
              const target = query ? `/?q=${encodeURIComponent(query)}` : '/'
              navigate(target)
            }}
          >
            <div className="w-full sm:ml-auto sm:max-w-xl md:max-w-2xl">
              <div className="flex items-stretch gap-2">
                <input
                  type="text"
                  name="q"
                  placeholder="Search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="w-full rounded-md border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 transition"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Header