"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  phone: z.string().min(10, {
    message: "Número de telefone inválido.",
  }),
})

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "A senha atual deve ter pelo menos 8 caracteres.",
    }),
    newPassword: z.string().min(8, {
      message: "A nova senha deve ter pelo menos 8 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirme a nova senha.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  })

const notificationsFormSchema = z.object({
  marketingEmails: z.boolean().default(false),
  orderUpdates: z.boolean().default(true),
  promotions: z.boolean().default(true),
  newProducts: z.boolean().default(false),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export default function SettingsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Formulário de perfil
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
    },
  })

  // Formulário de senha
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Formulário de notificações
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      marketingEmails: false,
      orderUpdates: true,
      promotions: true,
      newProducts: false,
    },
  })

  function onProfileSubmit(data: ProfileFormValues) {
    setIsLoading(true)

    // Simulação de atualização de perfil
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Perfil atualizado",
        description: "Suas informações de perfil foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  function onPasswordSubmit(data: PasswordFormValues) {
    setIsLoading(true)

    // Simulação de atualização de senha
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      })
      passwordForm.reset({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    }, 1000)
  }

  function onNotificationsSubmit(data: NotificationsFormValues) {
    setIsLoading(true)

    // Simulação de atualização de notificações
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  function handleDeleteAccount() {
    const confirm = window.confirm("Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.")

    if (confirm) {
      setIsLoading(true)

      // Simulação de exclusão de conta
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Conta excluída",
          description: "Sua conta foi excluída com sucesso.",
          variant: "destructive",
        })
        router.push("/")
      }, 1500)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configurações da Conta</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais, senha e preferências de notificação.
          </p>
        </div>

        <Separator />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:flex lg:flex-col">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="password">Senha</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
              </TabsList>
            </Tabs>
          </aside>

          <div className="flex-1 lg:max-w-3xl">
            <Tabs defaultValue="profile" className="w-full">
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>Atualize suas informações pessoais.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt={user?.name || "Avatar"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm">
                          Alterar foto
                        </Button>
                      </div>
                    </div>

                    <Form {...profileForm}>
                      <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <FormField
                          control={profileForm.control}
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
                          control={profileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="seu.email@exemplo.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl>
                                <Input placeholder="(91) 98765-4321" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Salvando..." : "Salvar alterações"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Endereço</CardTitle>
                    <CardDescription>Gerencie seu endereço de entrega.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <FormLabel>CEP</FormLabel>
                          <Input placeholder="66000-000" />
                        </div>
                        <div>
                          <FormLabel>Estado</FormLabel>
                          <Input placeholder="PA" />
                        </div>
                      </div>

                      <div>
                        <FormLabel>Cidade</FormLabel>
                        <Input placeholder="Belém" />
                      </div>

                      <div>
                        <FormLabel>Bairro</FormLabel>
                        <Input placeholder="Seu bairro" />
                      </div>

                      <div>
                        <FormLabel>Endereço</FormLabel>
                        <Input placeholder="Rua, número" />
                      </div>

                      <div>
                        <FormLabel>Complemento</FormLabel>
                        <Input placeholder="Apto, bloco, referência" />
                      </div>

                      <Button>Salvar endereço</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="password" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...passwordForm}>
                      <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                        <FormField
                          control={passwordForm.control}
                          name="currentPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha atual</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={passwordForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nova senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormDescription>A senha deve ter pelo menos 8 caracteres.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={passwordForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirmar nova senha</FormLabel>
                              <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Atualizando..." : "Atualizar senha"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>Escolha quais notificações você deseja receber.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...notificationsForm}>
                      <form onSubmit={notificationsForm.handleSubmit(onNotificationsSubmit)} className="space-y-4">
                        <FormField
                          control={notificationsForm.control}
                          name="marketingEmails"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Emails de marketing</FormLabel>
                                <FormDescription>Receba emails sobre novidades e promoções.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="orderUpdates"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Atualizações de pedidos</FormLabel>
                                <FormDescription>Receba notificações sobre o status dos seus pedidos.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="promotions"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Promoções</FormLabel>
                                <FormDescription>Receba notificações sobre promoções e descontos.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="newProducts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Novos produtos</FormLabel>
                                <FormDescription>Receba notificações sobre novos produtos.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Salvando..." : "Salvar preferências"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Excluir Conta</CardTitle>
                    <CardDescription>Exclua permanentemente sua conta e todos os seus dados.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser
                      desfeita.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
                      {isLoading ? "Excluindo..." : "Excluir conta"}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
