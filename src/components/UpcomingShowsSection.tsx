import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for upcoming shows
const upcomingShows = [
  {
    id: "1",
    title: "JESS BOX Live – Productos Artesanales",
    date: "2024-01-25",
    time: "19:00",
    endTime: "22:00",
    availableSlots: 8,
    totalSlots: 12,
    status: "available" as const
  },
  {
    id: "2", 
    title: "JESS BOX Live – Moda y Accesorios",
    date: "2024-02-01",
    time: "19:00",
    endTime: "22:00", 
    availableSlots: 2,
    totalSlots: 12,
    status: "few-left" as const
  },
  {
    id: "3",
    title: "JESS BOX Live – Tecnología y Gadgets", 
    date: "2024-02-08",
    time: "19:00",
    endTime: "22:00",
    availableSlots: 0,
    totalSlots: 12,
    status: "full" as const
  }
];

const getStatusBadge = (status: string, availableSlots: number) => {
  switch (status) {
    case "available":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#1FAD66', color: '#fff' }}>
          Disponible
        </span>
      );
    case "few-left":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: 'hsl(var(--brushed-gold))', color: 'hsl(var(--ink-black))' }}>
          Pocas plazas
        </span>
      );
    case "full":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#8A8A8A', color: '#fff' }}>
          Completo
        </span>
      );
    case "waiting":
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#4A90E2', color: '#fff' }}>
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
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const UpcomingShowsSection = () => {
  return (
    <section className="jess-section-padding bg-ink-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-porcelain-white mb-6">
            Próximos Lives
          </h2>
          <p className="text-lg md:text-xl text-porcelain-white/80 max-w-2xl mx-auto leading-relaxed">
            Encuentra el slot perfecto para mostrar tus productos en vivo
          </p>
        </div>

        {/* Shows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {upcomingShows.map((show) => (
            <div
              key={show.id}
              className="rounded-2xl p-6 bg-ink-black text-porcelain-white" 
              style={{ 
                boxShadow: '0 16px 40px rgba(0,0,0,0.35), inset 0 -12px 24px rgba(255,255,255,0.08)'
              }}
            >
              {/* Status Badge */}
              <div className="flex justify-between items-start mb-4">
                {getStatusBadge(show.status, show.availableSlots)}
                <div className="text-right">
                  <div className="text-sm text-porcelain-white/60">Slots</div>
                  <div className="text-lg font-semibold text-porcelain-white">
                    {show.availableSlots}/{show.totalSlots}
                  </div>
                </div>
              </div>

              {/* Show Title */}
              <h3 className="text-lg font-semibold text-porcelain-white mb-4 leading-tight">
                {show.title}
              </h3>

              {/* Show Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-porcelain-white/90">
                  <Calendar className="w-4 h-4 mr-3 text-brushed-gold" />
                  <span className="text-sm capitalize">{formatDate(show.date)} · {show.time}–{show.endTime}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-porcelain-white/80">
                    <Clock className="w-4 h-4 mr-3 text-brushed-gold" />
                    <span className="text-sm">Slot 18' + buffer 2' · 1 vendedor por slot</span>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                variant={show.status === "full" ? "minimal" : "hero"} 
                size="sm" 
                className="w-full"
                disabled={show.status === "full"}
                asChild={show.status !== "full"}
              >
                {show.status === "full" ? (
                  <span>Lista de espera</span>
                ) : (
                  <Link to={`/show/${show.id}`}>
                    Seleccionar horario
                  </Link>
                )}
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="elegant" size="lg" asChild>
            <Link to="/agenda">
              Ver toda la agenda
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};