'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { aeonik } from '../fonts'

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString())
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
      setCurrentDate(now.toLocaleDateString())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const menuItems = [
    { title: 'Customization', href: '#' },
    { title: 'Settings', href: '#' },
    { title: 'Self-Diagnosis Test', href: '#' },
    { title: 'Instruction Manual', href: '#' },
    { title: 'About Us', href: '#' },
  ]
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-4 flex flex-col ${aeonik.className}`}>
      {/* Main content wrapper */}
      <div className="flex-grow">
        {/* Sidebar */}
        <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-50 border-l border-gray-700
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-gray-100 text-xl font-bold">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <nav className="space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="block p-3 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Backdrop */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Header */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 mb-3 sm:mb-4 shadow-lg 
          hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300">
          {/* Mobile Header */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-2">
              <button 
                onClick={() => setIsSidebarOpen(true)} 
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-gray-100 text-lg font-bold tracking-wide">
                SST PROTECTION RELAY
              </h1>
              <div className="w-8"></div>
            </div>
            <div className="flex justify-center space-x-4 text-sm text-gray-300">
              <div className="w-32 text-right">
                <span className="font-bold text-blue-400">Time: </span>
                <span className="tracking-wide">{currentTime}</span>
              </div>
              <div className="w-36">
                <span className="font-bold text-blue-400">Date: </span>
                <span className="tracking-wide">{currentDate}</span>
              </div>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="w-40 text-gray-300">
                <span className="font-bold text-blue-400">Time: </span>
                <span className="tracking-wide">{currentTime}</span>
              </div>
              <div className="w-44 text-gray-300">
                <span className="font-bold text-blue-400">Date: </span>
                <span className="tracking-wide">{currentDate}</span>
              </div>
            </div>
            <h1 className="text-gray-100 text-xl font-bold text-center tracking-wide flex-1 px-4">
              Solid State Transformer Protection Relay
            </h1>
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="text-gray-300 hover:text-white transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-3 sm:mb-4">
          {/* Relay Indication */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent 
                animate-shine-slow"></div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-100">Relay Indication</h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <p>Relay Status : <span className="text-green-400 font-medium">Healthy and Operational</span></p>
              <p>Relay Configuration : <span className="text-blue-400 font-medium">3-ph AC to 3-ph AC</span></p>
              <p className="flex flex-col sm:flex-row sm:space-x-4">
                <span>Input : <span className="text-green-400 font-medium">Healthy</span></span>
                <span>Output : <span className="text-green-400 font-medium">Healthy</span></span>
              </p>
              <p>Circuit Breaker Status: <span className="text-green-400 font-medium">Live</span></p>
              <p>Fault Status: <span className="text-green-400 font-medium">None</span></p>
            </div>
            <div className="flex space-x-4 mt-4">
              <button className="px-8 bg-blue-500/80 hover:bg-blue-600 text-white py-1.5 rounded-lg transition-colors shadow-lg text-sm sm:text-base backdrop-blur-sm
                hover:shadow-blue-500/25">Trip</button>
              <button className="px-8 bg-blue-500/80 hover:bg-blue-600 text-white py-1.5 rounded-lg transition-colors shadow-lg text-sm sm:text-base backdrop-blur-sm
                hover:shadow-blue-500/25">Reset</button>
            </div>
          </div>

          {/* Energy Monitoring */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent 
                animate-shine-slow"></div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-100">Energy Monitoring</h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-300">
              <p>Active Energy : <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              <p>Reactive Energy : <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              <p>Apparent Power : <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              <p>Power Factor : <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              <p>Load Connected : <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              <p>Energy Consumption : <span className="text-blue-400 font-medium tracking-wide">--</span></p>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Input Current */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Input Current</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Phase A: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase B: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase C: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/input-current"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Input Voltage */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Input Voltage</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Phase A: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase B: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase C: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/input-voltage"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Output Current */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Output Current</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Phase A: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase B: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase C: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/output-current"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Output Voltage */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Output Voltage</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Phase A: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase B: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase C: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/output-voltage"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Frequency */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Frequency</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Phase A: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase B: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Phase C: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/frequency"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Over-Voltage Fault */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Over-Voltage Fault</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Set Voltage: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Set Time-Chara: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/over-voltage-fault"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Over-Current Fault */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden flex flex-col">
            <div>
              <h3 className="font-bold mb-2 text-gray-100 text-sm sm:text-base">Over-Current Fault</h3>
              <div className="space-y-1 text-sm sm:text-base text-gray-300">
                <p>Set Current: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
                <p>Set Time-Chara: <span className="text-blue-400 font-medium tracking-wide">--</span></p>
              </div>
            </div>
            <div className="mt-auto pt-3">
              <Link 
                href="/dashboard/over-current-fault"
                className="w-full inline-flex items-center justify-center px-4 py-1.5 bg-blue-500/80 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg text-sm backdrop-blur-sm hover:shadow-blue-500/25"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Add Button */}
          <div className="group bg-gray-800/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-700 shadow-lg 
            hover:bg-gray-800/60 hover:border-gray-600 hover:shadow-blue-900/20 transition-all duration-300 relative overflow-hidden">
            <button className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl text-blue-400 hover:text-blue-300 transition-colors">
              +
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2">
            <div className="text-gray-400 text-sm">
              © 2024 Solid State Transformer Protection Relay.
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Version 1.0.0</span>
              <span className="text-gray-400 text-sm">|</span>
              <span className="text-gray-400 text-sm">Last Updated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 