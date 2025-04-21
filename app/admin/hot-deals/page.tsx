"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, Plus, Edit, Trash2, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import type { HotDeal } from "@/types/hot-deal"

export default function HotDealsPage() {
  const [hotDeals, setHotDeals] = useState<HotDeal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const { toast } = useToast()

  // Filter statuses
  const statuses = ["All", "Active", "Scheduled", "Expired"]

  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await fetch('/api/hot-deals')
        if (!response.ok) throw new Error('Failed to fetch hot deals')
        const data = await response.json()
        setHotDeals(data)
      } catch (error) {
        console.error('Error:', error)
        toast({
          title: "Error",
          description: "Failed to load hot deals",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchHotDeals()
  }, [toast])

  const handleDelete = async (id: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/hot-deals/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete hot deal')
      }

      // Remove the deleted deal from state
      setHotDeals(prevDeals => prevDeals.filter(deal => deal._id !== id))

      toast({
        title: "Success",
        description: "Hot deal deleted successfully",
      })
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete hot deal",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const DeleteButton = ({ deal }: { deal: HotDeal }) => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-600 hover:text-red-900">
          <Trash2 className="h-4 w-4 inline mr-1" /> Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the hot deal "{deal.name}". 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(deal._id)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  // Filter hot deals based on search term and filters
  const filteredDeals = hotDeals.filter((deal) => {
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

      {loading ? (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-md"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
                  <tr key={deal._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={deal.product.images[0] || "/placeholder.svg"}
                            alt={deal.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{deal.name}</div>
                          <div className="text-sm text-gray-500">ID: {deal._id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{deal.product.name}</div>
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
                      <Link href={`/admin/hot-deals/${deal._id}`} className="text-[#00957a] hover:text-[#007a64] mr-4">
                        <Edit className="h-4 w-4 inline mr-1" /> Edit
                      </Link>
                      <DeleteButton deal={deal} />
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
              <span className="font-medium">{hotDeals.length}</span> hot deals
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
      )}
    </div>
  )
}
