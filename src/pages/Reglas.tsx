import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock, RefreshCcw, HandHeart, CreditCard, Truck, UserX } from "lucide-react";
import { Link } from "react-router-dom";

const rules = [
  {
    icon: Clock,
    title: "Puntualidad",
    content: "Llega 10 minutos antes de tu turno asignado. Esto nos permite preparar el equipo y garantizar que tu presentación comience a tiempo. La puntualidad es esencial para mantener el flujo del livestream."
  },
  {
    icon: RefreshCcw,
    title: "Sin devoluciones (salvo excepciones)",
    content: "Las reservas son definitivas. Solo se aceptan devoluciones en casos de fuerza mayor o problemas técnicos del estudio. Revisa bien tu disponibilidad antes de confirmar tu turno."
  },
  {
    icon: HandHeart,
    title: "Compromiso de compra",
    content: "Al reservar tu turno, te comprometes a presentar productos reales disponibles para venta. No se permite usar el espacio para promociones sin productos tangibles o servicios no verificables."
  },
  {
    icon: CreditCard,
    title: "Pago completo",
    content: "El pago del turno debe completarse antes de la transmisión. No se permite el acceso al estudio sin confirmación de pago. Se aceptan múltiples métodos de pago."
  },
  {
    icon: Truck,
    title: "Entrega en X días",
    content: "Si ofreces productos durante el live, debes cumplir con los tiempos de entrega prometidos. Recomendamos ser realista con los plazos para mantener la confianza de los compradores."
  },
  {
    icon: UserX,
    title: "No-show = ausente",
    content: "Si no te presentas a tu turno sin aviso previo, quedarás marcado como ausente y podrías perder el derecho a futuras reservas. Respetamos el tiempo de todos los participantes."
  }
];

export default function Reglas() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Header */}
        <section className="jess-section-padding" style={{ background: 'var(--black)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 
              className="jess-h1 font-bold mb-6"
              style={{ color: 'var(--white)' }}
            >
              Reglas y Políticas
            </h1>
            <p 
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--white)', opacity: 0.8 }}
            >
              Conoce nuestras políticas para garantizar una experiencia exitosa para todos
            </p>
          </div>
        </section>

        {/* Rules Content */}
        <section className="jess-section-padding" style={{ background: 'var(--white)' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Accordion type="single" collapsible className="space-y-4">
              {rules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="step-card"
                  >
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                          style={{ 
                            background: 'var(--gold)',
                            color: 'var(--black)'
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span 
                          className="text-left font-semibold"
                          style={{ color: 'var(--black)' }}
                        >
                          {rule.title}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-16 pr-4">
                        <p 
                          className="leading-relaxed"
                          style={{ 
                            color: 'var(--text)',
                            lineHeight: '1.65'
                          }}
                        >
                          {rule.content}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>

            {/* Bottom CTA */}
            <div 
              className="text-center" 
              style={{ marginTop: 'calc(var(--s6) + var(--s4))' }}
            >
              <p 
                className="mb-6"
                style={{ color: 'var(--text)' }}
              >
                ¿Todo claro? Es hora de reservar tu turno
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="btn-gold"
                asChild
              >
                <Link to="/agenda">
                  Ver agenda
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}