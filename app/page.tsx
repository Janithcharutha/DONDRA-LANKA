import Hero from "@/components/hero"
import CategorySlider from "@/components/category-slider"
import ProductCategoryTabs from "@/components/product-category-tabs"
import FeaturedProducts from "@/components/featured-products"
import AboutSection from "@/components/about-section"
import TestimonialsSection from "@/components/testimonials-section"
import ContactCta from "@/components/contact-cta"
import NewsBanners from "@/components/news-banners"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <CategorySlider />
      {/* <ProductCategoryTabs /> */}
      <NewsBanners />
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <TestimonialsSection />
      <ContactCta />
    </main>
  )
}
