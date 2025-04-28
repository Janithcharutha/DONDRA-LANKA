export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="flex items-center mb-8">
        <div className="h-6 w-6 bg-gray-200 rounded-full mr-4" />
        <div className="h-8 w-48 bg-gray-200 rounded" />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg shadow-sm">
            <div className="h-48 bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="h-6 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="flex justify-between items-center pt-4">
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