"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Edit, Save, Upload, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/layout/header"
import { useAuth } from "@/contexts/auth-context"

// Dados simulados da loja
const storeData = {
  id: "1",
  name: "Artesanato Paraense",
  description:
    "Artesanato tradicional da região de Belém, com foco em cestaria e objetos decorativos feitos com fibras naturais da Amazônia. Nossa loja valoriza técnicas tradicionais passadas por gerações de artesãos locais.",
  shortDescription: "Artesanato tradicional da região de Belém",
  logo: "/placeholder.svg?height=200&width=200",
  coverImage: "/placeholder.svg?height=400&width=1200",
  location: "Belém, PA",
  address: "Av. Pará, 1234, Centro, Belém - PA",
  phone: "(91) 3333-4444",
  email: "contato@artesanatoparaense.com.br",
  website: "www.artesanatoparaense.com.br",
  socialMedia: {
    instagram: "@artesanatoparaense",
    facebook: "artesanatoparaense",
  },
  since: "2015",
  categories: ["Cestaria", "Decoração", "Utensílios"],
  rating: 4.8,
  products: 24,
  sales: 156,
  views: 1250,
}

export default function SellerStorePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [store, setStore] = useState(storeData)
  
  useEffect(() => {
    if (!user || user.role !== "seller") {
      router.push("/login")
    }
  }, [user, router])
  
  if (!user || user.role !== "seller") {
    return null
  }
  
  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    setIsEditing(false)
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="relative h-[250px] md:h-[300px]">
          <Image
            src={store.coverImage || "/placeholder.svg"}
            alt={store.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40">
            <div className="container h-full flex items-end pb-6">
              <div className="flex flex-col md:flex-row items-start md:items-end gap-4">
                <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border-4 border-white">
                  <Image
                    src={store.logo || "/placeholder.svg"}
                    alt={store.name}
                    fill
                    className="object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Button size="sm" variant="ghost" className="text-white">
                        <Upload className="h-4 w-4 mr-2" />
                        Logo
                      </Button>
                    </div>
                  )}
                </div>
                <div className="text-white">
                  {isEditing ? (
                    <Input
                      value={store.name}
                      onChange={(e) => setStore({ ...store, name: e.target.value })}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70 mb-2"
                    />
                  ) : (
                    <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
                  )}
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {isEditing ? (
                      <Input
                        value={store.location}
                        onChange={(e) => setStore({ ...store, location: e.target.value })}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 w-40"
                      />
                    ) : (
                      <span>{store.location}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isEditing && (
            <div className="absolute top-4 right-4">
              <Button variant="ghost" className="text-white bg-black/30 hover:bg-black/50">
                <Upload className="h-4 w-4 mr-2" />
                Alterar Capa
              </Button>
            </div>
          )}
        </div>
        
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Minha Loja</h2>
            <Button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={isEditing ? "bg-green-600 hover:bg-green-700" : "bg-terracota hover:bg-terracota-dark"}
            >
              {isEditing ? (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Loja
                </>
              )}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Informações da Loja</CardTitle>
                  <CardDescription>
                    Detalhes sobre sua loja que serão exibidos para os clientes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Descrição Curta</h3>
                    {isEditing ? (
                      <Input
                        value={store.shortDescription}
                        onChange={(e) => setStore({ ...store, shortDescription: e.target.value })}
                        className="w-full"
                      />
                    ) : (
                      <p className="text-muted-foreground">{store.shortDescription}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Descrição Completa</h3>
                    {isEditing ? (
                      <Textarea
                        value={store.description}
                        onChange={(e) => setStore({ ...store, description: e.target.value })}
                        className="w-full"
                        rows={5}
                      />
                    ) : (
                      <p className="text-muted-foreground">{store.description}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Endereço</h3>
                      {isEditing ? (
                        <Input
                          value={store.address}
                          onChange={(e) => setStore({ ...store, address: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-muted-foreground">{store.address}</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Telefone</h3>
                      {isEditing ? (
                        <Input
                          value={store.phone}
                          onChange={(e) => setStore({ ...store, phone: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-muted-foreground">{store.phone}</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Email</h3>
                      {isEditing ? (
                        <Input
                          value={store.email}
                          onChange={(e) => setStore({ ...store, email: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-muted-foreground">{store.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2">Website</h3>
                      {isEditing ? (
                        <Input
                          value={store.website}
                          onChange={(e) => setStore({ ...store, website: e.target.value })}
                          className="w-full"
                        />
                      ) : (
                        <p className="text-muted-foreground">{store.website}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Categorias</h3>
                    <div className="flex flex-wrap gap-2">
                      {store.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-terracota/10 text-terracota rounded-full text-sm"
                        >
                          {category}
                        </span>
                      ))}
                      {isEditing && (
                        <Button variant="outline" size="sm" className="rounded-full">
                          + Adicionar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="produtos">
                <TabsList className="w-full">
                  <TabsTrigger value="produtos">Produtos</TabsTrigger>
                  <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                  <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="produtos" className="mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Meus Produtos</h3>
                    <Link href="/vendedor/produtos/novo">
                      <Button size="sm" className="bg-terracota hover:bg-terracota-dark">
                        + Novo Produto
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative h-40">
                          <Image
                            src="/placeholder.svg?height=150&width=150"
                            alt={`Produto ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium truncate">Produto {index + 1}</h4>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-bold text-terracota">
                              R$ {((index + 1) * 50).toFixed(2)}
                            </span>
                            <Link href={`/vendedor/produtos/${index + 1}`}>
                              <Button size="sm" variant="outline">
                                Editar
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="avaliacoes" className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Avaliações da Loja</h3>
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium">Cliente {index + 1}</span>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, starIndex) => (
                                <svg
                                  key={starIndex}
                                  className={`h-4 w-4 ${starIndex < 5 - index * 0.5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            "Excelente loja, produtos de alta qualidade e atendimento impecável. 
                            Recomendo a todos que buscam artesanato autêntico da região amazônica."
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {index + 1} semana{index > 0 ? "s" : ""} atrás
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="estatisticas" className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Estatísticas da Loja</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="text-sm text-muted-foreground mb-1">Produtos</h4>
                        <div className="text-2xl font-bold">{store.products}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="text-sm text-muted-foreground mb-1">Vendas</h4>
                        <div className="text-2xl font-bold">{store.sales}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="text-sm text-muted-foreground mb-1">Visualizações</h4>
                        <div className="text-2xl font-bold">{store.views}</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="text-sm text-muted-foreground mb-1">Avaliação</h4>
                        <div className="text-2xl font-bold flex items-center">
                          {store.rating}
                          <svg
                            className="h-5 w-5 ml-1 text-yellow-400 fill-yellow-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Visualização da Loja</CardTitle>
                  <CardDescription>
                    Como os clientes veem sua loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center mb-4">
                    <Link href={`/lojas/${store.id}`} target="_blank">
                      <Button variant="outline">
                        <Globe className="mr-2 h-4 w-4" />
                        Ver Loja Pública
                      </Button>
                    </Link>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Contato</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{store.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{store.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{store.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium mb-1">Redes Sociais</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204" />
                          </svg>
                          <span>{store.socialMedia?.instagram}</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.663 9.15 8.437 9.879V15.008h-2.54c-.326 0-.628-.159-.819-.411-.191-.252-.289-.578-.268-.91v-2.597c0-.332.098-.658.289-.91.191-.252.493-.41.819-.41h2.54V9.797c0-2.506 1.492-3.891 3.777-3.891 1.094 0 2.238.195 2.238.195v2.815c0 .001-.697 0-.832 0-.609 0-.793.367-.793.795v1.755h2.673c.326 0 .628.159.819.41.191.252.289.577.289.909v2.598c0 .331-.098.657-.289.909-.191.252-.493.411-.819.411h-2.673v6.769C18.337 21.15 22 16.991 22 12z"/>
                          </svg>
                          <span>{store.socialMedia?.facebook}</span>
                        </div>
                      </div>
                    </div>\
