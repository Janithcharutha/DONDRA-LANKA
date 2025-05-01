'use client'
import WhatsAppButton from "@/components/whatsapp-button"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from '@/types/product'
import CategorySection from "@/components/category-section"

export default function ProductDetail({ id }: { id: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingRelated, setLoadingRelated] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedType, setSelectedType] = useState('')
  const [selectedWeight, setSelectedWeight] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch main product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        const data = await response.json()
        console.log('Fetched product data:', data) // Add this line to debug
        setProduct(data)
        setSelectedType(data.types?.[0] ?? '')
        setSelectedWeight(data.weightOptions?.[0] ?? '')
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/${id}/related`)
        if (!response.ok) throw new Error('Failed to fetch related products')
        const data = await response.json()
        setRelatedProducts(data)
      } catch (error) {
        console.error('Error fetching related products:', error)
      }
    }

    if (id) {
      fetchRelatedProducts()
    }
  }, [id])

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }

      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
      router.push('/products')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00957a]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <Link href="/products" className="text-[#00957a] hover:underline">
          Back to Products
        </Link>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <WhatsAppButton />
      {/* Breadcrumb and Actions */}
      <div className="flex justify-between items-center mb-6">
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="text-[#00957a] hover:underline">Home</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <Link href="/products" className="text-[#00957a] hover:underline">Products</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span>{product.category}</span>
        </nav>
        

      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="mb-4 border rounded-lg overflow-hidden">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border rounded-lg overflow-hidden ${
                    selectedImage === index ? "border-[#00957a] border-2" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-full h-auto"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-2">
              <Link 
                href={`/products/category/${product.category.toLowerCase()}`} 
                className="text-[#00957a]"
              >
                {product.category}
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            {/* Add Status Badge */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${
                  product.status === "In Stock"
                    ? "bg-green-100 text-green-800"
                    : product.status === "Low Stock"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {product.status}
              </span>
            </div>

            {/* Enhanced Minimum Order Display */}
            <div className="mb-6 mt-6">
  <h3 className="text-lg font-semibold mb-2">
    Minimum Order - {product.minOrder}
  </h3>
  <p className="text-sm text-gray-500 mt-1">
    This is the minimum quantity required for ordering
  </p>
</div>

            {/* Price */}
            <div className="mt-6">
              <div className="text-3xl font-bold text-gray-800">
                Rs. {product.price.toFixed(2)}
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {product?.description ? product.description : "No description available"}
              </p>
            </div>
          </div>
        </div>
      </div>

     

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct._id}
                href={`/products/${relatedProduct._id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-[#e0fbf4] relative">
                  <img
                    src={relatedProduct.images[0] || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#00957a] truncate">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {relatedProduct.category}
                  </p>
                  <span className="font-bold">
                    Rs. {relatedProduct.price.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  )
}