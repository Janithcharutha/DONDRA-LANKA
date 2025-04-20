"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, Tag } from "lucide-react"

const hotDeals = [
  {
    id: 1,
    name: "Fresh Yellowfin Tuna - Special Offer",
    description: "Premium quality yellowfin tuna at a special discount price. Limited time offer!",
    originalPrice: "Rs. 2,200",
    discountedPrice: "Rs. 1,800",
    discount: "18%",
    image: "/placeholder.svg",
    timeLeft: "2 days",
  },
  {
    id: 2,
    name: "Tuna Steak Bundle",
    description: "Buy 3 premium tuna steaks and get 1 free. Perfect for family dinners.",
    originalPrice: "Rs. 6,600",
    discountedPrice: "Rs. 4,950",
    discount: "25%",
    image: "/placeholder.svg",
    timeLeft: "3 days",
  },
  {
    id: 3,
    name: "Seafood Mix Pack",
    description: "Combination of tuna, prawns, and crab meat at a special bundle price.",
    originalPrice: "Rs. 5,500",
    discountedPrice: "Rs. 4,400",
    discount: "20%",
    image: "/placeholder.svg",
    timeLeft: "1 day",
  },
  {
    id: 4,
    name: "Premium Sashimi Grade Tuna",
    description: "Restaurant-quality sashimi grade tuna. Weekend special offer!",
    originalPrice: "Rs. 3,200",
    discountedPrice: "Rs. 2,560",
    discount: "20%",
    image: "/placeholder.svg",
    timeLeft: "4 days",
  },
]

export default function HotDeals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleItems, setVisibleItems] = useState(3)
  const [itemWidth, setItemWidth] = useState(0)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Update visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    updateVisibleItems()
    window.addEventListener("resize", updateVisibleItems)
    return () => window.removeEventListener("resize", updateVisibleItems)
  }, [])

  // Calculate item width based on container and visible items
  useEffect(() => {
    const calculateItemWidth = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth
        const gap = 24 // 6 * 4px (gap-6)
        const totalGapWidth = gap * (visibleItems - 1)
        const width = (containerWidth - totalGapWidth) / visibleItems
        setItemWidth(width)
      }
    }

    calculateItemWidth()
    window.addEventListener("resize", calculateItemWidth)

    return () => {
      window.removeEventListener("resize", calculateItemWidth)
    }
  }, [visibleItems])

  // Function to scroll to a specific index
  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current && itemWidth > 0) {
      const gap = 24 // 6 * 4px (gap-6)
      const scrollPosition = index * (itemWidth + gap)
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior,
      })
      setCurrentIndex(index)
    }
  }

  // Handle manual navigation
  const handleNavigation = (direction: "left" | "right") => {
    setIsPaused(true)

    let newIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1

    // Handle boundaries
    if (newIndex < 0) {
      newIndex = 0
    } else if (newIndex > hotDeals.length - visibleItems) {
      newIndex = hotDeals.length - visibleItems
    }

    scrollToIndex(newIndex)

    // Resume auto-scrolling after 5 seconds
    setTimeout(() => setIsPaused(false), 5000)
  }

  // Auto-scroll functionality
  useEffect(() => {
    const startAutoScroll = () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }

      autoScrollIntervalRef.current = setInterval(() => {
        if (!isPaused && scrollContainerRef.current) {
          let newIndex = currentIndex + 1

          // Reset to beginning when reaching the end
          if (newIndex > hotDeals.length - visibleItems) {
            newIndex = 0
            scrollToIndex(newIndex, "auto")
          } else {
            scrollToIndex(newIndex)
          }
        }
      }, 4000)
    }

    startAutoScroll()

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [currentIndex, isPaused, visibleItems])

  return (
    <section className="py-8 bg-gradient-to-r from-[#c2f8e9] to-[#e0fbf4]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Tag className="w-6 h-6 text-[#00957a] mr-2" />
            <h2 className="text-2xl font-bold text-[#00957a]">Hot Deals</h2>
          </div>
          <Link href="/products" className="text-[#00957a] font-medium hover:underline">
            View All Deals
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={() => handleNavigation("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
            aria-label="Previous deals"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div ref={scrollContainerRef} className="flex gap-6 py-2 scrollbar-hide">
              {hotDeals.map((deal, index) => (
                <div
                  key={`${deal.id}-${index}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex-shrink-0"
                  style={{ width: `${itemWidth}px` }}
                  data-item
                >
                  <div className="relative">
                    <div className="h-48 bg-[#e0fbf4] flex items-center justify-center">
                      <svg
                        viewBox="0 0 100 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-24 h-24 text-[#3aaa9e]"
                      >
                        <path
                          d="M80 25C80 25 65 15 50 15C35 15 20 25 20 25C20 25 35 35 50 35C65 35 80 25 80 25Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M20 25H10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M90 20L80 25L90 30"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="45" cy="22" r="2" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    </div>
                    <div className="absolute top-2 right-2 bg-[#00957a] text-white px-2 py-1 rounded-full text-xs font-bold">
                      -{deal.discount}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-[#00957a]">{deal.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{deal.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-gray-400 line-through text-sm">{deal.originalPrice}</span>
                        <span className="text-[#00957a] font-bold text-lg ml-2">{deal.discountedPrice}</span>
                      </div>
                      <div className="flex items-center text-orange-500 text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{deal.timeLeft} left</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleNavigation("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
            aria-label="Next deals"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}
