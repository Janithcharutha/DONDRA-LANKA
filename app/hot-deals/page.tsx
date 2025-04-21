"use client"

import { useState, useEffect } from "react"
import { Tag, Clock } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { HotDeal } from "@/types/hot-deal"
import Link from "next/link"

export default function AllHotDealsPage() {
  const [loading, setLoading] = useState(true)
  const [hotDeals, setHotDeals] = useState<HotDeal[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await fetch('/api/hot-deals')
        if (!response.ok) {
          throw new Error('Failed to fetch hot deals')
        }
        const data = await response.json()
        
        // Filter active deals
        const activeDeals = data.filter((deal: HotDeal) => {
          const now = new Date()
          const startDate = new Date(deal.startDate)
          const endDate = new Date(deal.endDate)
          return now >= startDate && now <= endDate && deal.status === 'Active'
        })
        
        setHotDeals(activeDeals)
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Failed to load hot deals",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHotDeals()
  }, [toast])

  const getTimeLeft = (endDate: string) => {
    const diff = new Date(endDate).getTime() - new Date().getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return 'Expired'
    if (days === 0) return 'Ends today'
    if (days === 1) return '1 day'
    return `${days} days`
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl py-8">
      <div className="flex items-center mb-6">
        <Tag className="w-6 h-6 text-[#00957a] mr-2" />
        <h1 className="text-2xl font-bold text-[#00957a]">All Hot Deals</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading hot deals...</p>
        </div>
      ) : hotDeals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No active hot deals available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotDeals.map((deal) => (
            <div
              key={deal._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <div className="h-48 bg-[#e0fbf4] flex items-center justify-center">
                  <img
                    src={deal.product.images[0] || "/placeholder.jpg"}
                    alt={deal.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-[#00957a] text-white px-2 py-1 rounded-full text-xs font-bold">
                  -{deal.discount}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-[#00957a]">
                  {deal.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{deal.description}</p>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-gray-400 line-through text-sm">
                      Rs. {deal.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-[#00957a] font-bold text-lg ml-2">
                      Rs. {deal.discountedPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center text-orange-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{getTimeLeft(deal.endDate)} left</span>
                  </div>
                </div>
                <Link
                  href={`/products/${deal.product._id}`}
                  className="block w-full text-center bg-[#00957a] text-white py-2 rounded hover:bg-[#007a64] transition-colors"
                >
                  View Deal
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}