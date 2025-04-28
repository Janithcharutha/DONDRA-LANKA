
import { SiWhatsapp } from "react-icons/si"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94782672914?text=Hello%2C%20I%20have%20a%20question%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
    >
      <SiWhatsapp className="w-10 h-10" />
    </a>
  )
}
