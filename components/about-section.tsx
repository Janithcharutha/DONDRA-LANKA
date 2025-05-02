import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-[#3aaa9e] mb-4">About DONDRA LANKA</h2>
            <p className="text-gray-700 mb-4">
            DONDRA LANKA was founded with a clear mission: to deliver the freshest, highest-quality dried fish, seafood, and hygienic food products across worldwide at an affordable price.. What began as a small family business has grown into a trusted name in premium dried fish delivery.
            </p>
            <p className="text-gray-700 mb-6">
            Our dedication to sustainability, hygiene, and quality combined with convenient worldwide delivery makes us the top choice for dried fish lovers who value freshness and responsible sourcing.
            </p>
            <Button asChild className="bg-[#3aaa9e] hover:bg-[#2d8a80]">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>

          <div className="order-1 md:order-2 bg-[#c2f8e9] p-8 rounded-lg flex justify-center">
            <div className="relative w-full max-w-xl">
              <Image
                src="/about.png"
                alt="About DONDRA-LANKA"
                width={800}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
