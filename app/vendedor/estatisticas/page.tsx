"use client"

import { AvatarFallback } from "@/components/ui/avatar"

import { AvatarImage } from "@/components/ui/avatar"

import { Avatar } from "@/components/ui/avatar"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  CalendarIcon,
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Star,
} from "lucide-react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Dados simulados para os gráficos
const salesData = [
  { name: "Jan", vendas: 4000, receita: 2400 },
  { name: "Fev", vendas: 3000, receita: 1398 },
  { name: "Mar", vendas: 2000, receita: 9800 },
  { name: "Abr", vendas: 2780, receita: 3908 },
  { name: "Mai", vendas: 1890, receita: 4800 },
  { name: "Jun", vendas: 2390, receita: 3800 },
  { name: "Jul", vendas: 3490, receita: 4300 },
  { name: "Ago", vendas: 4000, receita: 2400 },
  { name: "Set", vendas: 3000, receita: 1398 },
  { name: "Out", vendas: 2000, receita: 9800 },
  { name: "Nov", vendas: 2780, receita: 3908 },
  { name: "Dez", vendas: 1890, receita: 4800 },
]

const productData = [
  { name: "Açaí", value: 400 },
  { name: "Castanha do Pará", value: 300 },
  { name: "Artesanato", value: 300 },
  { name: "Cerâmica Marajoara", value: 200 },
  { name: "Pulseiras", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const customerData = [
  { name: "Jan", novos: 40, recorrentes: 24 },
  { name: "Fev", novos: 30, recorrentes: 13 },
  { name: "Mar", novos: 20, recorrentes: 98 },
  { name: "Abr", novos: 27, recorrentes: 39 },
  { name: "Mai", novos: 18, recorrentes: 48 },
  { name: "Jun", novos: 23, recorrentes: 38 },
  { name: "Jul", novos: 34, recorrentes: 43 },
]

export default function SellerStatisticsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [period, setPeriod] = useState("month")

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Estatísticas da Loja</h1>
            <p className="text-muted-foreground">Acompanhe o desempenho da sua loja e analise suas vendas.</p>
          </div>

          <div className="flex items-center space-x-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
                <SelectItem value="year">Este ano</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            {period === "custom" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 45.231,89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +20.1% <ArrowUpRight className="h-4 w-4 ml-1" />
                </span>
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +12.5% <ArrowUpRight className="h-4 w-4 ml-1" />
                </span>
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clientes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2.350</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  +18.2% <ArrowUpRight className="h-4 w-4 ml-1" />
                </span>
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-500 flex items-center">
                  -4.1% <ArrowDownRight className="h-4 w-4 ml-1" />
                </span>
                em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales" className="space-y-4">
          <TabsList>
            <TabsTrigger value="sales">Vendas</TabsTrigger>
            <TabsTrigger value="products">Produtos</TabsTrigger>
            <TabsTrigger value="customers">Clientes</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral de Vendas</CardTitle>
                <CardDescription>Acompanhe a evolução das suas vendas e receita ao longo do tempo.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    vendas: {
                      label: "Vendas",
                      color: "hsl(var(--chart-1))",
                    },
                    receita: {
                      label: "Receita",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="vendas" stroke="var(--color-vendas)" strokeWidth={2} />
                      <Line type="monotone" dataKey="receita" stroke="var(--color-receita)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Recentes</CardTitle>
                  <CardDescription>Últimos pedidos recebidos na sua loja.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((order) => (
                      <div key={order} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-3">
                          <Package className="h-8 w-8 p-1 bg-primary/10 text-primary rounded-full" />
                          <div>
                            <p className="font-medium">Pedido #{Math.floor(Math.random() * 10000)}</p>
                            <p className="text-sm text-muted-foreground">
                              {Math.floor(Math.random() * 5) + 1} itens • R$ {(Math.random() * 500).toFixed(2)}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-right">
                          <p>Há {Math.floor(Math.random() * 24)} horas</p>
                          <p className="text-green-500">Pago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Desempenho de Vendas</CardTitle>
                  <CardDescription>Comparação de vendas por período.</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData.slice(0, 6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="vendas" fill="#8884d8" />
                      <Bar dataKey="receita" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <CardDescription>Análise dos produtos com melhor desempenho na sua loja.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                  <div className="flex items-center justify-center">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={productData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {productData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-4">
                    {productData.map((product, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">{product.value} vendas</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium">R$ {(product.value * 10).toFixed(2)}</p>
                          <p className="text-green-500">+{Math.floor(Math.random() * 20)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Avaliações de Produtos</CardTitle>
                  <CardDescription>Média de avaliações dos seus produtos.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Açaí", rating: 4.8 },
                      { name: "Castanha do Pará", rating: 4.5 },
                      { name: "Artesanato", rating: 4.7 },
                      { name: "Cerâmica Marajoara", rating: 4.9 },
                      { name: "Pulseiras", rating: 4.2 },
                    ].map((product) => (
                      <div key={product.name} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-3">
                          <Star className="h-8 w-8 p-1 bg-yellow-100 text-yellow-500 rounded-full" />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <div className="flex items-center">
                              {Array(5)
                                .fill(0)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
                                  />
                                ))}
                              <span className="ml-2 text-sm text-muted-foreground">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-right">
                          <p>{Math.floor(Math.random() * 100) + 10} avaliações</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estoque</CardTitle>
                  <CardDescription>Produtos com estoque baixo.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Açaí", stock: 5, total: 100 },
                      { name: "Castanha do Pará", stock: 12, total: 100 },
                      { name: "Artesanato", stock: 3, total: 50 },
                      { name: "Cerâmica Marajoara", stock: 8, total: 50 },
                      { name: "Pulseiras", stock: 2, total: 30 },
                    ].map((product) => (
                      <div key={product.name} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{product.name}</p>
                          <p className={`text-sm ${product.stock < 10 ? "text-red-500" : "text-green-500"}`}>
                            {product.stock} em estoque
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${product.stock < 10 ? "bg-red-500" : "bg-green-500"}`}
                            style={{ width: `${(product.stock / product.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Clientes</CardTitle>
                <CardDescription>Acompanhe o crescimento de novos clientes e clientes recorrentes.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ChartContainer
                  config={{
                    novos: {
                      label: "Novos Clientes",
                      color: "hsl(var(--chart-1))",
                    },
                    recorrentes: {
                      label: "Clientes Recorrentes",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={customerData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="novos" stroke="var(--color-novos)" strokeWidth={2} />
                      <Line type="monotone" dataKey="recorrentes" stroke="var(--color-recorrentes)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Principais Clientes</CardTitle>
                  <CardDescription>Clientes que mais compraram na sua loja.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((customer) => (
                      <div key={customer} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Avatar" />
                            <AvatarFallback>C{customer}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Cliente {customer}</p>
                            <p className="text-sm text-muted-foreground">
                              {Math.floor(Math.random() * 20) + 1} pedidos
                            </p>
                          </div>
                        </div>
                        <div className="text-sm text-right">
                          <p className="font-medium">R$ {(Math.random() * 1000).toFixed(2)}</p>
                          <p className="text-green-500">Cliente fiel</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Localização dos Clientes</CardTitle>
                  <CardDescription>Distribuição geográfica dos seus clientes.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { city: "Belém", state: "PA", percentage: 65 },
                      { city: "Ananindeua", state: "PA", percentage: 15 },
                      { city: "Santarém", state: "PA", percentage: 8 },
                      { city: "Marabá", state: "PA", percentage: 7 },
                      { city: "Outros", state: "PA", percentage: 5 },
                    ].map((location) => (
                      <div key={location.city} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">
                            {location.city}, {location.state}
                          </p>
                          <p className="text-sm">{location.percentage}%</p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="h-2.5 rounded-full bg-primary"
                            style={{ width: `${location.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
