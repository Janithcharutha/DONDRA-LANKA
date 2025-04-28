"use client"

import Link from "next/link"

const categories = [
  {
    id: "sour-fish-curry",
    name: "SOUR FISH CURRY",
    icon: (
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <circle cx="50" cy="25" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M40 30C45 20 55 20 60 30" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    id: "sri-lanka-spices",
    name: "SRI LANKA SPICES",
    icon: (
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path d="M20 40C25 25 75 25 80 40" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="30" cy="20" r="2" fill="currentColor" />
        <circle cx="50" cy="20" r="2" fill="currentColor" />
        <circle cx="70" cy="20" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "dry-fish",
    name: "DRY FISH",
    icon: (
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <rect x="35" y="15" width="30" height="20" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M50 15V35" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
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
              className="w-[100px] h-[120px] flex flex-col items-center justify-center border rounded-md p-2 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 text-[#00957a]">{category.icon}</div>
              <span className="text-xs font-medium text-center mt-2">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
