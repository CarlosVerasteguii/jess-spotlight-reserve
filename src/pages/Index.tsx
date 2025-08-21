import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TeamSection } from "@/components/TeamSection";
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
        <TeamSection />
        <UpcomingShowsSection />
        <TestimonialsSection />
        {/* Quick Rules Section */}
        <section className="bg-ink-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-porcelain-white/80">
                <div className="text-sm">
                  <div className="text-brushed-gold mb-1">📍</div>
                  Llegar 10 min antes
                </div>
                <div className="text-sm">
                  <div className="text-brushed-gold mb-1">👤</div>
                  1 vendedor por slot
                </div>
                <div className="text-sm">
                  <div className="text-brushed-gold mb-1">⏰</div>
                  Cancelación hasta 12h
                </div>
                <div className="text-sm">
                  <div className="text-brushed-gold mb-1">❌</div>
                  No-show se marca ausente
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
