"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "customer" | "seller"
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: "customer" | "seller") => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula verificação de autenticação
    const storedUser = localStorage.getItem("teko-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulação de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Usuário de exemplo
      const mockUser: User = {
        id: "1",
        name: "Usuário Teste",
        email,
        role: email.includes("seller") ? "seller" : "customer",
      }

      setUser(mockUser)
      localStorage.setItem("teko-user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "customer" | "seller") => {
    setIsLoading(true)
    try {
      // Simulação de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role,
      }

      setUser(mockUser)
      localStorage.setItem("teko-user", JSON.stringify(mockUser))
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("teko-user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
