import Link from "next/link"
import { Package, Tags, TrendingUp, Users } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Products",
      value: "124",
      change: "+12%",
      trend: "up",
      icon: <Package className="h-8 w-8 text-[#00957a]" />,
      link: "/admin/products",
    },
    {
      title: "Active Hot Deals",
      value: "8",
      change: "+3",
      trend: "up",
      icon: <Tags className="h-8 w-8 text-[#00957a]" />,
      link: "/admin/hot-deals",
    },
    {
      title: "Total Customers",
      value: "1,254",
      change: "+18%",
      trend: "up",
      icon: <Users className="h-8 w-8 text-[#00957a]" />,
      link: "/admin/customers",
    },
    {
      title: "Monthly Sales",
      value: "Rs. 458,200",
      change: "+24%",
      trend: "up",
      icon: <TrendingUp className="h-8 w-8 text-[#00957a]" />,
      link: "#",
    },
  ]

  // Mock data for recent products
  const recentProducts = [
    {
      id: 1,
      name: "Fresh Yellowfin Tuna",
      category: "Tuna",
      price: "Rs. 1,800",
      status: "In Stock",
    },
    {
      id: 2,
      name: "Tuna Steaks",
      category: "Tuna",
      price: "Rs. 2,200",
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Seer Fish / Thora",
      category: "Fish",
      price: "Rs. 2,590",
      status: "In Stock",
    },
    {
      id: 4,
      name: "Prawns - Large",
      category: "Shellfish",
      price: "Rs. 3,200",
      status: "In Stock",
    },
    {
      id: 5,
      name: "Crab - Mud Crab",
      category: "Shellfish",
      price: "Rs. 2,800",
      status: "Out of Stock",
    },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Link
            href={stat.link}
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</h3>
                <p className={`text-sm mt-2 ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="bg-[#e0fbf4] p-3 rounded-full">{stat.icon}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-[#00957a] text-white rounded-md hover:bg-[#007a64] transition-colors"
          >
            Add New Product
          </Link>
          <Link
            href="/admin/hot-deals/new"
            className="px-4 py-2 bg-[#00957a] text-white rounded-md hover:bg-[#007a64] transition-colors"
          >
            Create Hot Deal
          </Link>
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-[#00957a] text-[#00957a] rounded-md hover:bg-[#e0fbf4] transition-colors"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/hot-deals"
            className="px-4 py-2 border border-[#00957a] text-[#00957a] rounded-md hover:bg-[#e0fbf4] transition-colors"
          >
            Manage Hot Deals
          </Link>
        </div>
      </div>

      {/* Recent Products */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
          <Link href="/admin/products" className="text-[#00957a] hover:underline text-sm font-medium">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
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
                  Category
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
              {recentProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : product.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/products/${product.id}`} className="text-[#00957a] hover:text-[#007a64] mr-4">
                      Edit
                    </Link>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
