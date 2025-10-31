import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-gray-200 via-white to-white py-8 border-t border-gray-200 mt-8 text-gray-700">
      <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center px-4 gap-4">
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center sm:items-start">
          <span className="font-extrabold text-lg tracking-tight text-blue-700">BookIt</span>
          <span className="text-xs text-gray-500">Curated Experiences & Slots</span>
        </div>
        {/* Navigation Links */}
        
        {/* Social Links */}
        
      </div>
      <div className="mt-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} BookIt. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer