'use client'

import { use } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"
import type { Product } from '@/types/product'

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
    if (!product) return

    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    const productData = {
      name: formData.get('name'),
      category: formData.get('category'),
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
      status: formData.get('status'),
      minOrder: formData.get('minOrder'),
      description: formData.get('description'),
      images: images,
    }

    try {
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
      router.push('/admin/products')
      router.refresh()
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
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
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
              defaultValue="Dry Fish" 
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="Dry Fish">Dry Fish</option>
              <option value="Sour Fish Curry">Sour Fish Curry</option>
              <option value="Sri Lanka Spices">Sri Lanka Spices</option>
            </select>
          </div>
          <label className="block mb-2 font-medium">Description</label>
          <Input 
            name="description" 
            defaultValue={product.description} 
            required 
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">Price</label>
              <Input 
                type="number" 
                name="price" 
                defaultValue={product.price} 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Stock</label>
              <Input 
                type="number" 
                name="stock" 
                defaultValue={product.stock} 
                required 
              />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium">Minimum Order Quantity</label>
            <Input 
              name="minOrder" 
              defaultValue={product.minOrder} 
              placeholder="e.g., 1kg, 500g, 5 pieces"
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
            <div className="space-y-2">
              {images.map((image, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <img src={image} alt={`Uploaded ${index}`} className="w-16 h-16 object-cover rounded-md" />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => removeImage(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="block mb-2 font-medium">Upload Images</label>
              <input 
                type="file" 
                multiple 
                onChange={handleImageUpload} 
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-100"
              />
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
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}