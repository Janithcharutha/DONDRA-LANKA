'use client'

import { use } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"
import type { Product, ProductStatus } from '@/types/product'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        const data = await response.json()
        setProduct(data)
        setImages(data.images || [])
      } catch (error) {
        console.error('Error fetching product:', error)
        toast({
          title: "Error",
          description: "Failed to fetch product",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id, toast])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setUploading(true)
    const files = Array.from(e.target.files)

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'tunastore_preset')

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dr5ts47zf/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) throw new Error('Upload failed')
        const data = await response.json()
        return data.secure_url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      setImages(prev => [...prev, ...uploadedUrls])
      toast({
        title: "Success",
        description: `${uploadedUrls.length} images uploaded successfully`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        description: formData.get('description'),
        minOrder: formData.get('minOrder'), // Add this line
        images: images,
        status: formData.get('status')
      }

      // Validate required fields
      if (!productData.minOrder) {
        throw new Error('Minimum order quantity is required')
      }

      const { id } = await params
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) throw new Error('Failed to update product')

      toast({
        title: "Success",
        description: "Product updated successfully",
      })

      // Force a cache invalidation and refresh
      router.push('/admin/products')
      router.refresh()
      
      // Additional cache clearing
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: '/admin/products' }),
      })

    } catch (error) {
      console.error('Error updating product:', error)
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as ProductStatus
    
    try {
      setLoading(true)
      const response = await fetch(`/api/products/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      toast({
        title: "Success",
        description: "Product status updated successfully",
      })

      // Force refresh of both admin pages
      router.refresh()
      router.push('/admin/products')
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
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
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold mb-2">Product not found</h2>
        <Button 
          onClick={() => router.push('/admin/products')}
          variant="outline"
        >
          Back to Products
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
          <div>
            <label className="block mb-2 font-medium">Name</label>
            <Input name="name" defaultValue={product.name} required />
          </div>

          <div>
            <label className="block mb-2">Category</label>
            <select 
              name="category" 
              defaultValue={product.category}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00957a]"
              required
            >
              <option value="Dry Fish">Dry Fish</option>
              <option value="Fish Ambul Thiyal">Fish Ambul Thiyal</option>
              <option value="Sri Lanka Spices">Sri Lanka Spices</option>
              <option value="Sea Foods">SEA FOODS</option>
              <option value="Other">Other</option>

              
            </select>
          </div>


          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Price (Rs.)</label>
              <Input 
                type="number" 
                name="price" 
                defaultValue={product.price} 
                step="0.01"
                min="0"
                required 
              />
            </div>
          </div>
          <div>
  <label className="block mb-2">Minimum Order Quantity</label>
  <Input 
    name="minOrder" 
    defaultValue={product?.minOrder ?? "1KG"}
    placeholder="e.g. 1kg, 500g, 5 pieces" 
    required 
  />
  <p className="text-sm text-gray-500 mt-1">
    Specify the minimum quantity that can be ordered
  </p>
</div>


          <div>
            <label className="block mb-2 font-medium">Status</label>
            <select 
              name="status" 
              defaultValue={product.status}
              onChange={handleStatusChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00957a]"
              required
            >
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Images</label>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#00957a] file:text-white hover:file:bg-[#007a64]"
              />
              {uploading && (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-[#00957a] border-t-transparent rounded-full"></div>
                  Uploading images...
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="bg-[#00957a] hover:bg-[#007a64]"
            disabled={loading || uploading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}