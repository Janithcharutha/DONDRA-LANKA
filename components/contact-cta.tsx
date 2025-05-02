import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ContactCta() {
  return (
    <section className="py-16 bg-[#CAF0F8]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#023E8A] mb-4">Ready to experience premium-quality dried fish delivered to your door?</h2>
        <p className="text-[#0077B6] max-w-2xl mx-auto mb-8">
        Discover premium-quality dried fish, seafood, and hygienic food products sustainably sourced, carefully prepared, and delivered worldwide. Experience the convenience of doorstep delivery and taste the difference today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-white text-[#3aaa9e] hover:bg-gray-100">
            <Link href="/products">Browse Products</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
