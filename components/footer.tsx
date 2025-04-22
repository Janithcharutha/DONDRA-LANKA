import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#3aaa9e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white"
              >
                <path
                  d="M80 50C80 50 65 35 50 35C35 35 20 50 20 50C20 50 35 65 50 65C65 65 80 50 80 50Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 50H10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M90 40L80 50L90 60"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="45" cy="45" r="3" fill="currentColor" stroke="currentColor" strokeWidth="1" />
              </svg>
              <span className="font-bold text-xl">DONDRA-LANKA</span>
            </Link>
            <p className="text-sm text-white/80 mb-4">
              Providing the freshest tuna and seafood products across Sri Lanka. Convenient, fresh, and sustainable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-white/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-white/80">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-white hover:text-white/80">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-white hover:text-white/80">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/80 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/80 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/80 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-white/80 hover:text-white">
                SOUR FISH CURRY
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white">
                SRI LANKA SPICES
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-white/80 hover:text-white">
                DRY FISH
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-white/80">
              <p className="mb-2">Devinuwara </p>
              <p className="mb-2">Matara, Sri Lanka</p>
              <p className="mb-2">Phone: +94 77 432 1384</p>
              <p className="mb-4">Email: info@DONDRA-LANKA</p>
            </address>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80 text-sm">
          <p>&copy; {new Date().getFullYear()} DONDRA-LANKA. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
