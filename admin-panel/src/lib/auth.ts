'use client'

export interface User {
  id: number
  email: string
  name?: string
  role: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: User
  token?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export class AuthService {
  private static TOKEN_KEY = 'admin_token'
  private static USER_KEY = 'admin_user'

  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  static getUser(): User | null {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem(this.USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }

  static setAuth(token: string, user: User): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(user))
  }

  static clearAuth(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  static isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser()
  }

  static isAdmin(): boolean {
    const user = this.getUser()
    return user?.role === 'admin'
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      console.log('Attempting login to:', `${API_BASE_URL}/api/auth/login`)
      
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (response.ok && data.token && data.user) {
        // Check if user is admin
        if (data.user.role !== 'admin') {
          return {
            success: false,
            message: 'Access denied. Admin privileges required.',
          }
        }

        this.setAuth(data.token, data.user)
        return {
          success: true,
          message: data.message,
          user: data.user,
          token: data.token,
        }
      }

      return {
        success: false,
        message: data.message || 'Login failed',
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        message: 'Network error. Please try again.',
      }
    }
  }

  static logout(): void {
    this.clearAuth()
    if (typeof window !== 'undefined') {
      window.location.href = '/login'
    }
  }

  static getAuthHeaders(): Record<string, string> {
    const token = this.getToken()
    return token
      ? {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      : {
          'Content-Type': 'application/json',
        }
  }
}