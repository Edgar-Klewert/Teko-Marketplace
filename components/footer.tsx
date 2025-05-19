import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-terracota text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="Teko" width={160} height={50} className="h-14 w-auto" />
            </Link>
            <p className="text-sm">
              Marketplace de artesanato e insumos do norte do Brasil, valorizando a cultura local e a bioeconomia.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-terracota-light">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-terracota-light">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-terracota-light">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Navegação</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-terracota-light">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/lojas" className="hover:text-terracota-light">
                  Lojas
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="hover:text-terracota-light">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-terracota-light">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Para Vendedores</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/vendedor/cadastro" className="hover:text-terracota-light">
                  Abra sua loja
                </Link>
              </li>
              <li>
                <Link href="/vendedor/produtos" className="hover:text-terracota-light">
                  Gerenciar produtos
                </Link>
              </li>
              <li>
                <Link href="/vendedor/pedidos" className="hover:text-terracota-light">
                  Pedidos
                </Link>
              </li>
              <li>
                <Link href="/vendedor/suporte" className="hover:text-terracota-light">
                  Suporte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Contato</h3>
            <address className="not-italic text-sm">
              <p>Av. Pará, 1234</p>
              <p>Belém, PA</p>
              <p>CEP: 69000-000</p>
              <p className="mt-2">contato@teko.com.br</p>
              <p>(92) 3333-4444</p>
            </address>
          </div>
        </div>

        <div className="mt-8 border-t border-terracota-light pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Teko Marketplace. Todos os direitos reservados.</p>
          <p className="mt-2">
            <Link href="/termos" className="hover:text-terracota-light">
              Termos de Uso
            </Link>
            {" | "}
            <Link href="/privacidade" className="hover:text-terracota-light">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
