import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-12" />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images skeleton */}
          <div>
            <Skeleton className="w-full aspect-square mb-4 rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Details skeleton */}
          <div>
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-9 w-3/4 mb-4" />
            <Skeleton className="h-5 w-40 mb-6" />

            <Skeleton className="h-7 w-24 mb-2" />
            <div className="flex gap-2 mb-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-md" />
              ))}
            </div>

            <Skeleton className="h-7 w-40 mb-2" />
            <div className="flex items-center gap-4 mb-8">
              <Skeleton className="h-10 w-1/3 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>

            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Description skeleton */}
      <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
        <Skeleton className="h-8 w-48 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />

        <Skeleton className="h-6 w-40 mt-4 mb-2" />
        <div className="pl-5 space-y-1 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-4 w-2/3" />
          ))}
        </div>

        <Skeleton className="h-6 w-40 mt-4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
      </div>

      {/* Related Products skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
