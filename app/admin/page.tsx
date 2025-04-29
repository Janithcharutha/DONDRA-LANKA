'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import Link from "next/link"
import { Package, Tags, TrendingUp, Users, Newspaper } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"
import type { HotDeal } from "@/types/hot-deal"
import type { NewsBanner } from "@/types/news-banner"

export default function AdminDashboard() {
  const { logout, user } = useAuth()
  const [totalProducts, setTotalProducts] = useState<number>(0)
  const [activeHotDeals, setActiveHotDeals] = useState<number>(0)
  const [activeNewsBanners, setActiveNewsBanners] = useState<number>(0)
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Fetch recent products
  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const response = await fetch('/api/products/recent')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setRecentProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
        toast({
          title: "Error",
          description: "Failed to load recent products",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRecentProducts()
  }, [toast])

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total products
        const productsResponse = await fetch('/api/products')
        if (!productsResponse.ok) throw new Error('Failed to fetch products')
        const productsData = await productsResponse.json()
        setTotalProducts(productsData.length)

        // Fetch and filter active hot deals
        const hotDealsResponse = await fetch('/api/hot-deals')
        if (!hotDealsResponse.ok) throw new Error('Failed to fetch hot deals')
        const hotDealsData = await hotDealsResponse.json()
        
        const activeDeals = hotDealsData.filter((deal: HotDeal) => {
          const now = new Date()
          const startDate = new Date(deal.startDate)
          const endDate = new Date(deal.endDate)
          return now >= startDate && now <= endDate && deal.status === 'Active'
        })
        
        setActiveHotDeals(activeDeals.length)

        // Fetch and filter active news banners
        const newsBannersResponse = await fetch('/api/news-banners')
        if (!newsBannersResponse.ok) throw new Error('Failed to fetch news banners')
        const newsBannersData = await newsBannersResponse.json()
        
        const activeBanners = newsBannersData.filter((banner: NewsBanner) => {
          const now = new Date()
          const startDate = new Date(banner.startDate)
          const endDate = new Date(banner.endDate)
          return now >= startDate && now <= endDate && banner.status === 'Active'
        })
        
        setActiveNewsBanners(activeBanners.length)
      } catch (error) {
        console.error('Error fetching stats:', error)
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        })
      }
    }

    fetchStats()
  }, [toast])

  // Stats array
  const stats = [
    {
      title: "Total Products",
      value: loading ? "..." : totalProducts.toString(),
      change: "+12%", // You might want to calculate this based on historical data
      trend: "up",
      icon: <Package className="h-8 w-8 text-[#00957a]" />,
      link: "/admin/products",
    },
    {
      title: "Active Hot Deals",
      value: loading ? "..." : activeHotDeals.toString(),
      change: `+${activeHotDeals}`, // Or calculate the change from last period
      trend: "up",
      icon: <Tags className="h-8 w-8 text-[#00957a]" />,
      link: "/admin/hot-deals",
    },
    {
      title: "Active News Banners",
      value: loading ? "..." : activeNewsBanners.toString(),
      change: `+${activeNewsBanners}`,
      trend: "up",
      icon: <Newspaper className="h-8 w-8 text-[#00957a]" />,
      link: "/admin/news-banners",
    },
  ]

  useEffect(() => {
    const handleTabClose = () => {
      if (user) {
        logout()
      }
    }

    window.addEventListener('beforeunload', handleTabClose)
    
    return () => {
      window.removeEventListener('beforeunload', handleTabClose)
    }
  }, [user, logout])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            href={stat.link}
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                <p className={`text-sm mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="bg-[#e0fbf4] p-3 rounded-full">{stat.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-[#00957a] text-white rounded-md hover:bg-[#007a64] transition-colors"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/hot-deals/new"
            className="px-4 py-2 bg-[#00957a] text-white rounded-md hover:bg-[#007a64] transition-colors"
          >
            Create Hot Deal
          </Link>
          <Link
            href="/admin/news-banners/new"
            className="px-4 py-2 bg-[#00957a] text-white rounded-md hover:bg-[#007a64] transition-colors"
          >
            Add News Banner
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-[#00957a] text-[#00957a] rounded-md hover:bg-[#e0fbf4] transition-colors"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/hot-deals"
            className="px-4 py-2 border border-[#00957a] text-[#00957a] rounded-md hover:bg-[#e0fbf4] transition-colors"
          >
            Manage Hot Deals
          </Link>
          
          <Link
            href="/admin/news-banners"
            className="px-4 py-2 border border-[#00957a] text-[#00957a] rounded-md hover:bg-[#e0fbf4] transition-colors"
          >
            Manage News Banners
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
          <Link href="/admin/products" className="text-[#00957a] hover:underline text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Category
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                // Loading skeleton
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </td>
                  </tr>
                ))
              ) : (
                recentProducts.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{product.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Rs. {product.price.toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : product.status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link 
                        href={`/admin/products/${product._id}/edit`} 
                        className="text-[#00957a] hover:text-[#007a64] mr-4"
                      >
                        Edit
                      </Link>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
