'use client'

import { useEffect, useState } from 'react'

export default function HealthCheck() {
  const [status, setStatus] = useState<{
    backend: boolean
    message: string
  }>({ backend: false, message: 'Checking...' })

  useEffect(() => {
    checkBackendHealth()
  }, [])

  const checkBackendHealth = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
      console.log('Checking backend health at:', API_URL)
      
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        setStatus({
          backend: true,
          message: `Backend connected: ${data.message} (${data.database})`
        })
      } else {
        setStatus({
          backend: false,
          message: `Backend error: ${response.status} ${response.statusText}`
        })
      }
    } catch (error) {
      console.error('Health check error:', error)
      setStatus({
        backend: false,
        message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      })
    }
  }

  return (
    <div className={`p-4 rounded-md ${status.backend ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
      <div className="flex items-center">
        <div className={`flex-shrink-0 w-2 h-2 rounded-full mr-2 ${status.backend ? 'bg-green-400' : 'bg-red-400'}`}></div>
        <span className="text-sm font-medium">{status.message}</span>
      </div>
      <button 
        onClick={checkBackendHealth}
        className="mt-2 text-xs underline hover:no-underline"
      >
        Recheck Connection
      </button>
    </div>
  )
}