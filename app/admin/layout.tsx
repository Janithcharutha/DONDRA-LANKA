"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Package, Tags, Users, Settings, LogOut, Menu, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Newspaper } from "lucide-react";
import { FaWpforms } from "react-icons/fa"


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Check if the current route is an auth route
  const isAuthRoute = pathname.includes("/admin/auth/")

  // Redirect to login if not authenticated and not on an auth route
  useEffect(() => {
    // Check token expiration
    const token = localStorage.getItem('token')
    if (!token && !isAuthRoute) {
      router.push("/admin/auth/login")
      return
    }

    // Optional: Validate token with backend
    const validateToken = async () => {
      try {
        const response = await fetch('/api/auth/validate', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!response.ok) {
          logout()
        }
      } catch (error) {
        console.error('Token validation error:', error)
        logout()
      }
    }

    if (token && !isAuthRoute) {
      validateToken()
    }
  }, [isAuthenticated, isAuthRoute, router])

  // If on auth route, render children directly without admin layout
  if (isAuthRoute) {
    return <>{children}</>
  }

  // If not authenticated and not on auth route, don't render anything while redirecting
  if (!isAuthenticated) {
    return null
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Products",
      href: "/admin/products",
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: "Hot Deals",
      href: "/admin/hot-deals",
      icon: <Tags className="h-5 w-5" />,
    },
    {
      name: "News Banners",
      href: "/admin/news-banners",
      icon: <Newspaper className="h-5 w-5" />,
    },
    {
      name: "Price List",
      href: "/admin/price-list",
      icon: <FaWpforms className="h-5 w-5" />,
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/admin/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b p-4 flex justify-between items-center">
        <Link href="/admin" className="flex items-center">
          <span className="font-bold text-xl text-[#00957a]">DONDRA-LANKA</span>
          <span className="ml-2 text-sm text-gray-500">Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-white border-r`}
      >
        <div className="p-5 border-b">
          <Link href="/admin" className="flex items-center">
            <span className="font-bold text-xl text-[#00957a]">DONDRA-LANKA</span>
            <span className="ml-2 text-sm text-gray-500">Admin</span>
          </Link>
        </div>
        <div className="py-5 px-3">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(item.href) ? "bg-[#00957a] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t">
          <div className="mb-4 px-3 py-2">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-gray-500">{user?.email}</div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-gray-800 bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
