"use client"

import { use } from 'react'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { HotDeal } from "@/types/hot-deal"
import type { Product } from "@/types/product"

export default function EditHotDealPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { toast } = useToast()
  const [hotDeal, setHotDeal] = useState<HotDeal | null>(null)
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [discountPercent, setDiscountPercent] = useState<number>(10)

  useEffect(() => {
    // Only fetch if we're editing an existing hot deal
    if (id !== 'new') {
      const fetchHotDeal = async () => {
        try {
          setLoading(true)
          const response = await fetch(`/api/hot-deals/${id}`)
          
          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error || 'Failed to fetch hot deal')
          }
          
          const data = await response.json()
          setHotDeal(data)
        } catch (error) {
          console.error('Error:', error)
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to load hot deal",
            variant: "destructive",
          })
          router.push('/admin/hot-deals')
        } finally {
          setLoading(false)
        }
      }

      fetchHotDeal()
    }
  }, [id, toast, router])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error('Failed to fetch products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        })
      }
    }

    fetchProducts()
  }, [toast])

  const handleProductChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const productId = event.target.value
    const product = products.find(p => p._id === productId)
    if (product) {
      setSelectedProduct(product)
      // Auto-fill the original price
      const form = event.target.form
      if (form) {
        const originalPriceInput = form.elements.namedItem('originalPrice') as HTMLInputElement
        const discountedPriceInput = form.elements.namedItem('discountedPrice') as HTMLInputElement
        const discountInput = form.elements.namedItem('discount') as HTMLInputElement
        
        originalPriceInput.value = product.price.toString()
        // Calculate initial discounted price (10% discount)
        const discounted = product.price * (1 - 10/100)
        discountedPriceInput.value = discounted.toFixed(2)
        discountInput.value = '10% OFF'
      }
    }
  }

  const handleDiscountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const percent = parseInt(event.target.value)
    setDiscountPercent(percent)
    
    if (selectedProduct) {
      const form = event.target.form
      if (form) {
        const discountedPriceInput = form.elements.namedItem('discountedPrice') as HTMLInputElement
        const discountInput = form.elements.namedItem('discount') as HTMLInputElement
        
        const discounted = selectedProduct.price * (1 - percent/100)
        discountedPriceInput.value = discounted.toFixed(2)
        discountInput.value = `${percent}% OFF`
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData(event.currentTarget)
      
      // Format dates to ISO string
      const startDate = new Date(formData.get('startDate') as string).toISOString()
      const endDate = new Date(formData.get('endDate') as string).toISOString()
      
      const response = await fetch('/api/hot-deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          description: formData.get('description'),
          product: formData.get('product'),
          originalPrice: Number(formData.get('originalPrice')),
          discountedPrice: Number(formData.get('discountedPrice')),
          discount: formData.get('discount'),
          startDate,
          endDate,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create hot deal')
      }

      toast({
        title: "Success",
        description: "Hot deal created successfully",
      })
      router.push('/admin/hot-deals')
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create hot deal",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id === 'new' ? 'Create New Hot Deal' : 'Edit Hot Deal'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
          <Label htmlFor="product">Select Product</Label>
          <select
            id="product"
            name="product"
            defaultValue={hotDeal?.product._id}
            onChange={handleProductChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3aaa9e]"
            required
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - Rs. {product.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="name">Deal Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={hotDeal?.name}
            placeholder="Summer Special Offer"
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={hotDeal?.description}
            placeholder="Describe the deal..."
            required
          />
        </div>



        {selectedProduct && (
          <div>
            <Label htmlFor="discountPercent">Select Discount Percentage</Label>
            <select
              id="discountPercent"
              name="discountPercent"
              value={discountPercent}
              onChange={handleDiscountChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#3aaa9e]"
              required
            >
              {Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map((percent) => (
                <option key={percent} value={percent}>
                  {percent}% Discount
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="originalPrice">Original Price</Label>
            <Input
              id="originalPrice"
              name="originalPrice"
              type="number"
              defaultValue={hotDeal?.originalPrice}
              placeholder="1000"
              required
              readOnly
              className="bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="discountedPrice">Discounted Price</Label>
            <Input
              id="discountedPrice"
              name="discountedPrice"
              type="number"
              defaultValue={hotDeal?.discountedPrice}
              placeholder="800"
              required
              readOnly
              className="bg-gray-50"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="discount">Discount</Label>
          <Input
            id="discount"
            name="discount"
            defaultValue={hotDeal?.discount}
            placeholder="20% OFF"
            required
            readOnly
            className="bg-gray-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="datetime-local"
              defaultValue={hotDeal?.startDate?.split('.')[0]}
              required
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="datetime-local"
              defaultValue={hotDeal?.endDate?.split('.')[0]}
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.push('/admin/hot-deals')}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#3aaa9e] text-white rounded hover:bg-[#2d8a80] disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Hot Deal'}
          </button>
        </div>
      </form>
    </div>
  )
}
