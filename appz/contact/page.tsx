import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import WhatsAppButton from "@/components/whatsapp-button"
export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <WhatsAppButton />
      <h1 className="text-4xl font-bold text-[#3aaa9e] mb-8 text-center">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-[#3aaa9e]">Get In Touch</h2>
          <p className="text-gray-700 mb-8">
            Have questions about our products or services? We're here to help! Fill out the form and our team will get
            back to you as soon as possible.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#3aaa9e] mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Address</h3>
                <p className="text-gray-600">Devinuwara , Matara, Sri Lanka</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#3aaa9e] mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Phone</h3>
                <p className="text-gray-600">070 560 0784</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-[#3aaa9e] mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">dondralankafoods@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#3aaa9e] mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Business Hours</h3>
                <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 5:00 PM</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form className="space-y-6 bg-white p-8 rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" type="email" placeholder="john.doe@example.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <Input id="phone" placeholder="+94 XX XXX XXXX" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea id="message" placeholder="How can we help you?" rows={5} />
            </div>

            <Button type="submit" className="w-full bg-[#3aaa9e] hover:bg-[#2d8a80]">
              Send Message
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-[#c2f8e9] p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-[#3aaa9e] text-center">Our Location</h2>
        <div className="h-96 rounded-lg overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15873.877716305758!2d80.57960389462261!3d5.929834554870446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae139a8e9587403%3A0x4397ee593951bfbd!2sDondra!5e0!3m2!1sen!2slk!4v1745334058587!5m2!1sen!2slk"
    width="100%"
    height="100%"
  
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    className="w-full h-full border-0"
  ></iframe>
</div>

      </div>
    </main>
  )
}
