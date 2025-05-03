"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

interface Category {
  _id: string
  name: string
  slug: string
  image: string
}

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories')
        const data = await response.json()
        setCategories(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        })
      }
    }

    fetchCategories()
  }, [toast])

  return (
    <div className="py-2 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/products/category/${category.slug}`}
              className="w-[120px] h-[160px] flex flex-col items-center justify-center border rounded-md overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[80%] object-cover rounded-md p-0"
              />
              <span className="text-xs font-medium text-center mt-2">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
