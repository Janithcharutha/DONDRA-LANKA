'use client'

import { Suspense } from 'react'
import { useParams } from 'next/navigation'
import { ErrorBoundary } from '@/components/error-boundary'
import ProductDetail from './product-detail'

export default function ProductPage() {
  const params = useParams()

  return (
    <ErrorBoundary>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductDetail id={params.id as string} />
      </Suspense>
    </ErrorBoundary>
  )
}

function ProductSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl animate-pulse">
      <div className="h-4 w-64 bg-gray-200 rounded mb-6" />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="h-96 bg-gray-200 rounded-lg mb-4" />
            <div className="grid grid-cols-4 gap-2">
              {[1,2,3,4].map((i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg" />
              ))}
            </div>
          </div>
          <div>
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />
            <div className="h-24 bg-gray-200 rounded mb-6" />
            <div className="h-8 w-1/4 bg-gray-200 rounded mb-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
