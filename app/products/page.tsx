"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Product } from "@/types/product"
import HotDeals from "@/components/hot-deals"
import CategorySlider from "@/components/category-slider"
import WhatsAppButton from "@/components/whatsapp-button"
import PriceButton from "@/components/price-button"
type CategoryProducts = {
  [key: string]: Product[]
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'In Stock':
      return 'bg-green-100 text-green-800'
    case 'Low Stock':
      return 'bg-yellow-100 text-yellow-800'
    case 'Out of Stock':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function ProductsPage() {
  const [categoryProducts, setCategoryProducts] = useState<CategoryProducts>({
    'Fish Ambul Thiyal': [],
    'SRI LANKA SPICES': [],
    'DRY FISH': [],
    'Maldives Fish': [],
    'Other': []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        
        // Group products by category
        const grouped = data.reduce((acc: CategoryProducts, product: Product) => {
          if (!acc[product.category]) {
            acc[product.category] = []
          }
          acc[product.category].push(product)
          return acc
        }, {})
        
        setCategoryProducts(grouped)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded mb-4" />
                <div className="flex justify-between items-center">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                  <div className="h-8 w-24 bg-gray-200 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <CategorySlider />
      <WhatsAppButton />
      <h1 className="text-4xl font-bold text-[#023E8A] mb-8 text-center">Our Products</h1>

      <div className="mb-12">
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Discover our range of premium tuna products, sourced sustainably and delivered fresh to your doorstep. All our
          products are carefully handled to ensure the highest quality and freshness.
        </p>
      </div>
      <div className="mb-12">
      <HotDeals />
      </div>
      <PriceButton/>
      {/* Category Sections */}
      {Object.entries(categoryProducts).map(([category, products]) => (
        products.length > 0 && (
          <section key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-[#023E8A] mb-6">{category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Show only first 3 products */}
              {products.slice(0, 3).map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="h-48 bg-[#c2f8e9] flex items-center justify-center relative">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    {/* Add status badge */}
                    <span
                      className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#3aaa9e]">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-800">Rs. {product.price.toFixed(2)}</span>
                      <Link
                        href={`/products/${product._id}`}
                        className="px-4 py-2 bg-[#3aaa9e] text-white rounded hover:bg-[#2d8a80] transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Show View All button if more than 3 products exist */}
            {products.length > 3 && (
              <div className="mt-6 text-center">
                <Link
                  href={`/products/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center px-6 py-3 bg-[#3aaa9e] text-white rounded-md hover:bg-[#2d8a80] transition-colors"
                >
                  View all {category} products
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                </Link>
              </div>
            )}
          </section>
        )
      ))}
    </main>
  )
}
