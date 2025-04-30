import WhatsAppButton from "@/components/whatsapp-button"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <WhatsAppButton />
      <h1 className="text-4xl font-bold text-[#3aaa9e] mb-8 text-center">About DONDRA-LANKA</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#3aaa9e]">Our Story</h2>
          <p className="text-gray-700 mb-4">
            DONDRA LANKA was founded with a simple mission: to provide the freshest, highest-quality tuna to customers across
            Sri Lanka. What started as a small family business has grown into a trusted name in seafood delivery.
          </p>
          <p className="text-gray-700">
            Our commitment to sustainability, quality, and convenience has made us the preferred choice for seafood
            lovers who value freshness and responsible sourcing.
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
              We guarantee that all our seafood products are delivered at peak freshness, maintaining the highest
              quality from ocean to your table.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#3aaa9e]">Sustainability</h3>
            <p className="text-gray-700">
              We are committed to responsible fishing practices that protect marine ecosystems and ensure the long-term
              health of tuna populations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium mb-3 text-[#3aaa9e]">Convenience</h3>
            <p className="text-gray-700">
              Our delivery service is designed to make accessing premium seafood as easy as possible, with simple
              ordering and reliable delivery.
            </p>
          </div>
        </div>
      </div>
{/* 
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#3aaa9e] text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="w-32 h-32 bg-[#c2f8e9] rounded-full mx-auto mb-4 flex items-center justify-center">
                <img
                  src="/about.png" // Image path relative to the public directory
                  alt={`Team Member ${i}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-medium text-[#3aaa9e]">Team Member {i}</h3>
              <p className="text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </div> */}
    </main>
  )
}
