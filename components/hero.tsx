import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-[#CAF0F8] py-20">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3aaa9e] mb-6">
            Authentic Sri Lankan Flavors at Your Doorstep
          </h1>
          <p className="text-lg text-[#023E8A] mb-8 max-w-lg mx-auto md:mx-0">
          Discover premium-quality dried fish, seafood, and hygienic food products — all sustainably sourced, carefully prepared, and delivered worldwide at affordable prices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button
              asChild
              size="lg"
              className="bg-[#3aaa9e] hover:bg-[#2d8a80] text-white transition-colors duration-300"
            >
              <Link href="/products">Explore Products</Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#3aaa9e] text-[#3aaa9e] hover:bg-[#d8f6f2] transition-colors duration-300"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] max-w-[700px]">
            <Image
              src="/hero.jpeg"
              alt="Sri Lankan food"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
