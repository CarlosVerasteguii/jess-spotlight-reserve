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
            Lo que dicen nuestros emprendedores y socios
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text)' }}
          >
            Historias reales de éxito en JESS BOX
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="step-card"
              style={{ background: 'var(--white)' }}
            >
              {/* Rating Stars */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-current"
                    style={{ color: 'var(--gold)' }}
                    aria-label={i === 0 ? `${testimonial.rating} de 5 estrellas` : undefined}
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote 
                className="leading-relaxed mb-6 italic"
                style={{ color: 'var(--text)' }}
              >
                "{testimonial.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover mr-4"
                  style={{ 
                    border: '1px solid #eee',
                    width: '40px',
                    height: '40px'
                  }}
                  loading="lazy"
                />
                <div>
                  <div 
                    className="font-semibold"
                    style={{ color: 'var(--black)' }}
                  >
                    {testimonial.name}
                  </div>
                  <div 
                    className="text-sm"
                    style={{ color: 'var(--gold)' }}
                  >
                    {testimonial.business}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Stats */}
        <div 
          className="mt-16 pt-12 border-t"
          style={{ borderColor: 'rgba(43, 43, 43, 0.1)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'var(--gold)' }}
                title="Dato demo, ajustable en lanzamiento"
              >
                95%
              </div>
              <div style={{ color: 'var(--text)' }}>Satisfacción de emprendedores</div>
            </div>
            <div>
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'var(--gold)' }}
                title="Dato demo, ajustable en lanzamiento"
              >
                100+
              </div>
              <div style={{ color: 'var(--text)' }}>Productos presentados</div>
            </div>
            <div>
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'var(--gold)' }}
                title="Dato demo, ajustable en lanzamiento"
              >
                5k+
              </div>
              <div style={{ color: 'var(--text)' }}>Espectadores promedio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};