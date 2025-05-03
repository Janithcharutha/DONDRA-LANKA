"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Upload, X } from "lucide-react"

export default function NewProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [imageError, setImageError] = useState<string | null>(null)
  const [categories, setCategories] = useState<Array<{ _id: string, name: string }>>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [toast])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setUploading(true)
    const files = Array.from(e.target.files)

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'tunastore_preset') // Use your preset name
        formData.append('folder', 'tunastore') // Optional: organize images in folders

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dr5ts47zf/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()
        console.log('Upload response:', data) // Debug upload response
        return data.secure_url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      console.log('Uploaded URLs:', uploadedUrls) // Debug uploaded URLs

      setImages(prev => [...prev, ...uploadedUrls])
      toast({
        title: "Success",
        description: `${uploadedUrls.length} images uploaded successfully`,
      })
    } catch (error) {
      console.error('Upload error:', error)
      setImageError("Failed to upload images. Please try again.")
      toast({
        title: "Error",
        description: "Failed to upload images. Please try again.",
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
    
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one image",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const description = formData.get('description')
      
      // Add validation for description
      if (!description || description.toString().trim() === '') {
        throw new Error('Description is required')
      }

      const productData = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: Number(formData.get('price')),
        description: description,
        minOrder: formData.get('minOrder'),
        images: images,
        status: 'In Stock'
      }

      console.log('Submitting product data:', productData) // Debug log

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      })

      const responseData = await response.json()
      console.log('Server response:', responseData) // Debug log

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create product')
      }

      toast({
        title: "Success",
        description: "Product created successfully",
      })
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      console.error('Submission error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to create product',
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <Input name="name" required />
        </div>
        <div>
          <label className="block mb-2">Category</label>
          <select 
            name="category" 
            defaultValue={categories[0]?.name} 
            className="w-full p-2 border rounded-md"
            required
          >
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2">Price</label>
          <Input type="number" name="price" required />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            required
            className="w-full p-2 border rounded-md min-h-[100px]"
            placeholder="Enter product description"
          />
        </div>

        <div>
           <label className="block mb-2">Minimum Order Quantity</label>
           <Input 
             name="minOrder" 
             defaultValue="1KG"
             placeholder="e.g. 1kg, 500g, 5 pieces" 
             required 
            />
  <p className="text-sm text-gray-500 mt-1">
    Specify the minimum quantity that can be ordered
  </p>
</div>


        <div>
          <label className="block mb-2">Product Images</label>
          <div className="space-y-4">
            <Input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              multiple
              disabled={uploading}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Images'}
            </label>
            {imageError && (
              <p className="text-sm text-red-500 mt-1">
                {imageError}
              </p>
            )}
            {uploading && (
              <div className="mt-2 text-sm text-gray-500">
                Uploading images... Please wait...
              </div>
            )}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((url, index) => (
                  <div 
                    key={`${url}-${index}`} 
                    className="relative group"
                  >
                    <img
                      src={url}
                      alt={`Product image ${index + 1}`}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-[#00957a] hover:bg-[#007a64]"
          disabled={loading || uploading}
        >
          {loading ? 'Creating...' : 'Create Product'}
        </Button>
      </form>
    </div>
  )
}