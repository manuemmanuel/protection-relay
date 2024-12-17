'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { aeonik } from './fonts'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Get email from profiles table using username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', username)
        .single()

      if (profileError || !profile) {
        setError('Username not found')
        return
      }

      // Login with email
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: profile.email,
        password
      })

      if (authError) {
        setError(authError.message)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.error('Error:', error)
      setError('An unexpected error occurred')
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-6 ${aeonik.className}`}>
      <div className="bg-gray-800 p-6 sm:p-10 rounded-3xl shadow-2xl w-full max-w-[450px] border border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 text-white tracking-tight">
          LOGIN
        </h1>
        <h2 className="text-lg sm:text-xl text-center mb-8 sm:mb-10 text-gray-300 font-light">
          Welcome back! Please sign in to continue
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
          <div className="space-y-1">
            <label className="text-base sm:text-lg text-gray-300 font-normal">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full mt-1 sm:mt-2 p-2.5 sm:p-3 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 
                text-white bg-gray-700 rounded-lg transition-all duration-300 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-base sm:text-lg text-gray-300 font-normal">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full mt-1 sm:mt-2 p-2.5 sm:p-3 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 
                text-white bg-gray-700 rounded-lg transition-all duration-300 placeholder-gray-400"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center bg-red-900/50 p-2.5 sm:p-3 rounded-lg border border-red-800">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 
                font-normal shadow-lg shadow-blue-900/50 text-base sm:text-lg"
            >
              Sign In to Dashboard
            </button>

            <button
              type="button"
              onClick={() => router.push('/register')}
              className="w-full bg-gray-700 text-white py-2.5 sm:py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 
                font-normal shadow-lg shadow-gray-900/50 border border-gray-600 text-base sm:text-lg"
            >
              Create New Account
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/forgot-password" 
            className="text-blue-400 hover:text-blue-300 hover:underline transition-colors duration-300 text-sm sm:text-base"
          >
            Forgot your password? Reset it here
          </Link>
        </div>
      </div>
    </div>
  )
}
