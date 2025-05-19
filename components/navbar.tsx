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

export function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Teko" width={120} height={40} className="h-10 w-auto" />
            <span className="font-marseille text-2xl font-bold text-terracota">Teko</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota",
              isActive("/") ? "text-terracota" : "text-foreground",
            )}
          >
            Início
          </Link>
          <Link
            href="/lojas"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota",
              isActive("/lojas") ? "text-terracota" : "text-foreground",
            )}
          >
            Lojas
          </Link>
          <Link
            href="/produtos"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota",
              isActive("/produtos") ? "text-terracota" : "text-foreground",
            )}
          >
            Produtos
          </Link>
          <Link
            href="/sobre"
            className={cn(
              "text-sm font-medium transition-colors hover:text-terracota",
              isActive("/sobre") ? "text-terracota" : "text-foreground",
            )}
          >
            Sobre
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/carrinho" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-terracota text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href={user.role === "seller" ? "/vendedor" : "/cliente"}>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>{user.name}</span>
                </Button>
              </Link>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:block">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Entrar
                </Button>
              </Link>
            </div>
          )}

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="container flex flex-col gap-6 p-6">
            <Link
              href="/"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota",
                isActive("/") ? "text-terracota" : "text-foreground",
              )}
              onClick={closeMenu}
            >
              Início
            </Link>
            <Link
              href="/lojas"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota",
                isActive("/lojas") ? "text-terracota" : "text-foreground",
              )}
              onClick={closeMenu}
            >
              Lojas
            </Link>
            <Link
              href="/produtos"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota",
                isActive("/produtos") ? "text-terracota" : "text-foreground",
              )}
              onClick={closeMenu}
            >
              Produtos
            </Link>
            <Link
              href="/sobre"
              className={cn(
                "text-lg font-medium transition-colors hover:text-terracota",
                isActive("/sobre") ? "text-terracota" : "text-foreground",
              )}
              onClick={closeMenu}
            >
              Sobre
            </Link>

            <div className="h-px w-full bg-border" />

            {user ? (
              <>
                <Link
                  href={user.role === "seller" ? "/vendedor" : "/cliente"}
                  className="flex items-center gap-2 text-lg font-medium"
                  onClick={closeMenu}
                >
                  <User className="h-5 w-5" />
                  <span>Minha Conta</span>
                </Link>
                <Button
                  variant="ghost"
                  className="flex items-center justify-start gap-2 p-0 text-lg font-medium"
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
              <Link href="/login" className="text-lg font-medium" onClick={closeMenu}>
                Entrar / Cadastrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
