import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { SiWhatsapp } from "react-icons/si"
export default function Footer() {
  return (
    <footer className="bg-[#023E8A] text-white">
      <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
            <img
  src="/logo.png"
  alt="Dondra Lanka Logo"
  className="w-10 h-10 object-contain"
/>

              <span className="font-bold text-xl">DONDRA LANKA</span>
            </Link>
            <p className="text-sm text-white/80 mb-4">
              Providing the freshest tuna and seafood products across Sri Lanka. Convenient, fresh, and sustainable.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/dondralanka" className="text-white hover:text-white/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
  href="https://wa.me/94782672914?text=Hello%2C%20I%20have%20a%20question%20about%20your%20products."
  target="_blank"
  rel="noopener noreferrer"
  className="text-white hover:text-white/80"
>
  <SiWhatsapp className="h-5 w-5" />
  <span className="sr-only">WhatsApp</span>
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
                Fish Ambul Thiyal
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
  <h3 className="font-semibold text-lg mb-4">Accepted Payment Methods</h3>
  <img
    src="/payment.png"
    alt="Accepted payment methods"
    className="mb-2 w-full max-w-xs"
  />
  <p className="text-sm text-white/80">
    We ensure secure online payments through trusted gateways. All transactions are encrypted,
    ensuring your payment details are safe and secure.
  </p>
</div>


          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <address className="not-italic text-white/80">
              <p className="mb-2">Devinuwara </p>
              <p className="mb-2">Matara, Sri Lanka</p>
              <div className="mb-4 space-y-2">
  <p>
    <span className="text-white">Phone: </span>
    <a href="tel:+94705600784" className="text-white hover:underline">
    +94 78 267 2914
    </a>
    
  </p>
  <p>
    <a href="tel:+94782672914" className="text-white hover:underline">
    +94 70 560 0784
    </a>
  </p>

</div>



              <p className="mb-4">Email: dondralankafoods@gmail.com</p>
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
