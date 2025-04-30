"use client"

import { use, useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Image as ImageIcon, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface PriceList {
  _id: string
  imageUrl: string
  status: 'Active' | 'Inactive'
  createdAt: string
  updatedAt: string
}

export default function EditPriceListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [priceList, setPriceList] = useState<PriceList | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const fetchPriceList = async () => {
      if (id === 'new') return

      try {
        setLoading(true)
        const response = await fetch(`/api/price-list/${id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch price list')
        }

        const data = await response.json()
        setPriceList(data)
        setImagePreview(data.imageUrl || '')
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Failed to load price list",
          variant: "destructive",
        })
        router.push('/admin/price-list')
      } finally {
        setLoading(false)
      }
    }

    fetchPriceList()
  }, [id, toast, router])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    try {
      setUploadingImage(true)
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'tunastore_preset')

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dr5ts47zf/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to upload image')
      }

      const data = await response.json()
      
      if (!data.secure_url) {
        throw new Error('No URL received from Cloudinary')
      }

      setImagePreview(data.secure_url)
      
      // Update the hidden input value
      const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement
      if (imageUrlInput) {
        imageUrlInput.value = data.secure_url
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        imageUrl: formData.get('imageUrl'),
        status: formData.get('status') || 'Active'
      }

      const response = await fetch(
        id === 'new' ? '/api/price-list' : `/api/price-list/${id}`,
        {
          method: id === 'new' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }
      )

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to save price list')
      }

      toast({
        title: "Success",
        description: `Price list ${id === 'new' ? 'created' : 'updated'} successfully`,
      })

      router.push('/admin/price-list')
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save price list",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link
          href="/admin/price-list"
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Price Lists
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {id === 'new' ? 'Add Price List' : 'Edit Price List'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <Label htmlFor="image">Price List Image</Label>
          <div className="mt-1">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`
                w-full h-96 border-2 border-dashed rounded-lg
                flex items-center justify-center cursor-pointer
                hover:border-[#00957a] transition-colors
                ${uploadingImage ? 'opacity-50' : ''}
                ${imagePreview ? 'border-[#00957a]' : 'border-gray-300'}
              `}
            >
              {uploadingImage ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 text-[#00957a] animate-spin mb-2" />
                  <p className="text-sm text-gray-500">Uploading...</p>
                </div>
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Click to upload price list image</p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            type="hidden"
            id="imageUrl"
            name="imageUrl"
            value={imagePreview || priceList?.imageUrl || ''}
          />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={priceList?.status || 'Active'}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3aaa9e]"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="px-4 py-2 bg-[#00957a] text-white rounded-md hover:bg-[#007a64] transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Price List'}
          </button>
        </div>
      </form>
    </div>
  )
}