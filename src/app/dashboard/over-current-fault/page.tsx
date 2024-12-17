'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { aeonik } from '../../fonts'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function OverCurrentFaultDetails() {
  const router = useRouter()

  const data = [
    { category: 'Category 1', series1: 45, series2: 70 },
    { category: 'Category 2', series1: 35, series2: 80 },
    { category: 'Category 3', series1: 45, series2: 65 },
    { category: 'Category 4', series1: 40, series2: 60 },
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-2 sm:p-4 ${aeonik.className}`}>
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-lg">
        {/* Header with Back Button */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()} 
            className="text-gray-300 hover:text-white transition-colors mr-4"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-gray-100">Over-Current Fault</h1>
        </div>

        {/* Graph */}
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6 h-80 border border-gray-700">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="category" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                unit="%"
              />
              <Line 
                type="monotone" 
                dataKey="series1" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6' }}
              />
              <Line 
                type="monotone" 
                dataKey="series2" 
                stroke="#F97316" 
                strokeWidth={2}
                dot={{ fill: '#F97316' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
            <h3 className="font-bold mb-3 text-gray-100">Set Current</h3>
            <div className="space-y-2 text-gray-300">
              <p>Current Value: <span className="text-blue-400">--</span></p>
              <p>Threshold: <span className="text-blue-400">--</span></p>
              <p>Status: <span className="text-green-400">Normal</span></p>
            </div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
            <h3 className="font-bold mb-3 text-gray-100">Set Time-Characteristics</h3>
            <div className="space-y-2 text-gray-300">
              <p>Response Time: <span className="text-blue-400">--</span></p>
              <p>Reset Time: <span className="text-blue-400">--</span></p>
              <p>Mode: <span className="text-blue-400">Automatic</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 