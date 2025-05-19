"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart, Heart, Star, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

// Dados simulados de produtos
const products = [
  {
    id: "1",
    name: "Cesto Trançado",
    description:
      "Cesto artesanal feito com fibras naturais da Amazônia, utilizando técnicas tradicionais passadas por gerações. Ideal para decoração ou armazenamento de pequenos objetos.",
    longDescription:
      "Este cesto artesanal é confeccionado por artesãos locais da região amazônica, utilizando fibras naturais extraídas de forma sustentável. Cada peça é única e carrega consigo a história e tradição das comunidades ribeirinhas. O processo de trançado é feito manualmente, preservando técnicas ancestrais que são passadas de geração em geração. Além de ser um item decorativo de grande beleza, este cesto também é funcional e pode ser utilizado para armazenar diversos objetos pequenos, trazendo um toque de autenticidade para qualquer ambiente.",
    price: 89.9,
    images: [
      "/placeholder.svg?height=600&width=600&text=Cesto+1",
      "/placeholder.svg?height=600&width=600&text=Cesto+2",
      "/placeholder.svg?height=600&width=600&text=Cesto+3",
    ],
    storeId: "1",
    storeName: "Artesanato Paraense",
    rating: 4.8,
    reviews: 24,
    stock: 15,
    material: "Fibras naturais de tucumã e arumã",
    dimensions: "25cm x 25cm x 15cm",
    weight: "300g",
    colors: ["Natural", "Tingido"],
    tags: ["Cestaria", "Decoração", "Sustentável"],
    related: ["2", "4", "6"],
  },
  {
    id: "2",
    name: "Cerâmica Marajoara",
    description: "Peça decorativa inspirada na arte marajoara, com padrões geométricos tradicionais da Ilha de Marajó.",
    longDescription:
      "Esta peça de cerâmica é inspirada na tradicional arte marajoara, originária da Ilha de Marajó no Pará. Os padrões geométricos e representações zoomorfas são característicos desta arte milenar, que remonta às antigas civilizações que habitavam a região amazônica. Cada peça é modelada e pintada à mão por artesãos que preservam as técnicas ancestrais, resultando em um objeto único que carrega a essência cultural da região. A cerâmica marajoara é reconhecida mundialmente por sua beleza e significado histórico, sendo um importante patrimônio cultural brasileiro.",
    price: 129.9,
    images: [
      "/placeholder.svg?height=600&width=600&text=Ceramica+1",
      "/placeholder.svg?height=600&width=600&text=Ceramica+2",
    ],
    storeId: "2",
    storeName: "Arte do Pará",
    rating: 4.7,
    reviews: 18,
    stock: 8,
    material: "Argila e pigmentos naturais",
    dimensions: "20cm x 15cm x 10cm",
    weight: "500g",
    colors: ["Terracota", "Preto"],
    tags: ["Cerâmica", "Arte Marajoara", "Decoração"],
    related: ["1", "3", "5"],
  },
]

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const { user } = useAuth()
  const { addItem } = useCart()
  const productId = params.id as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Update isAuthenticated based on the user context
    setIsAuthenticated(!!user)
  }, [user])

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null // Render nothing while redirecting
  }

  // Encontrar o produto pelo ID
  const product = products.find((p) => p.id === productId)

  if (!product && isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-10">
          <div className="container">
            <div className="mb-6">
              <Link href="/produtos" className="inline-flex items-center text-sm hover:text-terracota">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para produtos
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="mb-4 text-3xl font-bold">Produto não encontrado</h1>
              <p className="mb-8 text-muted-foreground">
                O produto que você está procurando não existe ou foi removido.
              </p>
              <Button asChild className="bg-terracota hover:bg-terracota-dark">
                <Link href="/produtos">Ver outros produtos</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      storeId: product.storeId,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
    })
  }

  // Produtos relacionados
  const relatedProducts = product.related.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-6">
            <Link href="/produtos" className="inline-flex items-center text-sm hover:text-terracota">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para produtos
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative h-20 w-20 overflow-hidden rounded-md border ${
                      selectedImage === index ? "ring-2 ring-terracota" : ""
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <Link href={`/lojas/${product.storeId}`}>
                  <Badge variant="outline" className="hover:bg-secondary">
                    {product.storeName}
                  </Badge>
                </Link>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="mx-1 text-sm text-muted-foreground">({product.reviews} avaliações)</span>
                </div>
              </div>

              <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
              <p className="mb-4 text-lg font-semibold text-terracota">R$ {product.price.toFixed(2)}</p>
              <p className="mb-6 text-muted-foreground">{product.description}</p>

              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Disponibilidade:</span>
                  <span className="text-sm">
                    {product.stock > 0 ? (
                      <span className="text-green-600">Em estoque ({product.stock} unidades)</span>
                    ) : (
                      <span className="text-destructive">Fora de estoque</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Material:</span>
                  <span className="text-sm">{product.material}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Dimensões:</span>
                  <span className="text-sm">{product.dimensions}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center">
                  <span className="mr-3 text-sm font-medium">Quantidade:</span>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <div className="flex h-8 w-12 items-center justify-center border-y">{quantity}</div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-l-none"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex space-x-3">
                <Button
                  className="flex-1 bg-terracota hover:bg-terracota-dark"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={isFavorite ? "text-red-500" : ""}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500" : ""}`} />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3 rounded-lg bg-muted/50 p-4">
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-terracota" />
                  <div>
                    <p className="text-sm font-medium">Entrega para todo o Brasil</p>
                    <p className="text-xs text-muted-foreground">Frete grátis para compras acima de R$ 200,00</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-terracota" />
                  <div>
                    <p className="text-sm font-medium">Garantia de autenticidade</p>
                    <p className="text-xs text-muted-foreground">
                      Produtos artesanais autênticos com certificado de origem
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <RotateCcw className="h-5 w-5 text-terracota" />
                  <div>
                    <p className="text-sm font-medium">Troca e devolução</p>
                    <p className="text-xs text-muted-foreground">Até 7 dias para troca ou devolução</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="descricao">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="descricao">Descrição</TabsTrigger>
                <TabsTrigger value="avaliacoes">Avaliações</TabsTrigger>
                <TabsTrigger value="envio">Envio e Devolução</TabsTrigger>
              </TabsList>
              <TabsContent value="descricao" className="mt-6">
                <div className="space-y-4">
                  <p>{product.longDescription}</p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Especificações</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Material:</span>
                          <span>{product.material}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Dimensões:</span>
                          <span>{product.dimensions}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Peso:</span>
                          <span>{product.weight}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-muted-foreground">Cores disponíveis:</span>
                          <span>{product.colors.join(", ")}</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold">Características</h3>
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-green-600"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Feito à mão</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-green-600"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Materiais sustentáveis</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-green-600"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Peça única</span>
                        </li>
                        <li className="flex items-center">
                          <svg
                            className="mr-2 h-4 w-4 text-green-600"
                            fill="none"
                            height="24"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Comércio justo</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="avaliacoes" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Avaliações dos Clientes</h3>
                      <div className="flex items-center">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">
                          {product.rating} de 5 ({product.reviews} avaliações)
                        </span>
                      </div>
                    </div>
                    <Button className="bg-terracota hover:bg-terracota-dark">Avaliar Produto</Button>
                  </div>

                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <p className="font-medium">Cliente {index + 1}</p>
                            <p className="text-xs text-muted-foreground">{10 - index * 3} de Abril, 2025</p>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 5 - index * 0.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">
                          {index === 0
                            ? "Produto incrível! A qualidade do artesanato é excepcional e a entrega foi rápida. Recomendo a todos que valorizam produtos autênticos."
                            : index === 1
                              ? "Muito satisfeito com a compra. O produto é exatamente como descrito e tem um acabamento impecável. Certamente comprarei mais."
                              : "Bom produto, mas demorou um pouco para chegar. A qualidade é boa e o artesanato é bonito, mas esperava que a entrega fosse mais rápida."}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="envio" className="mt-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Informações de Envio</h3>
                    <p className="text-muted-foreground">
                      Todos os produtos são enviados em até 2 dias úteis após a confirmação do pagamento. O prazo de
                      entrega varia de acordo com a região:
                    </p>
                    <ul className="mt-2 space-y-1 pl-5 text-sm">
                      <li>Região Norte: 5-10 dias úteis</li>
                      <li>Região Nordeste: 3-7 dias úteis</li>
                      <li>Região Centro-Oeste: 3-7 dias úteis</li>
                      <li>Região Sudeste: 2-5 dias úteis</li>
                      <li>Região Sul: 3-7 dias úteis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Política de Devolução</h3>
                    <p className="text-muted-foreground">
                      Você pode solicitar a devolução do produto em até 7 dias após o recebimento, desde que o produto
                      esteja em perfeito estado e na embalagem original. Para iniciar o processo de devolução, entre em
                      contato com nosso suporte.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Frete Grátis</h3>
                    <p className="text-muted-foreground">
                      Oferecemos frete grátis para compras acima de R$ 200,00 para todo o Brasil. Para compras abaixo
                      desse valor, o frete é calculado de acordo com o CEP de entrega.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold">Produtos Relacionados</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <Link href={`/produtos/${relatedProduct.id}`} key={relatedProduct.id}>
                    <div className="group overflow-hidden rounded-lg border transition-all hover:shadow-md">
                      <div className="relative aspect-square">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium group-hover:text-terracota">{relatedProduct.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{relatedProduct.description}</p>
                        <p className="mt-2 font-semibold text-terracota">R$ {relatedProduct.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
