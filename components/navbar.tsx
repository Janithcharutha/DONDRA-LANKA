"use client"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ]

  const isActive = (path: string) => pathname === path

  // Hide navbar on admin pages
  if (pathname.startsWith("/admin")) return null

  return (
    <header className="bg-[#211C84] text-white sticky top-0 z-50 py-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DONDRA-LANKA Logo"
              width={180}
              height={72}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`hover:text-white/80 font-medium transition-colors ${
                  isActive(item.path) ? "border-b-2 border-white" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-white/10"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-2 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`hover:text-white/80 font-medium ${
                    isActive(item.path) ? "border-b border-white" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
