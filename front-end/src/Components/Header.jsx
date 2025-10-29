import React from 'react'

function Header() {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 w-max">
            <span className="relative inline-flex items-center justify-center h-8 w-6 sm:h-10 sm:w-7 rounded-b-full bg-black text-yellow-300 font-semibold">
              hd
            </span>
            <span className="leading-4 select-none">
              <span className="block text-sm sm:text-base font-medium text-gray-900">highway</span>
              <span className="block -mt-0.5 text-xs sm:text-sm text-gray-600">delite</span>
            </span>
          </a>

          {/* Search */}
          <form className="w-full sm:w-auto sm:flex-1" onSubmit={(e) => e.preventDefault()}>
            <div className="w-full sm:ml-auto sm:max-w-xl md:max-w-2xl">
              <div className="flex items-stretch gap-2">
                <input
                  type="text"
                  name="q"
                  placeholder="Search"
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