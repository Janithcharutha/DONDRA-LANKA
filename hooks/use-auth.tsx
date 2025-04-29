'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>; // Add this line
}

// Update the context default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  register: async () => {} // Add this line
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication only for protected admin routes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // List of public auth routes that don't need authentication
        const publicAuthRoutes = [
          '/admin/auth/login',
          '/admin/auth/register',
          '/admin/auth/forgot-password',
          '/admin/auth/reset-password'
        ]

        // Skip auth check for non-admin routes and public auth routes
        if (!pathname?.startsWith('/admin') || publicAuthRoutes.includes(pathname)) {
          setLoading(false)
          return
        }

        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (!token || !storedUser) {
          if (pathname?.startsWith('/admin')) {
            router.push('/admin/auth/login')
          }
          return
        }

        // Validate token with backend
        const response = await fetch('/api/auth/validate', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.ok) {
          setUser(JSON.parse(storedUser))
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          if (pathname?.startsWith('/admin')) {
            router.push('/admin/auth/login')
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Login failed')
      }

      const data = await response.json()
      
      if (!data.user || !data.token) {
        throw new Error('Invalid response from server')
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      setUser(data.user)
      
      router.push('/admin')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const logout = () => {
    try {
      // Clear auth state
      setUser(null)
      
      // Clear stored credentials
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      
      // Clear any auth cookies
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      
      // Redirect to login
      router.push('/admin/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  // Add auto-logout effect
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && user) {
        logout()
      }
    }

    const handleBeforeUnload = () => {
      if (user) {
        logout()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [user])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
    </div>
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      logout,
      register // Add this line
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  const router = useRouter() // Add this line

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  const { user, isAuthenticated, login, register } = context

  return {
    logout: async () => {
      try {
        // Clear stored credentials
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        // Clear any auth cookies
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        
        // Call logout API
        await fetch('/api/auth/logout', {
          method: 'POST'
        })
        
        // Redirect to login
        router.push('/admin/auth/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    },
    user,
    isAuthenticated,
    login,
    register
  }
}
