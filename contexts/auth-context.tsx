"use client"
// feat: add firebase auth - loginm register logout
import React, { createContext, useContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const docRef = doc(db, "usuarios", firebaseUser.uid)
        const snap = await getDoc(docRef)

        if (snap.exists()) {
          const data = snap.data()
          setUser({
            id: firebaseUser.uid,
            name: data.nome,
            email: firebaseUser.email || "",
            role: data.role,
            avatar: data.avatar || undefined,
          })
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role: "customer" | "seller") => {
    setIsLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const user = result.user

      await setDoc(doc(db, "usuarios", user.uid), {
        nome: name,
        email,
        role,
        avatar: "",
        criadoEm: new Date(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
