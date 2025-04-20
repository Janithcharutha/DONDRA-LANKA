export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-8" />
      <div className="h-4 w-96 bg-gray-200 rounded mx-auto mb-12" />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-2" />
              <div className="h-4 bg-gray-200 rounded mb-4" />
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-8 w-24 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}