import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for upcoming lives
const upcomingLives = [
  {
    id: "1",
    title: "THE BOX CLUB Live – Productos Artesanales",
    date: "2024-01-24",
    time: "19:00",
    endTime: "22:00",
    availableSlots: 7,
    totalSlots: 9,
    status: "available" as const
  },
  {
    id: "2", 
    title: "THE BOX CLUB Live – Moda y Accesorios",
    date: "2024-02-01",
    time: "19:00",
    endTime: "22:00", 
    availableSlots: 2,
    totalSlots: 9,
    status: "few-left" as const
  },
  {
    id: "3",
    title: "THE BOX CLUB Live – Tecnología y Gadgets", 
    date: "2024-02-08",
    time: "19:00",
    endTime: "22:00",
    availableSlots: 0,
    totalSlots: 9,
    status: "full" as const
  }
];

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  
  switch (status) {
    case "available":
      return (
        <span className={`${baseClasses} badge-ok`}>
          Disponible
        </span>
      );
    case "few-left":
      return (
        <span className={`${baseClasses} badge-warn`}>
          Pocas plazas
        </span>
      );
    case "full":
      return (
        <span className={`${baseClasses} badge-full`}>
          Completo
        </span>
      );
    case "waiting":
      return (
        <span className={`${baseClasses} badge-wait`}>
          Lista de espera
        </span>
      );
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

export const UpcomingShowsSection = () => {
  return (
    <section 
      className="jess-section-padding"
      style={{ background: 'var(--black)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: 'var(--s5)' }}>
          <h2 
            className="jess-h2 font-bold mb-6"
            style={{ color: 'var(--white)' }}
          >
            Próximos Lives
          </h2>
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--white)', opacity: 0.8 }}
          >
            Encuentra el turno perfecto para mostrar tus productos en vivo
          </p>
        </div>

        {/* Lives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingLives.map((live) => (
            <div
              key={live.id}
              className="card-live p-6"
            >
              {/* Status Badge & Slots */}
              <div className="flex justify-between items-start mb-4">
                {getStatusBadge(live.status)}
                <div 
                  className="text-right px-3 py-1 rounded-full text-xs"
                  style={{ 
                    background: 'rgba(255,255,255,0.1)',
                    color: 'var(--white)'
                  }}
                >
                  Cupos {live.availableSlots}/{live.totalSlots}
                </div>
              </div>

              {/* Live Title */}
              <h3 
                className="text-lg font-semibold mb-4 leading-tight"
                style={{ 
                  color: 'var(--white)',
                  lineHeight: '1.3'
                }}
              >
                {live.title}
              </h3>

              {/* Live Details */}
              <div className="space-y-3 mb-6">
                <div 
                  className="flex items-center"
                  style={{ color: 'var(--white)', opacity: 0.9 }}
                >
                  <Calendar 
                    className="w-4 h-4 mr-3" 
                    style={{ color: 'var(--gold)' }} 
                  />
                  <span className="text-sm">
                    {formatDate(live.date)} · {live.time}–{live.endTime}
                  </span>
                </div>
                <div 
                  className="flex items-center"
                  style={{ color: 'var(--white)', opacity: 0.8 }}
                >
                  <Clock 
                    className="w-4 h-4 mr-3" 
                    style={{ color: 'var(--gold)' }} 
                  />
                  <span className="text-sm">
                    Turno 18' + buffer 2' · 1 vendedor por turno
                  </span>
                </div>
                <div 
                  className="flex items-center text-xs"
                  style={{ color: 'var(--white)', opacity: 0.7 }}
                >
                  <span>Equipo se elige en el siguiente paso</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                variant={live.status === "full" ? "outline" : "hero"} 
                size="sm" 
                className={`w-full ${live.status !== "full" ? "btn-gold" : ""}`}
                disabled={live.status === "full"}
                asChild={live.status !== "full"}
                style={live.status === "full" ? {
                  borderColor: 'var(--full)',
                  color: 'var(--full)',
                  background: 'transparent'
                } : {}}
              >
                {live.status === "full" ? (
                  <span>Lista de espera</span>
                ) : (
                  <Link to={`/live/${live.id}`}>
                    Seleccionar turno
                  </Link>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg" 
            className="btn-gold"
            asChild
          >
            <Link to="/agenda">
              Ver toda la agenda
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};