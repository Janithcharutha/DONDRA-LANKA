"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/products/featured', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        console.log('Fetched products:', data) // Debug log
        
        if (Array.isArray(data)) {
          setFeaturedProducts(data)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.error('Error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Don't show anything while loading
  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#3aaa9e] mb-4">Featured Products</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore our collection of premium-quality dried fish, seafoods, and hygienic food products
          </p>
        </div>

        {error ? (
          <div className="text-center text-red-600 mb-8">{error}</div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center text-gray-600 mb-8">No products available</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product._id}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-[#c2f8e9] relative">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#3aaa9e]">{product.name}</h3>
                  <p className="text-gray-600 mt-2">Rs. {product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild className="bg-[#3aaa9e] hover:bg-[#2d8a80]">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
