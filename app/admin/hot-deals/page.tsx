"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Plus, Edit, Trash2, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Mock hot deals data
const mockHotDeals = [
  {
    id: 1,
    name: "Fresh Yellowfin Tuna - Special Offer",
    product: "Fresh Yellowfin Tuna",
    originalPrice: 2200,
    discountedPrice: 1800,
    discount: "18%",
    timeLeft: "2 days",
    startDate: "2023-04-10",
    endDate: "2023-04-20",
    status: "Active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Tuna Steak Bundle",
    product: "Tuna Steaks",
    originalPrice: 6600,
    discountedPrice: 4950,
    discount: "25%",
    timeLeft: "3 days",
    startDate: "2023-04-08",
    endDate: "2023-04-21",
    status: "Active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "Seafood Mix Pack",
    product: "Mixed Seafood",
    originalPrice: 5500,
    discountedPrice: 4400,
    discount: "20%",
    timeLeft: "1 day",
    startDate: "2023-04-12",
    endDate: "2023-04-19",
    status: "Active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Premium Sashimi Grade Tuna",
    product: "Tuna Sashimi",
    originalPrice: 3200,
    discountedPrice: 2560,
    discount: "20%",
    timeLeft: "4 days",
    startDate: "2023-04-09",
    endDate: "2023-04-22",
    status: "Active",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "Crab Festival Special",
    product: "Mud Crab",
    originalPrice: 2800,
    discountedPrice: 2240,
    discount: "20%",
    timeLeft: "Expired",
    startDate: "2023-03-25",
    endDate: "2023-04-05",
    status: "Expired",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Family Seafood Pack",
    product: "Mixed Seafood",
    originalPrice: 7500,
    discountedPrice: 6000,
    discount: "20%",
    timeLeft: "Scheduled",
    startDate: "2023-04-25",
    endDate: "2023-05-10",
    status: "Scheduled",
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function HotDealsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")

  // Filter statuses
  const statuses = ["All", "Active", "Scheduled", "Expired"]

  // Filter hot deals based on search term and filters
  const filteredDeals = mockHotDeals.filter((deal) => {
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All" || deal.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hot Deals</h1>
          <p className="text-gray-600">Manage special offers and discounts</p>
        </div>
        <Link href="/admin/hot-deals/new">
          <Button className="bg-[#00957a] hover:bg-[#007a64]">
            <Plus className="h-4 w-4 mr-2" /> Create Hot Deal
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search hot deals..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#00957a]"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Button variant="outline" className="w-full border-gray-300 text-gray-700">
              <Filter className="h-4 w-4 mr-2" /> More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Hot Deals Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Deal
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Discount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Duration
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDeals.map((deal) => (
                <tr key={deal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                        <div className="text-sm text-gray-500">ID: {deal.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{deal.product}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className="text-gray-500 line-through">Rs. {deal.originalPrice.toLocaleString()}</span>
                      <br />
                      <span className="text-gray-900 font-medium">Rs. {deal.discountedPrice.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-green-600">{deal.discount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {deal.startDate} to {deal.endDate}
                    </div>
                    <div className="flex items-center text-sm text-orange-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {deal.timeLeft}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        deal.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : deal.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {deal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/hot-deals/${deal.id}`} className="text-[#00957a] hover:text-[#007a64] mr-4">
                      <Edit className="h-4 w-4 inline mr-1" /> Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="h-4 w-4 inline mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDeals.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No hot deals found matching your filters.</p>
          </div>
        )}
        <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">{filteredDeals.length}</span> of{" "}
            <span className="font-medium">{mockHotDeals.length}</span> hot deals
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-gray-300 text-gray-700">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
