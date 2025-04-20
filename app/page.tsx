import Hero from "@/components/hero"
import CategorySlider from "@/components/category-slider"
import ProductCategoryTabs from "@/components/product-category-tabs"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactCta from "@/components/contact-cta"
import HotDeals from "@/components/hot-deals"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <CategorySlider />
      {/* <ProductCategoryTabs /> */}
      <HotDeals />
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <ContactCta />
    </main>
  )
}
