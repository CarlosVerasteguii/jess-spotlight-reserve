import { Button } from "@/components/ui/button";
import { Users, UserCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const teams = [
  {
    icon: Users,
    title: "Seller",
    description: "Mostramos y vendemos por ti.",
    id: "seller"
  },
  {
    icon: UserCheck,
    title: "Coach", 
    description: "Tú presentas, te acompañamos en cámara.",
    id: "coach"
  },
  {
    icon: Truck,
    title: "Delivery",
    description: "Recogemos y entregamos pedidos.",
    id: "delivery"
  }
];

export const TeamSection = () => {
  return (
    <section 
      className="jess-section-padding"
      style={{ background: 'var(--ivory)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: 'var(--s5)' }}>
          <h2 
            className="jess-h2 font-bold mb-6"
            style={{ color: 'var(--black)' }}
          >
            Escoge tu TEAM
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            Diferentes modalidades de servicio para que elijas la que mejor se adapte a tu negocio
          </p>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {teams.map((team, index) => {
            const Icon = team.icon;
            return (
              <div
                key={index}
                className="relative group text-center"
              >
                {/* Team Card */}
                <div className="step-card">
                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 jess-transition"
                    style={{ 
                      background: 'var(--gold)',
                      width: '56px',
                      height: '56px'
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ 
                        color: 'var(--black)',
                        strokeWidth: '1.75px'
                      }} 
                    />
                  </div>

                  {/* Content */}
                  <h3 
                    className="jess-h3 font-semibold mb-4"
                    style={{ color: 'var(--black)' }}
                  >
                    {team.title}
                  </h3>
                  <p 
                    className="leading-relaxed mb-6"
                    style={{ 
                      color: 'var(--text)',
                      lineHeight: '1.65'
                    }}
                  >
                    {team.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center" 
          style={{ marginTop: 'calc(var(--s6) + var(--s4))' }}
        >
          <Button 
            variant="hero" 
            size="lg" 
            className="btn-gold"
            asChild
          >
            <Link to="/planes">
              Ver planes y precios
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};