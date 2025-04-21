"use client"

import { useState, useEffect } from "react"
import { Newspaper } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { NewsBanner } from "@/types/news-banner"

export default function NewsBanners() {
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState<NewsBanner[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news-banners')
        if (!response.ok) throw new Error('Failed to fetch banners')
        const data = await response.json()
        
        console.log('Raw banners data:', data)
        
        // Filter active banners
        const activeBanners = data.filter((banner: NewsBanner) => {
          const now = new Date()
          const startDate = new Date(banner.startDate)
          const endDate = new Date(banner.endDate)
          
          // Add date validation logging
          if (endDate < startDate) {
            console.warn(`Banner "${banner.title}" has invalid dates: start=${startDate.toISOString()}, end=${endDate.toISOString()}`)
            return false
          }
          
          const isActive = now >= startDate && now <= endDate && banner.status === 'Active'
          
          console.log('Banner:', {
            title: banner.title,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            status: banner.status,
            isActive,
            dateCheck: {
              isAfterStart: now >= startDate,
              isBeforeEnd: now <= endDate
            }
          })
          
          return isActive
        })
        
        console.log('Filtered active banners:', activeBanners)
        setBanners(activeBanners)
      } catch (error) {
        console.error('Error fetching banners:', error)
        toast({
          title: "Error",
          description: "Failed to load announcements",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [toast])

  // Add debug render log
  console.log('Rendering with banners:', banners)

  if (loading) {
    return (
      <div className="w-full bg-gray-50 py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="animate-pulse flex space-x-4 items-center">
            <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // Show debug UI when no banners
  if (banners.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className="w-full bg-yellow-50 text-yellow-800 py-2 px-4 text-sm">
          No active banners found. Check console for debug logs.
        </div>
      )
    }
    return null
  }

  return (
    <div className="w-full bg-[#00957a] text-white py-4">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-nowrap overflow-x-auto gap-8">
          {banners.map((banner) => (
            <div 
              key={banner._id}
              className="flex items-center flex-none min-w-[200px]"
            >
              <Newspaper className="h-5 w-5 mr-2 flex-shrink-0" />
              <div className="flex flex-col">
                <h3 className="font-semibold">{banner.title}</h3>
                <p className="text-sm text-[#e0fbf4]">{banner.content}</p>
              </div>
              {banner.imageUrl && (
                <img 
                  src={banner.imageUrl} 
                  alt={banner.title}
                  className="h-12 w-12 object-cover rounded ml-4"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}