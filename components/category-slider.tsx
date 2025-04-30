"use client"

import Link from "next/link"

const categories = [
  {
    id: "dry-fish",
    name: "DRY FISH",
    image: "/dryfish.jpg",
  },
  {
    id: "sour-fish-curry",
    name: "Fish Ambul hiyal",
    image: "/fishcurry.jpg",
  },
  {
    id: "sri-lanka-spices",
    name: "SRI LANKA SPICES",
    image: "/spices.jpg",
  }
]

export default function CategorySlider() {
  return (
    <div className="py-2 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-center gap-4 flex-wrap">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/category/${category.id}`}
              className="w-[120px] h-[160px] flex flex-col items-center justify-center border rounded-md overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image with small padding, increased size */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[80%] object-cover rounded-md p-0" // Removed padding around the image and made it cover the space
              />
              {/* Text below the image with a small gap */}
              <span className="text-xs font-medium text-center mt-2">{category.name}</span> {/* Added a small gap with mt-2 */}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
