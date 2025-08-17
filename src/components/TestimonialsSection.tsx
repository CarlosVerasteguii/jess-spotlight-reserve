import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    business: "Joyas Artesanales MG",
    content: "JESS BOX me ayudó a llegar a clientes que nunca hubiera imaginado. Vendí más en un show que en un mes completo.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Carlos Ruiz", 
    business: "Gadgets Tech CR",
    content: "La experiencia en vivo es increíble. Puedes mostrar tu producto funcionando y responder preguntas al instante.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Ana Morales",
    business: "Cosmética Natural AM",
    content: "El formato de 15 minutos es perfecto. Tiempo suficiente para mostrar todo sin aburrir a la audiencia.",
    rating: 5, 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="jess-section-padding bg-warm-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-black mb-6">
            Lo que dicen nuestros emprendedores
          </h2>
          <p className="text-lg md:text-xl text-soft-graphite max-w-2xl mx-auto leading-relaxed">
            Historias reales de éxito en JESS BOX
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="jess-card p-8 hover:scale-105 jess-transition bg-porcelain-white"
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-brushed-gold fill-current"
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-soft-graphite leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover jess-backlight mr-4"
                />
                <div>
                  <div className="font-semibold text-ink-black">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-brushed-gold">
                    {testimonial.business}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div className="mt-16 pt-12 border-t border-soft-graphite/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brushed-gold mb-2">95%</div>
              <div className="text-soft-graphite">Satisfacción de emprendedores</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brushed-gold mb-2">100+</div>
              <div className="text-soft-graphite">Productos presentados</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-brushed-gold mb-2">5k+</div>
              <div className="text-soft-graphite">Espectadores promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};