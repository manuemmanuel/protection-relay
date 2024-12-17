'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { aeonik } from '../fonts'
import dynamic from 'next/dynamic'

// Dynamically import the component with no SSR
const Register = dynamic(() => Promise.resolve(RegisterComponent), {
  ssr: false,
})

function RegisterComponent() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [securityPin, setSecurityPin] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [registrationComplete, setRegistrationComplete] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      // First check if username already exists
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

      if (existingUser) {
        setError('Username already taken')
        return
      }

      // Create auth user with email and password
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            security_pin: securityPin
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Create profile entry
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              username,
              email,
              security_pin: securityPin
            }
          ])

        if (profileError) {
          setError(profileError.message)
          return
        }
      }

      setRegistrationComplete(true)
    } catch (error) {
      console.error('Error:', error)
      setError('An unexpected error occurred')
    }
  }

  if (registrationComplete) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8 sm:py-12 ${aeonik.className}`}>
        <div className="bg-gray-800 p-6 sm:p-12 rounded-3xl shadow-2xl w-full max-w-[320px] sm:max-w-[520px] border border-gray-700">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-white tracking-tight">
            Registration Successful!
          </h1>
          <p className="text-lg text-center mb-8 text-gray-300">
            Please check your email ({email}) to confirm your account.
          </p>
          <p className="text-base text-center mb-8 text-gray-400">
            Once confirmed, you can proceed to login.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 
              font-normal shadow-lg shadow-blue-900/50 text-base sm:text-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 py-8 sm:py-12 ${aeonik.className}`}>
      <div className="bg-gray-800 p-6 sm:p-12 rounded-3xl shadow-2xl w-full max-w-[320px] sm:max-w-[520px] border border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-white tracking-tight">
          REGISTER
        </h1>
        <h2 className="text-lg sm:text-xl text-center mb-8 sm:mb-12 text-gray-300 font-light">
          Create your account to get started
        </h2>
        
        <form onSubmit={handleRegister} className="space-y-6 sm:space-y-10">
          <div className="space-y-1">
            <label className="text-base sm:text-lg text-gray-300 font-normal">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full mt-1 sm:mt-2 p-2.5 sm:p-3 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 
                text-white bg-gray-700 rounded-lg transition-all duration-300 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-base sm:text-lg text-gray-300 font-normal">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
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
              placeholder="Create a password"
              className="w-full mt-1 sm:mt-2 p-2.5 sm:p-3 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 
                text-white bg-gray-700 rounded-lg transition-all duration-300 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-base sm:text-lg text-gray-300 font-normal">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full mt-1 sm:mt-2 p-2.5 sm:p-3 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 
                text-white bg-gray-700 rounded-lg transition-all duration-300 placeholder-gray-400"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-base sm:text-lg text-gray-300 font-normal">Security PIN</label>
            <input
              type="password"
              value={securityPin}
              onChange={(e) => setSecurityPin(e.target.value)}
              placeholder="Enter a 4-digit PIN"
              maxLength={4}
              pattern="[0-9]{4}"
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
              Create Account
            </button>

            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full bg-gray-700 text-white py-2.5 sm:py-3 rounded-xl hover:bg-gray-600 transition-all duration-300 
                font-normal shadow-lg shadow-gray-900/50 border border-gray-600 text-base sm:text-lg"
            >
              Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Export the wrapped component
export default Register 