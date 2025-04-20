"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const productCategories = [
  { id: "fresh-tuna", name: "Fresh Tuna" },
  { id: "tuna-steaks", name: "Tuna Steaks" },
  { id: "tuna-fillets", name: "Tuna Fillets" },
  { id: "smoked-tuna", name: "Smoked Tuna" },
  { id: "canned-tuna", name: "Canned Tuna" },
  { id: "tuna-sashimi", name: "Tuna Sashimi" },
  { id: "tuna-tartare", name: "Tuna Tartare" },
  { id: "tuna-burgers", name: "Tuna Burgers" },
  { id: "tuna-salad", name: "Tuna Salad" },
]

export default function ProductCategoryTabs() {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate dimensions on mount and window resize
  useEffect(() => {
    const calculateDimensions = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current
        const firstItem = container.querySelector("[data-item]") as HTMLElement

        if (firstItem) {
          const itemRect = firstItem.getBoundingClientRect()
          const containerRect = container.getBoundingClientRect()

          setItemWidth(itemRect.width + 16) // width + gap
          setContainerWidth(containerRect.width)
        }
      }
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)

    return () => {
      window.removeEventListener("resize", calculateDimensions)
    }
  }, [])

  // Function to scroll to a specific index
  const scrollToIndex = (index: number, behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current && itemWidth > 0) {
      const scrollPosition = index * itemWidth
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

    // Handle loop
    if (newIndex < 0) {
      newIndex = productCategories.length - 1
    } else if (newIndex >= productCategories.length) {
      newIndex = 0
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

          if (newIndex >= productCategories.length) {
            newIndex = 0
          }

          scrollToIndex(newIndex)
        }
      }, 3000)
    }

    startAutoScroll()

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current)
      }
    }
  }, [currentIndex, isPaused])

  return (
    <div className="relative py-4 bg-gray-50 border-t border-b">
      <div className="container mx-auto px-4 relative max-w-5xl">
        <button
          onClick={() => handleNavigation("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6 text-gray-600" />
        </button>

        <div className="overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
          <div ref={scrollContainerRef} className="flex gap-4 py-2 scrollbar-hide">
            {productCategories.map((category, index) => (
              <button
                key={`${category.id}-${index}`}
                onClick={() => {
                  setActiveCategory(category.id)
                  setIsPaused(true)
                  setTimeout(() => setIsPaused(false), 5000)
                }}
                className={`px-4 py-2 whitespace-nowrap rounded-full transition-colors flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-[#00957a] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                data-item
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => handleNavigation("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6 text-gray-600" />
        </button>
      </div>
    </div>
  )
}
