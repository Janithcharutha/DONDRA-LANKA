import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-[#3aaa9e] mb-4">About DONDRA-LANKA</h2>
            <p className="text-gray-700 mb-4">
              DONDRA-LANKA was founded with a simple mission: to provide the freshest, highest-quality tuna to customers
              across Sri Lanka. What started as a small family business has grown into a trusted name in seafood
              delivery.
            </p>
            <p className="text-gray-700 mb-6">
              Our commitment to sustainability, quality, and convenience has made us the preferred choice for seafood
              lovers who value freshness and responsible sourcing.
            </p>
            <Button asChild className="bg-[#3aaa9e] hover:bg-[#2d8a80]">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          <div className="order-1 md:order-2 bg-[#c2f8e9] p-8 rounded-lg flex justify-center">
            <div className="w-64 h-64 relative">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#3aaa9e]"
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
          </div>
        </div>
      </div>
    </section>
  )
}
