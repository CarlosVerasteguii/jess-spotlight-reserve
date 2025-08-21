import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Básico",
    price: "Consulta precio",
    features: [
      { text: "Slot de 18 minutos", included: true },
      { text: "Equipo Seller incluido", included: true },
      { text: "Transmisión en vivo", included: true },
      { text: "Análisis básico", included: true },
      { text: "Coach personalizado", included: false },
      { text: "Delivery premium", included: false },
      { text: "Soporte 24/7", included: false }
    ],
    cta: "Elegir Básico",
    popular: false
  },
  {
    name: "Deluxe", 
    price: "Consulta precio",
    features: [
      { text: "Slot de 18 minutos", included: true },
      { text: "Equipo Seller incluido", included: true },
      { text: "Transmisión en vivo", included: true },
      { text: "Análisis avanzado", included: true },
      { text: "Coach personalizado", included: true },
      { text: "Delivery estándar", included: true },
      { text: "Soporte prioritario", included: true }
    ],
    cta: "Elegir Deluxe",
    popular: true
  },
  {
    name: "Elite",
    price: "Consulta precio", 
    features: [
      { text: "Slot de 18 minutos", included: true },
      { text: "Todo equipo incluido", included: true },
      { text: "Transmisión premium", included: true },
      { text: "Análisis completo", included: true },
      { text: "Coach experto", included: true },
      { text: "Delivery premium", included: true },
      { text: "Soporte 24/7 dedicado", included: true }
    ],
    cta: "Elegir Elite", 
    popular: false
  }
];

export default function Planes() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="jess-section-padding" style={{ background: 'var(--black)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 
              className="jess-h1 font-bold mb-6"
              style={{ color: 'var(--white)' }}
            >
              Planes y Precios
            </h1>
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--white)', opacity: 0.8 }}
            >
              Elige el plan que mejor se adapte a las necesidades de tu negocio
            </p>
          </div>
        </section>

        {/* Plans Grid */}
        <section className="jess-section-padding" style={{ background: 'var(--white)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative step-card ${plan.popular ? 'ring-2 ring-brushed-gold' : ''}`}
                >
                  {plan.popular && (
                    <div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium"
                      style={{ 
                        background: 'var(--gold)',
                        color: 'var(--black)'
                      }}
                    >
                      Más popular
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 
                      className="jess-h3 font-bold mb-2"
                      style={{ color: 'var(--black)' }}
                    >
                      {plan.name}
                    </h3>
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: 'var(--gold)' }}
                    >
                      {plan.price}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        {feature.included ? (
                          <Check 
                            className="w-5 h-5 mr-3 flex-shrink-0" 
                            style={{ color: 'var(--ok)' }} 
                          />
                        ) : (
                          <X 
                            className="w-5 h-5 mr-3 flex-shrink-0" 
                            style={{ color: 'var(--full)' }} 
                          />
                        )}
                        <span 
                          className={`text-sm ${feature.included ? '' : 'opacity-60'}`}
                          style={{ color: 'var(--text)' }}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    variant={plan.popular ? "hero" : "outline"}
                    size="lg"
                    className={`w-full ${plan.popular ? 'btn-gold' : ''}`}
                    asChild
                  >
                    <Link to="/agenda">
                      {plan.cta}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}