"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor, informe seu e-mail")
      return
    }

    setIsLoading(true)

    try {
      // Simulação de envio para API
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      setError("Ocorreu um erro ao processar sua solicitação. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container max-w-md">
          <Link href="/login" className="inline-flex items-center text-sm hover:text-terracota mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para login
          </Link>

          <div className="rounded-lg border p-6">
            {!isSubmitted ? (
              <>
                <div className="mb-6 text-center">
                  <h1 className="text-2xl font-bold">Recuperar Senha</h1>
                  <p className="mt-2 text-muted-foreground">
                    Informe seu e-mail e enviaremos instruções para redefinir sua senha
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Seu e-mail"
                        className="pl-9"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
                  </div>

                  <Button type="submit" className="w-full bg-terracota hover:bg-terracota-dark" disabled={isLoading}>
                    {isLoading ? "Enviando..." : "Enviar Instruções"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold">E-mail Enviado</h2>
                <p className="mt-2 text-muted-foreground">
                  Enviamos instruções para redefinir sua senha para {email}. Por favor, verifique sua caixa de entrada e
                  spam.
                </p>
                <div className="mt-6">
                  <Link href="/login">
                    <Button variant="outline" className="w-full">
                      Voltar para Login
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
