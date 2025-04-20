"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Mock hot deal data for editing
const mockHotDeal = {
  id: 1,
  name: "Fresh Yellowfin Tuna - Special Offer",
  description: "Premium quality yellowfin tuna at a special discount price. Limited time offer!",
  productId: 1,
  originalPrice: 2200,
  discountedPrice: 1800,
  discount: 18,
  startDate: "2023-04-10",
  endDate: "2023-04-20",
  status: "Active",
}

// Mock products for selection
const mockProducts = [
  { id: 1, name: "Fresh Yellowfin Tuna", price: 2200 },
  { id: 2, name: "Tuna Steaks", price: 2200 },
  { id: 3, name: "Tuna Fillets", price: 2000 },
  { id: 4, name: "Smoked Tuna", price: 2500 },
  { id: 5, name: "Seer Fish / Thora", price: 2590 },
]

export default function EditHotDealPage({ params }: { params: { id: string } }) {
  const [hotDeal, setHotDeal] = useState(mockHotDeal)
  const [selectedProduct, setSelectedProduct] = useState<number>(mockHotDeal.productId)
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage")
  const [discountValue, setDiscountValue] = useState<number>(mockHotDeal.discount)
  const [calculatedPrice, setCalculatedPrice] = useState<number>(mockHotDeal.discountedPrice)

  const isNewDeal = params.id === "new"

  // Update calculated price when product, discount type, or discount value changes
  useEffect(() => {
    const product = mockProducts.find((p) => p.id === selectedProduct)
    if (product) {
      let newPrice = product.price
      if (discountType === "percentage") {
        newPrice = product.price - (product.price * discountValue) / 100
      } else {
        newPrice = product.price - discountValue
      }
      setCalculatedPrice(Math.max(0, newPrice))
      setHotDeal({
        ...hotDeal,
        originalPrice: product.price,
        discountedPrice: Math.max(0, newPrice),
        discount: discountValue,
      })
    }
  }, [selectedProduct, discountType, discountValue])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setHotDeal({ ...hotDeal, [name]: value })
  }

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(Number(e.target.value))
  }

  const handleDiscountTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDiscountType(e.target.value as "percentage" | "fixed")
  }

  const handleDiscountValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountValue(Number(e.target.value))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the hot deal data
    alert(`Hot deal ${isNewDeal ? "created" : "updated"} successfully!`)
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/hot-deals" className="text-[#00957a] hover:underline flex items-center">
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Hot Deals
        </Link>
        <h1 className="text-2xl font-bold text-gray-800 mt-2">
          {isNewDeal ? "Create Hot Deal" : `Edit Hot Deal: ${hotDeal.name}`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Deal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Deal Name
              </label>
              <Input id="name" name="name" value={hotDeal.name} onChange={handleInputChange} required />
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={hotDeal.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00957a]"
                required
              >
                <option value="Active">Active</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={hotDeal.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>
          </div>
        </div>

        {/* Product and Pricing */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Product and Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Product
              </label>
              <select
                id="productId"
                value={selectedProduct}
                onChange={handleProductChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00957a]"
                required
              >
                <option value="">Select a product</option>
                {mockProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - Rs. {product.price}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-1">
                Discount Type
              </label>
              <select
                id="discountType"
                value={discountType}
                onChange={handleDiscountTypeChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00957a]"
                required
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (Rs.)</option>
              </select>
            </div>
            <div>
              <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                {discountType === "percentage" ? "Discount Percentage" : "Discount Amount (Rs.)"}
              </label>
              <Input
                id="discountValue"
                type="number"
                min="0"
                max={discountType === "percentage" ? "100" : undefined}
                value={discountValue}
                onChange={handleDiscountValueChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price After Discount</label>
              <div className="flex items-center space-x-2">
                <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 w-full">
                  <span className="text-gray-500 line-through mr-2">Rs. {hotDeal.originalPrice?.toLocaleString()}</span>
                  <span className="text-[#00957a] font-medium">Rs. {calculatedPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deal Duration */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Deal Duration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={hotDeal.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={hotDeal.endDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/hot-deals">
            <Button type="button" variant="outline" className="border-gray-300 text-gray-700">
              Cancel
            </Button>
          </Link>
          <Button type="submit" className="bg-[#00957a] hover:bg-[#007a64]">
            {isNewDeal ? "Create Hot Deal" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}
