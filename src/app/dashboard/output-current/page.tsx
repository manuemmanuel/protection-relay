'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { aeonik } from '../../fonts'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'

export default function OutputCurrentDetails() {
  const router = useRouter()

  const data = Array.from({ length: 100 }, (_, i) => ({
    time: i,
    phaseA: Math.sin(i * 0.2),
    phaseB: Math.sin(i * 0.2 + 2),
    phaseC: Math.sin(i * 0.2 + 4),
  }))

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
          <h1 className="text-xl font-bold text-gray-100">Output Current</h1>
        </div>

        {/* Graph */}
        <div className="bg-gray-900/50 p-4 rounded-lg mb-6 h-64 border border-gray-700">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="time" />
              <YAxis />
              <Line type="monotone" dataKey="phaseA" stroke="#3B82F6" dot={false} />
              <Line type="monotone" dataKey="phaseB" stroke="#EAB308" dot={false} />
              <Line type="monotone" dataKey="phaseC" stroke="#EF4444" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Phase Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['A', 'B', 'C'].map((phase) => (
            <div key={phase} className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700">
              <h3 className="font-bold mb-3 text-gray-100">Phase {phase}</h3>
              <div className="space-y-2 text-gray-300">
                <p>Amplitude: <span className="text-blue-400">--</span></p>
                <p>Time Period: <span className="text-blue-400">--</span></p>
                <p>Present of Harmonics: <span className="text-green-400">None</span></p>
                <p>Present of Fault: <span className="text-green-400">None</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 