"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function NewPriceListPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      })
      return
    }

    try {
      setUploading(true)
      
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'tunastore_preset')

      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dr5ts47zf/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json()
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary')
      }

      const uploadData = await uploadResponse.json()
      console.log('Cloudinary response:', uploadData) // Debug log

      if (!uploadData.secure_url) {
        throw new Error('No secure URL received from Cloudinary')
      }

      // Save to database
      const saveResponse = await fetch('/api/price-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl: uploadData.secure_url,
          status: 'Active'
        })
      })

      if (!saveResponse.ok) {
        throw new Error('Failed to save price list')
      }

      setImagePreview(uploadData.secure_url)
      
      toast({
        title: "Success",
        description: "Price list uploaded successfully",
      })

      router.push('/admin/price-list')
      router.refresh()

    } catch (error) {
      console.error('Upload error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
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

      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Price List</h1>

        <div
          onClick={() => fileInputRef.current?.click()}
          className={`
            w-full h-96 border-2 border-dashed rounded-lg
            flex items-center justify-center cursor-pointer
            hover:border-[#00957a] transition-colors
            ${uploading ? 'opacity-50' : ''}
            ${imagePreview ? 'border-[#00957a]' : 'border-gray-300'}
          `}
        >
          {uploading ? (
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
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Click to upload price list image</p>
              <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}