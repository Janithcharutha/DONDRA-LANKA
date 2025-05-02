import WhatsAppButton from "@/components/whatsapp-button"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <WhatsAppButton />
      <h1 className="text-4xl font-bold text-[#3aaa9e] mb-8 text-center">About DONDRA LANKA</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#3aaa9e]">Our Story</h2>
          <p className="text-gray-700 mb-4">
  DONDRA LANKA was founded with a clear mission: to deliver the freshest, highest-quality dried fish, seafood, and hygienic food products across worldwide at an affordable price.. 
  What began as a small family business has grown into a trusted name in premium dried fish delivery.
</p>
<p className="text-gray-700">
  Our dedication to sustainability, hygiene, and quality combined with convenient worldwide delivery makes us the top choice for dried fish lovers who value freshness and responsible sourcing.
</p>

        </div>
        <div className="bg-[#c2f8e9] p-8 rounded-lg flex justify-center">
          <div className="w-64 h-64 relative">
            <img
              src="/about.png" // Image path relative to the public directory
              alt="About Dondra-Lanka"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#3aaa9e] text-center">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#3aaa9e]">Freshness</h3>
            <p className="text-gray-700">
            We guarantee that all our dried fish and seafood products are delivered at peak freshness, maintaining top quality from source to your table.
            </p>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#3aaa9e]">Sustainability</h3>
            <p className="text-gray-700">
            Our products are sustainably sourced through responsible practices that protect marine ecosystems and support long-term environmental balance.
            </p>
          </div> */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#3aaa9e]">Hygiene</h3>
            <p className="text-gray-700">
            Every product is handled with the utmost care to ensure strict hygienic standards, giving you safe, clean, and high-quality food. </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#3aaa9e]">Worldwide Delivery</h3>
            <p className="text-gray-700">
            Enjoy premium Sri Lankan dry fish and seafood products—carefully packed and reliably delivered worldwide to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
