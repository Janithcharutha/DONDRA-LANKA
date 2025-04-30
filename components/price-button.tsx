'use client'

import { useEffect, useRef, useState } from "react"
import { FaWpforms, FaTimes } from "react-icons/fa"
import { AnimatePresence, motion } from "framer-motion"

interface PriceList {
  imageUrl: string;
  _id: string;
  status: string;
}

export default function PriceButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [priceList, setPriceList] = useState<PriceList | null>(null)
  const [loading, setLoading] = useState(true)
  const popupRef = useRef<HTMLDivElement>(null)

  const fetchPriceList = async () => {
    try {
      const response = await fetch('/api/price-list/active', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })

      if (!response.ok) throw new Error('Failed to fetch price list')
      const data = await response.json()
      setPriceList(data)
      console.log('Fetched price list:', data)
    } catch (error) {
      console.error('Error fetching price list:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchPriceList()
  }, [])

  useEffect(() => {
    if (isOpen) {
      fetchPriceList()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      <div className="fixed bottom-28 right-8 z-40 flex flex-col items-end">
      <div className="fixed bottom-28 right-8 z-40 flex flex-col items-center space-y-0.5">
  <span className="text-[#023E8A] text-sm font-medium    ">
    Price List
  </span>

  <button
    onClick={() => setIsOpen(!isOpen)}
    className="bg-[#0077B6] text-white p-3 rounded-full shadow-lg hover:bg-[#023E8A] transition-colors duration-300"
    title="Show Price List"
  >
    <FaWpforms className="w-10 h-10" />
  </button>
</div>



        {isOpen && (
          <div ref={popupRef} className="mt-2 p-2 bg-white rounded-lg shadow-lg w-80">
            {loading ? (
              <div className="h-48 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : priceList ? (
              <img
                src={`${priceList.imageUrl}?t=${new Date().getTime()}`}
                alt="Price List"
                className="rounded-lg w-full h-auto cursor-pointer"
                loading="eager"
                onClick={() => setIsFullscreen(true)}
              />
            ) : (
              <p className="text-center py-4 text-gray-500">No price list available</p>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFullscreen && priceList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute -top-8 -right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src={`${priceList.imageUrl}?t=${new Date().getTime()}`}
                alt="Price List"
                className="max-w-[90%] max-h-[90vh] object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
