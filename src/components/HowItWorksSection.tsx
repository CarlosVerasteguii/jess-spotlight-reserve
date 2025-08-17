import { Calendar, Camera, Trophy } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Reserva tu slot",
    description: "Elige fecha y hora disponible. Cada slot dura 15-20 minutos para tu presentación.",
    step: "01"
  },
  {
    icon: Camera,
    title: "Preséntate en vivo",
    description: "Llega al estudio y muestra tus productos ante nuestra audiencia en livestream.",
    step: "02"
  },
  {
    icon: Trophy,
    title: "Conecta con clientes",
    description: "Aprovecha la exposición en vivo para generar ventas y hacer crecer tu marca.",
    step: "03"
  }
];

export const HowItWorksSection = () => {
  return (
    <section className="jess-section-padding bg-porcelain-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-black mb-6">
            Cómo funciona
          </h2>
          <p className="text-lg md:text-xl text-soft-graphite max-w-2xl mx-auto leading-relaxed">
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
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-warm-ivory z-0 transform translate-x-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-brushed-gold/30 to-transparent"></div>
                  </div>
                )}

                {/* Step Card */}
                <div className="relative z-10 jess-card p-8 text-center hover:scale-105 jess-transition">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-brushed-gold text-ink-black rounded-full flex items-center justify-center font-bold text-lg jess-glow">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-warm-ivory rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brushed-gold/10 jess-transition">
                    <Icon className="w-8 h-8 text-brushed-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-ink-black mb-4">
                    {step.title}
                  </h3>
                  <p className="text-soft-graphite leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-soft-graphite mb-6">
            ¿Listo para mostrar tus productos al mundo?
          </p>
          <div className="w-32 h-1 bg-brushed-gold mx-auto jess-glow"></div>
        </div>
      </div>
    </section>
  );
};