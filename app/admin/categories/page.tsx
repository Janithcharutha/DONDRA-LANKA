'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Upload, Pencil, X, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Category {
  _id: string
  name: string
  slug: string
  image: string
  isActive: boolean
}

export default function CategoriesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return

    setUploading(true)
    const file = e.target.files[0]

    try {
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

      const data = await response.json()
      setImageUrl(data.secure_url)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!imageUrl) {
      toast({
        title: "Error",
        description: "Please upload a category image",
        variant: "destructive",
      })
      return
    }

    setLoading(true) // Add loading state while submitting

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      const name = formData.get('name') as string

      // Validate name
      if (!name || name.trim() === '') {
        toast({
          title: "Error",
          description: "Category name is required",
          variant: "destructive",
        })
        return
      }

      const categoryData = {
        name: name.trim(),
        image: imageUrl
      }

      console.log('Submitting category data:', categoryData) // Debug log

      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to create category')
      }

      // Reset form and state
      form.reset()
      setImageUrl('')
      
      // Refresh categories list
      await fetchCategories()

      toast({
        title: "Success",
        description: "Category created successfully",
      })
    } catch (error) {
      console.error('Category creation error:', error) // Debug log
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : 'Failed to create category',
        variant: "destructive",
      })
    } finally {
      setLoading(false) // Reset loading state
    }
  }

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingCategory) return

    try {
      const formData = new FormData(e.currentTarget)
      const categoryData = {
        name: formData.get('name'),
        image: imageUrl || editingCategory.image,
        isActive: editingCategory.isActive
      }

      const response = await fetch(`/api/categories/${editingCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) throw new Error('Failed to update category')

      // Reset states and close dialog
      setEditingCategory(null) // This will close the dialog
      setImageUrl('') // Reset image URL
      
      // Refresh the categories list
      await fetchCategories()

      toast({
        title: "Success",
        description: "Category updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (categoryId: string) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete category')

      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
      
      fetchCategories()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>
      
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div>
          <label className="block mb-2">Category Name</label>
          <Input name="name" required />
        </div>

        <div>
          <label className="block mb-2">Category Image</label>
          <Input
            type="file"
            onChange={handleImageUpload}
            accept="image/*"
            required
          />
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="Preview" 
              className="mt-2 h-32 w-32 object-cover rounded-md"
            />
          )}
        </div>

        <Button 
  type="submit"
  disabled={uploading || loading} // Disable during both upload and form submission
  className="bg-[#00957a] hover:bg-[#007a64] text-white"
>
  {uploading ? 'Uploading...' : loading ? 'Creating...' : 'Create Category'}
</Button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div 
            key={category._id} 
            className="border rounded-md p-4"
          >
            <img 
              src={category.image} 
              alt={category.name}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{category.name}</h3>
              <div className="flex gap-2">
                <Dialog 
                  open={editingCategory?._id === category._id}
                  onOpenChange={(open) => {
                    if (!open) setEditingCategory(null);
                    else setEditingCategory(category);
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="bg-white border shadow-lg">
                    <DialogHeader>
                      <DialogTitle>Edit Category</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEdit} className="space-y-4">
                      <div>
                        <label className="block mb-2">Category Name</label>
                        <Input 
                          name="name"
                          defaultValue={category.name}
                          required 
                        />
                      </div>

                      <div>
                        <label className="block mb-2">Category Image</label>
                        <Input
                          type="file"
                          onChange={handleImageUpload}
                          accept="image/*"
                        />
                        <img 
                          src={imageUrl || category.image} 
                          alt={category.name}
                          className="mt-2 h-32 w-32 object-cover rounded-md"
                        />
                      </div>

                      <Button 
                        type="submit"
                        disabled={uploading}
                        className="bg-[#00957a] hover:bg-[#007a64]"
                      >
                        {uploading ? 'Uploading...' : 'Save Changes'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(category._id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}