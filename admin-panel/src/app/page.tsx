'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/auth'
import LoginForm from '@/components/LoginForm'


export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (AuthService.isAuthenticated() && AuthService.isAdmin()) {
      router.replace('/dashboard')
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            CoolAir Admin Panel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to access the administration dashboard
          </p>
        </div>
        
        <LoginForm />
      </div>
    </div>
  )
}
