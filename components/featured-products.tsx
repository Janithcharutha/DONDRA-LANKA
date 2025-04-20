import Link from "next/link"
import { Button } from "@/components/ui/button"

const featuredProducts = [
  {
    id: 1,
    name: "Fresh Yellowfin Tuna",
    description: "Premium quality yellowfin tuna, perfect for sashimi and sushi.",
    price: "Rs. 1,800 / kg",
  },
  {
    id: 2,
    name: "Tuna Steaks",
    description: "Perfectly cut tuna steaks, ready for grilling or pan-searing.",
    price: "Rs. 2,200 / kg",
  },
  {
    id: 3,
    name: "Tuna Fillets",
    description: "Boneless tuna fillets, ideal for various cooking methods.",
    price: "Rs. 2,000 / kg",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#3aaa9e] mb-4">Featured Products</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Discover our selection of premium tuna products, sustainably sourced and delivered fresh to your doorstep.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-[#c2f8e9] flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-24 h-24 text-[#3aaa9e]"
                >
                  <path
                    d="M80 50C80 50 65 35 50 35C35 35 20 50 20 50C20 50 35 65 50 65C65 65 80 50 80 50Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 50H10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M90 40L80 50L90 60"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="45" cy="45" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#3aaa9e]">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{product.price}</span>
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 bg-[#3aaa9e] text-white rounded hover:bg-[#2d8a80] transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-[#3aaa9e] hover:bg-[#2d8a80]">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
