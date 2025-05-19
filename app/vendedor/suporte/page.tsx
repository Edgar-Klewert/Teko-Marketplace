"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { toast } from "@/components/ui/use-toast"
import { Search, MessageSquare, HelpCircle, FileText, Phone, Mail, MapPin, BookOpen } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supportFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Email inválido.",
  }),
  subject: z.string().min(5, {
    message: "O assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "A mensagem deve ter pelo menos 10 caracteres.",
  }),
  storeId: z.string().optional(),
  category: z.string({
    required_error: "Selecione uma categoria.",
  }),
})

type SupportFormValues = z.infer<typeof supportFormSchema>

export default function SellerSupportPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Formulário de suporte
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      storeId: "",
      category: "general",
    },
  })

  function onSubmit(data: SupportFormValues) {
    setIsLoading(true)

    // Simulação de envio de mensagem
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Mensagem enviada",
        description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      })
      form.reset()
    }, 1500)
  }

  // Perguntas frequentes para vendedores
  const faqs = [
    {
      question: "Como faço para cadastrar novos produtos?",
      answer:
        'Para cadastrar novos produtos, acesse o painel de vendedor, vá para a seção "Produtos" e clique em "Adicionar Novo Produto". Preencha todos os campos obrigatórios, adicione imagens de qualidade e clique em "Publicar".',
    },
    {
      question: "Quais são as taxas cobradas pela plataforma?",
      answer:
        "A plataforma cobra uma taxa de 10% sobre o valor de cada venda realizada. Não há taxas de cadastro ou mensalidade. O pagamento das taxas é feito automaticamente no momento do repasse dos valores das vendas.",
    },
    {
      question: "Como recebo o pagamento das minhas vendas?",
      answer:
        "Os pagamentos são processados a cada 15 dias. O valor das vendas, descontadas as taxas da plataforma, é transferido para a conta bancária cadastrada no seu perfil. É importante manter seus dados bancários sempre atualizados.",
    },
    {
      question: "Como gerenciar o estoque dos produtos?",
      answer:
        'O gerenciamento de estoque é feito na seção "Produtos" do painel de vendedor. Você pode atualizar a quantidade disponível de cada produto, configurar alertas de estoque baixo e até mesmo automatizar a indisponibilidade quando o estoque chegar a zero.',
    },
    {
      question: "Como responder às avaliações dos clientes?",
      answer:
        'As avaliações dos clientes podem ser visualizadas e respondidas na seção "Avaliações" do painel de vendedor. É importante responder a todas as avaliações, sejam elas positivas ou negativas, de forma educada e profissional.',
    },
    {
      question: "Como criar promoções para meus produtos?",
      answer:
        'Para criar promoções, acesse a seção "Marketing" do painel de vendedor e clique em "Criar Promoção". Você pode definir descontos por produto, categoria ou para toda a loja, além de estabelecer o período de validade da promoção.',
    },
    {
      question: "Como emitir notas fiscais para as vendas?",
      answer:
        'A emissão de notas fiscais é de responsabilidade do vendedor. Na seção "Pedidos", você encontrará a opção "Emitir Nota Fiscal" para cada pedido. A plataforma oferece integração com alguns sistemas de emissão de notas fiscais.',
    },
    {
      question: "Como configurar as opções de frete?",
      answer:
        'As configurações de frete são feitas na seção "Configurações > Entrega" do painel de vendedor. Você pode definir valores fixos, frete grátis para determinados valores ou regiões, ou utilizar as tabelas de correios e transportadoras.',
    },
    {
      question: "Como destacar minha loja na plataforma?",
      answer:
        'Para destacar sua loja, mantenha um bom histórico de vendas e avaliações positivas. Além disso, você pode contratar planos de destaque na seção "Marketing > Planos de Destaque", que colocam sua loja em posições privilegiadas nas buscas e categorias.',
    },
    {
      question: "Como resolver disputas com clientes?",
      answer:
        'As disputas com clientes devem ser tratadas na seção "Pedidos > Disputas". Tente sempre resolver de forma amigável, oferecendo soluções como reembolso, troca ou envio de um novo produto. A plataforma pode mediar casos mais complexos.',
    },
  ]

  // Filtrar FAQs com base na pesquisa
  const filteredFaqs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Suporte ao Vendedor</h1>
          <p className="text-muted-foreground">
            Tire suas dúvidas, encontre respostas ou entre em contato com nossa equipe de suporte.
          </p>
        </div>

        <Separator />

        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/4">
            <Tabs defaultValue="faq" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:flex lg:flex-col">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="guides">Guias</TabsTrigger>
                <TabsTrigger value="contact">Contato</TabsTrigger>
                <TabsTrigger value="tickets">Meus Tickets</TabsTrigger>
              </TabsList>
            </Tabs>
          </aside>

          <div className="flex-1 lg:max-w-3xl">
            <Tabs defaultValue="faq" className="w-full">
              <TabsContent value="faq" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Perguntas Frequentes para Vendedores</CardTitle>
                    <CardDescription>Encontre respostas para as dúvidas mais comuns dos vendedores.</CardDescription>
                    <div className="relative mt-4">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Pesquisar perguntas..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))
                      ) : (
                        <p className="text-center py-4 text-muted-foreground">
                          Nenhuma pergunta encontrada. Tente outra pesquisa ou entre em contato conosco.
                        </p>
                      )}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="guides" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guias para Vendedores</CardTitle>
                    <CardDescription>
                      Aprenda a utilizar todas as funcionalidades da plataforma com nossos guias detalhados.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        {
                          title: "Primeiros passos como vendedor",
                          icon: <BookOpen className="h-8 w-8 text-primary" />,
                        },
                        { title: "Cadastrando produtos", icon: <FileText className="h-8 w-8 text-primary" /> },
                        { title: "Gerenciando pedidos", icon: <FileText className="h-8 w-8 text-primary" /> },
                        {
                          title: "Configurando métodos de entrega",
                          icon: <FileText className="h-8 w-8 text-primary" />,
                        },
                        { title: "Estratégias de marketing", icon: <FileText className="h-8 w-8 text-primary" /> },
                        { title: "Otimizando sua loja", icon: <FileText className="h-8 w-8 text-primary" /> },
                        { title: "Entendendo as métricas", icon: <FileText className="h-8 w-8 text-primary" /> },
                        { title: "Atendimento ao cliente", icon: <FileText className="h-8 w-8 text-primary" /> },
                      ].map((guide, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-accent cursor-pointer"
                        >
                          {guide.icon}
                          <div>
                            <h3 className="font-medium">{guide.title}</h3>
                            <p className="text-sm text-muted-foreground">Clique para ver o guia completo</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vídeos Tutoriais</CardTitle>
                    <CardDescription>Aprenda visualmente com nossos vídeos tutoriais.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { title: "Como configurar sua loja", duration: "5:32" },
                        { title: "Cadastrando produtos em massa", duration: "8:45" },
                        { title: "Estratégias de precificação", duration: "12:20" },
                        { title: "Analisando relatórios de vendas", duration: "7:15" },
                      ].map((video, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="aspect-video bg-muted relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Button variant="outline" size="icon" className="rounded-full bg-background/80">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-6 w-6"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                              </Button>
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium">{video.title}</h3>
                            <p className="text-sm text-muted-foreground">Duração: {video.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Entre em Contato</CardTitle>
                    <CardDescription>
                      Preencha o formulário abaixo para enviar uma mensagem para nossa equipe de suporte ao vendedor.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
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
                          control={form.control}
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
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Categoria</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione uma categoria" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">Dúvida Geral</SelectItem>
                                  <SelectItem value="products">Produtos</SelectItem>
                                  <SelectItem value="orders">Pedidos</SelectItem>
                                  <SelectItem value="payment">Pagamentos</SelectItem>
                                  <SelectItem value="shipping">Entregas</SelectItem>
                                  <SelectItem value="technical">Problema Técnico</SelectItem>
                                  <SelectItem value="account">Conta</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="storeId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ID da loja (opcional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Ex: LOJA123" {...field} />
                              </FormControl>
                              <FormDescription>
                                Se sua mensagem for sobre uma loja específica, informe o ID.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assunto</FormLabel>
                              <FormControl>
                                <Input placeholder="Assunto da mensagem" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mensagem</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Descreva sua dúvida ou problema em detalhes"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Enviando..." : "Enviar mensagem"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Canais de Atendimento ao Vendedor</CardTitle>
                    <CardDescription>Canais exclusivos para suporte aos vendedores.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Phone className="h-8 w-8 p-1 bg-primary/10 text-primary rounded-full" />
                        <div>
                          <h3 className="font-medium">Telefone Exclusivo</h3>
                          <p className="text-sm text-muted-foreground">(91) 3XXX-XXXX</p>
                          <p className="text-sm text-muted-foreground">Segunda a Sexta, 8h às 20h</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <Mail className="h-8 w-8 p-1 bg-primary/10 text-primary rounded-full" />
                        <div>
                          <h3 className="font-medium">Email para Vendedores</h3>
                          <p className="text-sm text-muted-foreground">vendedores@marketplace.com.br</p>
                          <p className="text-sm text-muted-foreground">Respondemos em até 12 horas</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <MessageSquare className="h-8 w-8 p-1 bg-primary/10 text-primary rounded-full" />
                        <div>
                          <h3 className="font-medium">Chat para Vendedores</h3>
                          <p className="text-sm text-muted-foreground">Disponível no painel do vendedor</p>
                          <p className="text-sm text-muted-foreground">Atendimento prioritário</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3 p-4 border rounded-lg">
                        <MapPin className="h-8 w-8 p-1 bg-primary/10 text-primary rounded-full" />
                        <div>
                          <h3 className="font-medium">Escritório de Apoio</h3>
                          <p className="text-sm text-muted-foreground">Av. Presidente Vargas, 123</p>
                          <p className="text-sm text-muted-foreground">Belém, PA - Com hora marcada</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tickets" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meus Tickets de Suporte</CardTitle>
                    <CardDescription>Acompanhe o status dos seus tickets de suporte.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {[
                      {
                        id: "#23456",
                        subject: "Problema com repasse de pagamento",
                        status: "Aberto",
                        date: "15/05/2023",
                        lastUpdate: "16/05/2023",
                      },
                      {
                        id: "#23457",
                        subject: "Dúvida sobre configuração de frete",
                        status: "Respondido",
                        date: "10/05/2023",
                        lastUpdate: "12/05/2023",
                      },
                      {
                        id: "#23458",
                        subject: "Solicitação de destaque na plataforma",
                        status: "Fechado",
                        date: "05/05/2023",
                        lastUpdate: "07/05/2023",
                      },
                    ].length > 0 ? (
                      <div className="space-y-4">
                        {[
                          {
                            id: "#23456",
                            subject: "Problema com repasse de pagamento",
                            status: "Aberto",
                            date: "15/05/2023",
                            lastUpdate: "16/05/2023",
                          },
                          {
                            id: "#23457",
                            subject: "Dúvida sobre configuração de frete",
                            status: "Respondido",
                            date: "10/05/2023",
                            lastUpdate: "12/05/2023",
                          },
                          {
                            id: "#23458",
                            subject: "Solicitação de destaque na plataforma",
                            status: "Fechado",
                            date: "05/05/2023",
                            lastUpdate: "07/05/2023",
                          },
                        ].map((ticket) => (
                          <div
                            key={ticket.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="space-y-1 mb-2 md:mb-0">
                              <div className="flex items-center">
                                <p className="font-medium">{ticket.subject}</p>
                                <span
                                  className={`ml-2 px-2 py-1 text-xs rounded-full ${
                                    ticket.status === "Aberto"
                                      ? "bg-blue-100 text-blue-800"
                                      : ticket.status === "Respondido"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {ticket.status}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Ticket {ticket.id} • Criado em {ticket.date}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm text-muted-foreground">Última atualização: {ticket.lastUpdate}</p>
                              <Button variant="outline" size="sm">
                                Ver detalhes
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-lg font-medium">Nenhum ticket encontrado</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Você ainda não abriu nenhum ticket de suporte.
                        </p>
                        <Button className="mt-4" variant="outline">
                          Criar novo ticket
                        </Button>
                      </div>
                    )}
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
