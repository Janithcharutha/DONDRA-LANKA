export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <h1 className="text-4xl font-bold text-[#3aaa9e] mb-8 text-center">About DONDRA-LANKA</h1>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-[#3aaa9e]">Our Story</h2>
          <p className="text-gray-700 mb-4">
            DONDRA-LANKA was founded with a simple mission: to provide the freshest, highest-quality tuna to customers across
            Sri Lanka. What started as a small family business has grown into a trusted name in seafood delivery.
          </p>
          <p className="text-gray-700">
            Our commitment to sustainability, quality, and convenience has made us the preferred choice for seafood
            lovers who value freshness and responsible sourcing.
          </p>
        </div>
        <div className="bg-[#c2f8e9] p-8 rounded-lg flex justify-center">
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

      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-[#3aaa9e] text-center">Our Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center">
              <div className="w-32 h-32 bg-[#c2f8e9] rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-[#3aaa9e]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#3aaa9e]">Team Member {i}</h3>
              <p className="text-gray-600">Position</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
