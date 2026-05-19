import HeroSlider from "@/components/home/HeroSlider";
import StatsSection from "@/components/home/StatsSection";
import FeaturedCelebrities from "@/components/home/FeaturedCelebrities";
import CategoriesSection from "@/components/home/CategoriesSection";
import HowItWorks from "@/components/home/HowItWorks";
import ReviewsSection from "@/components/home/ReviewsSection";
import FooterCTA from "@/components/home/FooterCTA";
import Footer from "@/components/home/Footer";

export default function HomePage() {
  return (
    <main style={{ background: "#000", overflowX: "hidden" }}>
      <HeroSlider />
      <StatsSection />
      <FeaturedCelebrities />
      <CategoriesSection />
      <HowItWorks />
      <ReviewsSection />
      <FooterCTA />
      <Footer />
    </main>
  );
}