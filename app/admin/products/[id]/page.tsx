"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, Upload, X, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { Product } from "@/types/product"

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)
  const [images, setImages] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [weightOptions, setWeightOptions] = useState<string[]>([])
  const [nutritionalInfo, setNutritionalInfo] = useState<string[]>([])
  const [newType, setNewType] = useState("")
  const [newWeight, setNewWeight] = useState("")
  const [newNutritionalInfo, setNewNutritionalInfo] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isNewProduct = params.id === "new"

  // Fetch product data
  useEffect(() => {
    if (!isNewProduct) {
      fetchProduct()
    } else {
      setLoading(false)
    }
  }, [params.id, isNewProduct])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`)
      if (!response.ok) throw new Error("Failed to fetch product")

      const data = await response.json()
      setProduct(data)
      setImages(data.images || [])
      setTypes(data.types || [])
      setWeightOptions(data.weightOptions || [])
      setNutritionalInfo(data.nutritionalInfo || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setProduct((prev) => (prev ? { ...prev, [name]: value } : null))
  }

  const handleImageUpload = () => {
    setImages([...images, `/placeholder.svg?height=200&width=200&text=New+Image+${images.length + 1}`])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const addType = () => {
    if (newType.trim() !== "") {
      setTypes([...types, newType.trim()])
      setNewType("")
    }
  }

  const removeType = (index: number) => {
    const newTypes = [...types]
    newTypes.splice(index, 1)
    setTypes(newTypes)
  }

  const addWeight = () => {
    if (newWeight.trim() !== "") {
      setWeightOptions([...weightOptions, newWeight.trim()])
      setNewWeight("")
    }
  }

  const removeWeight = (index: number) => {
    const newWeightOptions = [...weightOptions]
    newWeightOptions.splice(index, 1)
    setWeightOptions(newWeightOptions)
  }

  const addNutritionalInfo = () => {
    if (newNutritionalInfo.trim() !== "") {
      setNutritionalInfo([...nutritionalInfo, newNutritionalInfo.trim()])
      setNewNutritionalInfo("")
    }
  }

  const removeNutritionalInfo = (index: number) => {
    const newNutritionalInfo = [...nutritionalInfo]
    newNutritionalInfo.splice(index, 1)
    setNutritionalInfo(newNutritionalInfo)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return

    try {
      const productData = {
        ...product,
        images,
        types,
        weightOptions,
        nutritionalInfo,
      }

      const url = isNewProduct ? "/api/products" : `/api/products/${params.id}`
      const method = isNewProduct ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      })

      if (!response.ok) {
        throw new Error("Failed to save product")
      }

      toast({
        title: "Success",
        description: `Product ${isNewProduct ? "created" : "updated"} successfully`,
      })

      router.push("/admin/products")
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save product",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00957a]"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/products" className="text-[#00957a] hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Products
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {isNewProduct ? "Add New Product" : `Edit Product: ${product?.name}`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <Input id="name" name="name" value={product?.name || ""} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={product?.category || ""}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00957a]"
                required
              >
                <option value="">Select Category</option>
                <option value="DRY FISH">DRY FISH</option>
                <option value="Fish Ambul Thiyal">Fish Ambul Thiyal</option>
                <option value="SRI LANKA SPICES">SRI LANKA SPICES</option>
                <option value="SRI LANKA SPICES">Maldives Fish</option>
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price (Rs.)
              </label>
              <Input
                id="price"
                name="price"
                type="number"
                value={product?.price || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (Rs.) - Optional
              </label>
              <Input
                id="originalPrice"
                name="originalPrice"
                type="number"
                value={product?.originalPrice || ""}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Product image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div
              className="border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center h-40 cursor-pointer hover:bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <span className="mt-2 block text-sm font-medium text-gray-700">Add Image</span>
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Upload high-quality images of your product. First image will be used as the main product image.
          </p>
        </div>

        {/* Product Description */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product Description</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={product?.description || ""}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>
            
          </div>
        </div>
    {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/products">
            <Button type="button" variant="outline" className="border-gray-300 text-gray-700">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-[#00957a] hover:bg-[#007a64]">
            {isNewProduct ? "Create Product" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
