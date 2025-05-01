"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { NewsBanner } from "@/types/news-banner"

export default function NewsBanners() {
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState<NewsBanner[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/news-banners')
        if (!response.ok) throw new Error('Failed to fetch banners')
        const data = await response.json()

        const activeBanners = data.filter((banner: NewsBanner) => {
          const now = new Date()
          const startDate = new Date(banner.startDate)
          const endDate = new Date(banner.endDate)
          return now >= startDate && now <= endDate && banner.status === 'Active'
        })

        setBanners(activeBanners)
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Failed to load banners",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [toast])

  useEffect(() => {
    if (banners.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((current) =>
        current === banners.length - 1 ? 0 : current + 1
      )
    }, 2500)

    return () => clearInterval(timer)
  }, [banners.length])

  if (loading || banners.length === 0) return null

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[3/1] max-h-[600px] overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner._id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.imageUrl}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
