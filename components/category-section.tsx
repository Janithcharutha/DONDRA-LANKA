'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import type { Product } from '@/types/product'

interface CategorySectionProps {
  category: string
  title: string
}

export default function CategorySection({ category, title }: CategorySectionProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/category/${category}`)
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error)
        toast({
          title: "Error",
          description: `Failed to load ${category} products`,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [category, toast])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00957a]"></div>
      </div>
    )
  }

  if (!products.length) {
    return null
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product._id}`}
            className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="h-48 bg-[#e0fbf4] relative">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#00957a] truncate">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product.category}
              </p>
              <span className="font-bold">
                Rs. {product.price.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}