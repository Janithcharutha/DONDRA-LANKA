"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user type
type User = {
  id: string
  name: string
  email: string
  role: string
}

// Define auth context type
type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider props
type AuthProviderProps = {
  children: ReactNode
}

// Mock users for demo
const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin",
  },
]

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

    if (!foundUser) {
      throw new Error("Invalid email or password")
    }

    // Create user object without password
    const { password: _, ...userWithoutPassword } = foundUser
    setUser(userWithoutPassword)

    // Store in localStorage for persistence
    localStorage.setItem("user", JSON.stringify(userWithoutPassword))
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would make an API call
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (existingUser) {
      throw new Error("Email already in use")
    }

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      password,
      role: "admin",
    }

    // Add to mock users (in a real app, this would be saved to a database)
    mockUsers.push(newUser)

    // Note: We don't automatically log in after registration
    return
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
