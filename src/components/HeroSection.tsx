import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import { VideoModal } from "@/components/VideoModal";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="THE BOX CLUB Studio" 
          className="w-full h-full object-cover opacity-40"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.55) 100%)',
            backdropFilter: 'blur(1px)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="jess-hero-title text-porcelain-white mb-6">
            THE BOX CLUB
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-porcelain-white/90 font-light mb-4 tracking-wide">
            Tu momento para brillar
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-porcelain-white/80 mx-auto mb-12 leading-relaxed" style={{ maxWidth: '64ch', lineHeight: '1.6' }}>
            Reserva un turno de 15–20 min en nuestro livestream semanal. 
            Llega al local, presenta tu producto y conecta con más clientes en vivo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="xl" asChild>
              <Link to="/agenda#proximos">
                <Calendar className="w-5 h-5" />
                Reservar mi turno
              </Link>
            </Button>
            
            <VideoModal
              trigger={
                <Button variant="elegant" size="xl">
                  <Play className="w-5 h-5" />
                  Ver cómo funciona
                </Button>
              }
            />
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 pt-12 border-t border-porcelain-white/20">
            <p className="text-sm text-porcelain-white/60 uppercase tracking-widest mb-6">
              Únete a más de 100 emprendedores
            </p>
            <div className="flex justify-center items-center space-x-8 text-porcelain-white/40">
              <div className="text-center">
                <div className="text-2xl font-bold text-brushed-gold">15min</div>
                <div className="text-xs uppercase tracking-wide">Tu tiempo</div>
              </div>
              <div className="w-px h-12 bg-porcelain-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brushed-gold">En vivo</div>
                <div className="text-xs uppercase tracking-wide">Streaming</div>
              </div>
              <div className="w-px h-12 bg-porcelain-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brushed-gold">Semanal</div>
                <div className="text-xs uppercase tracking-wide">Frecuencia</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brushed-gold jess-glow-prominent"></div>
    </section>
  );
};