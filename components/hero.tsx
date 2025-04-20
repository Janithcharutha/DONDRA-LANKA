import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-[#c2f8e9] py-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3aaa9e] mb-6">
            Fresh Tuna Delivered To Your Doorstep
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
            Experience the finest quality tuna, sustainably sourced and conveniently delivered fresh to your home across
            Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button asChild size="lg" className="bg-[#3aaa9e] hover:bg-[#2d8a80] text-white">
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-[#3aaa9e] text-[#3aaa9e]">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
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
              <path d="M20 50H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
    </section>
  )
}
