import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Samantha P.",
    location: "Matara",
    rating: 5,
    text: "The quality of tuna from DONDRA LANKA is exceptional. It's always fresh, and the delivery is prompt. I've been a regular customer for over a year now.",
  },
  {
    id: 2,
    name: "Rajiv M.",
    location: "Kandy",
    rating: 5,
    text: "I was skeptical about ordering fish online, but DONDRA LANKA exceeded my expectations. The tuna steaks were perfect for my dinner party!",
  },
  {
    id: 3,
    name: "Priya D.",
    location: "Galle",
    rating: 4,
    text: "Great service and product quality. The only reason I'm giving 4 stars is because I wish they had more variety, but what they do offer is excellent.",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#3aaa9e] mb-4">What Our Customers Say</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about our products and
            service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-[#c2f8e9] rounded-full flex items-center justify-center mr-4">
                  <span className="text-[#3aaa9e] font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.location}</p>
                </div>
              </div>

              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <p className="text-gray-700">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
