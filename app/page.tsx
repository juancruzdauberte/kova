import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import ProcessSection from "@/components/process-section";
import AboutSection from "@/components/about-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import SmoothScroller from "@/components/animations/SmoothScroller";
import Navbar from "@/components/navbar";
import FAQSection from "@/components/faq-section";

export default function HomePage() {
  return (
    <SmoothScroller>
      <Navbar />
      <main className="relative overflow-hidden bg-background">
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </SmoothScroller>
  );
}
