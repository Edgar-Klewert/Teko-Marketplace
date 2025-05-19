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
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

const storeFormSchema = z.object({
  storeName: z.string().min(2, {
    message: "O nome da loja deve ter pelo menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "A descrição deve ter pelo menos 10 caracteres.",
  }),
  category: z.string({
    required_error: "Selecione uma categoria.",
  }),
  address: z.string().min(5, {
    message: "Endereço inválido.",
  }),
})

const bankFormSchema = z.object({
  bankName: z.string().min(2, {
    message: "Nome do banco inválido.",
  }),
  accountType: z.string({
    required_error: "Selecione um tipo de conta.",
  }),
  accountNumber: z.string().min(5, {
    message: "Número de conta inválido.",
  }),
  agency: z.string().min(2, {
    message: "Agência inválida.",
  }),
  pixKey: z.string().min(5, {
    message: "Chave PIX inválida.",
  }),
})

const notificationsFormSchema = z.object({
  newOrders: z.boolean().default(true),
  lowStock: z.boolean().default(true),
  reviews: z.boolean().default(true),
  promotions: z.boolean().default(false),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>
type StoreFormValues = z.infer<typeof storeFormSchema>
type BankFormValues = z.infer<typeof bankFormSchema>
type NotificationsFormValues = z.infer<typeof notificationsFormSchema>

export default function SellerSettingsPage() {
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

  // Formulário da loja
  const storeForm = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      storeName: "Minha Loja Paraense",
      description: "Vendemos produtos típicos do Pará com a melhor qualidade e preço justo.",
      category: "artesanato",
      address: "Av. Presidente Vargas, 123, Belém, PA",
    },
  })

  // Formulário bancário
  const bankForm = useForm<BankFormValues>({
    resolver: zodResolver(bankFormSchema),
    defaultValues: {
      bankName: "Banco do Brasil",
      accountType: "corrente",
      accountNumber: "12345-6",
      agency: "1234",
      pixKey: "exemplo@email.com",
    },
  })

  // Formulário de notificações
  const notificationsForm = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      newOrders: true,
      lowStock: true,
      reviews: true,
      promotions: false,
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

  function onStoreSubmit(data: StoreFormValues) {
    setIsLoading(true)

    // Simulação de atualização da loja
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Loja atualizada",
        description: "As informações da sua loja foram atualizadas com sucesso.",
      })
    }, 1000)
  }

  function onBankSubmit(data: BankFormValues) {
    setIsLoading(true)

    // Simulação de atualização bancária
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Dados bancários atualizados",
        description: "Seus dados bancários foram atualizados com sucesso.",
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

  function handleDeleteStore() {
    const confirm = window.confirm("Tem certeza que deseja excluir sua loja? Esta ação não pode ser desfeita.")

    if (confirm) {
      setIsLoading(true)

      // Simulação de exclusão de loja
      setTimeout(() => {
        setIsLoading(false)
        toast({
          title: "Loja excluída",
          description: "Sua loja foi excluída com sucesso.",
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
          <h1 className="text-3xl font-bold tracking-tight">Configurações do Vendedor</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais, dados da loja, informações bancárias e preferências de notificação.
          </p>
        </div>

        <Separator />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:flex lg:flex-col">
                <TabsTrigger value="profile">Perfil</TabsTrigger>
                <TabsTrigger value="store">Loja</TabsTrigger>
                <TabsTrigger value="bank">Dados Bancários</TabsTrigger>
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
                        <AvatarFallback>{user?.name?.charAt(0) || "V"}</AvatarFallback>
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
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <FormLabel>Senha atual</FormLabel>
                        <Input type="password" placeholder="••••••••" />
                      </div>

                      <div>
                        <FormLabel>Nova senha</FormLabel>
                        <Input type="password" placeholder="••••••••" />
                        <p className="text-sm text-muted-foreground mt-1">A senha deve ter pelo menos 8 caracteres.</p>
                      </div>

                      <div>
                        <FormLabel>Confirmar nova senha</FormLabel>
                        <Input type="password" placeholder="••••••••" />
                      </div>

                      <Button>Atualizar senha</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="store" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Loja</CardTitle>
                    <CardDescription>Atualize as informações da sua loja.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Logo da loja" />
                        <AvatarFallback>L</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm">
                          Alterar logo
                        </Button>
                      </div>
                    </div>

                    <Form {...storeForm}>
                      <form onSubmit={storeForm.handleSubmit(onStoreSubmit)} className="space-y-4">
                        <FormField
                          control={storeForm.control}
                          name="storeName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome da loja</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome da sua loja" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={storeForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Descrição</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Descreva sua loja e seus produtos"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={storeForm.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categoria principal</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma categoria" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="artesanato">Artesanato</SelectItem>
                                  <SelectItem value="alimentos">Alimentos</SelectItem>
                                  <SelectItem value="moda">Moda</SelectItem>
                                  <SelectItem value="decoracao">Decoração</SelectItem>
                                  <SelectItem value="cosmeticos">Cosméticos</SelectItem>
                                  <SelectItem value="outros">Outros</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={storeForm.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Endereço</FormLabel>
                              <FormControl>
                                <Input placeholder="Endereço da loja" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Salvando..." : "Salvar informações"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Imagens da Loja</CardTitle>
                    <CardDescription>Adicione imagens para personalizar sua loja.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <FormLabel>Banner da loja</FormLabel>
                        <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                          <Button variant="outline">Fazer upload</Button>
                          <p className="text-sm text-muted-foreground mt-2">Tamanho recomendado: 1200 x 300 pixels</p>
                        </div>
                      </div>

                      <div>
                        <FormLabel>Galeria de imagens</FormLabel>
                        <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                          <Button variant="outline">Adicionar imagens</Button>
                          <p className="text-sm text-muted-foreground mt-2">
                            Você pode adicionar até 5 imagens para sua galeria
                          </p>
                        </div>
                      </div>

                      <Button>Salvar imagens</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bank" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Bancários</CardTitle>
                    <CardDescription>Atualize suas informações bancárias para receber pagamentos.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...bankForm}>
                      <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className="space-y-4">
                        <FormField
                          control={bankForm.control}
                          name="bankName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome do banco</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome do banco" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={bankForm.control}
                          name="accountType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de conta</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de conta" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="corrente">Conta Corrente</SelectItem>
                                  <SelectItem value="poupanca">Conta Poupança</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={bankForm.control}
                            name="agency"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Agência</FormLabel>
                                <FormControl>
                                  <Input placeholder="Agência" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={bankForm.control}
                            name="accountNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Número da conta</FormLabel>
                                <FormControl>
                                  <Input placeholder="Número da conta" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={bankForm.control}
                          name="pixKey"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chave PIX</FormLabel>
                              <FormControl>
                                <Input placeholder="Email, CPF, telefone ou chave aleatória" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? "Salvando..." : "Salvar dados bancários"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Documentos</CardTitle>
                    <CardDescription>Adicione documentos para verificação da sua conta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <FormLabel>CPF ou CNPJ</FormLabel>
                        <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                          <Button variant="outline">Fazer upload</Button>
                          <p className="text-sm text-muted-foreground mt-2">Formatos aceitos: PDF, JPG, PNG</p>
                        </div>
                      </div>

                      <div>
                        <FormLabel>Comprovante de endereço</FormLabel>
                        <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
                          <Button variant="outline">Fazer upload</Button>
                          <p className="text-sm text-muted-foreground mt-2">Formatos aceitos: PDF, JPG, PNG</p>
                        </div>
                      </div>

                      <Button>Enviar documentos</Button>
                    </div>
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
                          name="newOrders"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Novos pedidos</FormLabel>
                                <FormDescription>Receba notificações quando receber novos pedidos.</FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="lowStock"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Estoque baixo</FormLabel>
                                <FormDescription>
                                  Receba alertas quando o estoque de produtos estiver baixo.
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={notificationsForm.control}
                          name="reviews"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Avaliações</FormLabel>
                                <FormDescription>
                                  Receba notificações sobre novas avaliações de produtos.
                                </FormDescription>
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
                                <FormDescription>
                                  Receba notificações sobre promoções e eventos do marketplace.
                                </FormDescription>
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
                    <CardTitle>Excluir Loja</CardTitle>
                    <CardDescription>Exclua permanentemente sua loja e todos os seus dados.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Ao excluir sua loja, todos os seus produtos, pedidos e dados serão permanentemente removidos. Esta
                      ação não pode ser desfeita.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteStore} disabled={isLoading}>
                      {isLoading ? "Excluindo..." : "Excluir loja"}
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
