"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import { loginSchema, registerSchema, type LoginFormValues, type RegisterFormValues } from "@/lib/validations/auth"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, register: registerUser } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(() => {
    return searchParams.get("role") ? "register" : "login"
  })

  // Formulário de login com validação Zod
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Formulário de registro com validação Zod
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: (searchParams.get("role") as "customer" | "seller") || "customer",
    },
  })

  // Estado para erros gerais
  const [errors, setErrors] = useState({
    login: "",
    register: "",
  })

  const onLoginSubmit = async (values: LoginFormValues) => {
    setErrors({ ...errors, login: "" })

    try {
      setIsLoading(true)
      await login(values.email, values.password)
      router.push("/")
    } catch (error) {
      setErrors({ ...errors, login: "Erro ao fazer login. Verifique suas credenciais." })
    } finally {
      setIsLoading(false)
    }
  }

  const onRegisterSubmit = async (values: RegisterFormValues) => {
    setErrors({ ...errors, register: "" })

    try {
      setIsLoading(true)
      await registerUser(values.name, values.email, values.password, values.role)
      router.push("/")
    } catch (error) {
      setErrors({ ...errors, register: "Erro ao criar conta. Tente novamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:block relative">
          <div className="absolute inset-0 bg-terracota/80 z-10 flex items-center justify-center">
            <div className="text-white max-w-md p-8">
              <Image src="/logo.png" alt="Teko" width={80} height={80} className="mb-6" />
              <h1 className="font-marseille text-4xl font-bold mb-4">Bem-vindo ao Teko</h1>
              <p className="text-lg mb-6">
                Conectamos artesãos do norte do Brasil com pessoas que valorizam produtos autênticos, sustentáveis e com
                história.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Produtos artesanais autênticos do norte do Brasil</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Apoio direto aos artesãos e comunidades locais</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-white/20 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p>Compromisso com a sustentabilidade e bioeconomia</p>
                </div>
              </div>
            </div>
          </div>
          <Image src="/placeholder.svg?height=900&width=800" alt="Artesanato amazônico" fill className="object-cover" />
        </div>

        <div className="flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="teko-heading text-3xl font-bold text-terracota">Acesse sua conta</h2>
              <p className="text-muted-foreground">Faça login ou crie sua conta para começar</p>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Senha</FormLabel>
                            <Link href="/recuperar-senha" className="text-xs text-terracota hover:underline">
                              Esqueceu a senha?
                            </Link>
                          </div>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {errors.login && <p className="text-sm text-destructive">{errors.login}</p>}

                    <Button type="submit" className="w-full bg-terracota hover:bg-terracota-dark" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>

              <TabsContent value="register">
                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                      control={registerForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Senha</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmar senha</FormLabel>
                          <FormControl>
                            <Input placeholder="••••••••" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={registerForm.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de conta</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="customer" id="customer" />
                                <Label htmlFor="customer">Cliente</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="seller" id="seller" />
                                <Label htmlFor="seller">Vendedor</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {errors.register && <p className="text-sm text-destructive">{errors.register}</p>}

                    <Button type="submit" className="w-full bg-terracota hover:bg-terracota-dark" disabled={isLoading}>
                      {isLoading ? "Criando conta..." : "Criar conta"}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
