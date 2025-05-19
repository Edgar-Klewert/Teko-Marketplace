"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

export function Header() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-terracota text-white backdrop-blur supports-[backdrop-filter]:bg-terracota/95">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Teko" width={160} height={50} className="h-14 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota-light",
              isActive("/") ? "text-white font-bold" : "text-white",
            )}
          >
            Início
          </Link>
          <Link
            href="/lojas"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota-light",
              isActive("/lojas") ? "text-white font-bold" : "text-white",
            )}
          >
            Lojas
          </Link>
          <Link
            href="/produtos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota-light",
              isActive("/produtos") ? "text-white font-bold" : "text-white",
            )}
          >
            Produtos
          </Link>
          <Link
            href="/sobre"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota-light",
              isActive("/sobre") ? "text-white font-bold" : "text-white",
            )}
          >
            Sobre
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/carrinho" className="relative text-white">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs text-terracota">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href={user.role === "seller" ? "/vendedor" : "/cliente"}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-2 text-white hover:text-terracota-light hover:bg-terracota-dark"
                >
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={logout}
                className="text-white hover:text-terracota-light hover:bg-terracota-dark"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link href="/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white text-white hover:bg-white hover:text-terracota"
                >
                  Entrar
                </Button>
              </Link>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:text-terracota-light hover:bg-terracota-dark"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-terracota md:hidden">
          <nav className="container flex flex-col gap-6 p-6">
            <Link
              href="/"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota-light",
                isActive("/") ? "text-white font-bold" : "text-white",
              )}
              onClick={closeMenu}
            >
              Início
            </Link>
            <Link
              href="/lojas"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota-light",
                isActive("/lojas") ? "text-white font-bold" : "text-white",
              )}
              onClick={closeMenu}
            >
              Lojas
            </Link>
            <Link
              href="/produtos"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota-light",
                isActive("/produtos") ? "text-white font-bold" : "text-white",
              )}
              onClick={closeMenu}
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota-light",
                isActive("/sobre") ? "text-white font-bold" : "text-white",
              )}
              onClick={closeMenu}
            >
              Sobre
            </Link>

            <div className="h-px w-full bg-white/20" />

            {user ? (
              <>
                <Link
                  href={user.role === "seller" ? "/vendedor" : "/cliente"}
                  className="flex items-center gap-2 text-lg font-medium text-white"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Minha Conta</span>
                </Link>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-2 p-0 text-lg font-medium text-white hover:text-terracota-light"
                  onClick={() => {
                    logout()
                    closeMenu()
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </Button>
              </>
            ) : (
              <Link href="/login" className="text-lg font-medium text-white" onClick={closeMenu}>
                Entrar / Cadastrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
