import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const refId = state?.refId || (Math.random().toString(36).slice(2, 6).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase())

  return (
    <main className="w-full min-h-[60vh] grid place-items-center bg-white">
      <div className="text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="h-8 w-8">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Booking Confirmed</h1>
        <p className="mt-2 text-sm text-gray-600">Ref ID: {refId}</p>
        <div className="mt-6">
          <button onClick={() => navigate('/')} className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300">Back to Home</button>
        </div>
      </div>
    </main>
  )
}

export default Result