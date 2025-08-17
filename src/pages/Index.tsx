import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { UpcomingShowsSection } from "@/components/UpcomingShowsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <UpcomingShowsSection />
        <TestimonialsSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
