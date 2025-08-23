import { Calendar, Camera, Trophy } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Elige tu horario",
    description: "Consulta la agenda y selecciona un turno disponible.",
    step: "01"
  },
  {
    icon: Camera,
    title: "Preséntate en vivo",
    description: "Llega al local y muestra tus productos durante el live.",
    step: "02"
  },
  {
    icon: Trophy,
    title: "Conecta y vende",
    description: "Responde preguntas y genera ventas en tiempo real.",
    step: "03"
  }
];

export const HowItWorksSection = () => {
  return (
    <section 
      className="jess-section-padding"
      style={{ background: 'var(--white)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: 'var(--s5)' }}>
          <h2 
            className="jess-h2 font-bold mb-6"
            style={{ color: 'var(--black)' }}
          >
            Cómo funciona
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            Tres pasos simples para presentar tus productos en nuestro livestream exclusivo
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group"
              >
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div 
                    className="hidden md:block absolute top-16 left-full w-full z-0 transform translate-x-6 step-separator"
                  />
                )}

                {/* Step Card */}
                <div className="step-card relative z-10 text-center how-card">
                  {/* Step Number */}
                  <div 
                    className="absolute -top-3 right-4 w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm bg-brushed-gold text-ink-black jess-glow how-card__num"
                    style={{ 
                      top: '-14px',
                      width: '24px',
                      height: '24px',
                      lineHeight: '24px'
                    }}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 jess-transition"
                    style={{ 
                      background: 'var(--ivory)',
                      width: '56px',
                      height: '56px'
                    }}
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ 
                        color: 'var(--gold)',
                        strokeWidth: '1.75px'
                      }} 
                    />
                  </div>

                  {/* Content */}
                  <h3 
                    className="jess-h3 font-semibold mb-4"
                    style={{ color: 'var(--black)' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ 
                      color: 'var(--text)',
                      lineHeight: '1.65'
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className="text-center" 
          style={{ marginTop: 'calc(var(--s7) + var(--s4))' }}
        >
          <p 
            className="mb-6"
            style={{ color: 'var(--text)' }}
          >
            ¿Listo para mostrar tus productos al mundo?
          </p>
          <div 
            className="w-32 h-1 mx-auto jess-glow"
            style={{ background: 'var(--gold)' }}
          ></div>
        </div>
      </div>
    </section>
  );
};