import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, CheckCircle2, AlertCircle, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TeamSelector } from "@/components/TeamSelector";

// Mock data for the live event
const getLiveData = (id: string) => {
  const mockLives = {
    "1": {
      id: "1",
      title: "THE BOX CLUB Live – Productos Artesanales",
      date: "2024-01-24",
      time: "19:00",
      endTime: "22:00",
      availableSlots: 8,
      totalSlots: 12,
      status: "available" as const,
      description: "Especial dedicado a productos artesanales y hechos a mano"
    },
    "2": {
      id: "2", 
      title: "THE BOX CLUB Live – Moda y Accesorios",
      date: "2024-02-01",
      time: "19:00",
      endTime: "22:00", 
      availableSlots: 2,
      totalSlots: 12,
      status: "few-left" as const,
      description: "Showcase de moda, complementos y estilo personal"
    },
    "3": {
      id: "3",
      title: "THE BOX CLUB Live – Tecnología y Gadgets", 
      date: "2024-02-08",
      time: "19:00",
      endTime: "22:00",
      availableSlots: 0,
      totalSlots: 12,
      status: "full" as const,
      description: "Lo último en tecnología y gadgets innovadores"
    }
  };
  
  return mockLives[id as keyof typeof mockLives];
};

// Team selection types
type TeamCore = 'seller' | 'coach';
interface TeamSelection {
  team: TeamCore;
  delivery: boolean;
}

// Stable data types
type SlotStatus = 'available' | 'occupied' | 'closed';
type Slot = { 
  id: string; 
  startTime: string; 
  endTime: string; 
  status: SlotStatus;
  number: number;
};

// Generate time slots for the live (called only once)
const generateTimeSlots = (startTime: string, endTime: string, slotDuration: number = 18): Slot[] => {
  const slots: Slot[] = [];
  const start = new Date(`2024-01-01T${startTime}:00`);
  const end = new Date(`2024-01-01T${endTime}:00`);
  
  let current = new Date(start);
  let slotNumber = 1;
  
  while (current < end) {
    const slotStart = current.toTimeString().slice(0, 5);
    current.setMinutes(current.getMinutes() + slotDuration + 2); // 18min + 2min buffer
    const slotEnd = current.toTimeString().slice(0, 5);
    
    slots.push({
      id: `slot-${slotNumber}`,
      startTime: slotStart,
      endTime: slotEnd,
      status: 'available', // Default to available, will be set once
      number: slotNumber
    });
    
    slotNumber++;
  }
  
  return slots;
};

const getStatusBadge = (status: string) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium";
  
  switch (status) {
    case "available":
      return (
        <Badge className="bg-emerald-500 text-white">
          Disponible
        </Badge>
      );
    case "few-left":
      return (
        <Badge className="bg-amber-500 text-ink-black">
          Pocas plazas
        </Badge>
      );
    case "full":
      return (
        <Badge className="bg-neutral-500 text-white">
          Completo
        </Badge>
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

export default function LiveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [teamSelection, setTeamSelection] = useState<TeamSelection>({ team: 'seller', delivery: false });
  const init = useRef(false);
  
  const liveData = getLiveData(id!);

  // Initialize slots only once
  useEffect(() => {
    if (init.current || !liveData) return;
    init.current = true;
    
    const baseSlots = generateTimeSlots(liveData.time, liveData.endTime);
    // Simulate some occupied slots (only once)
    const occupiedIds = ['slot-3', 'slot-7', 'slot-10'];
    const slotsWithStatus = baseSlots.map(slot => 
      occupiedIds.includes(slot.id) 
        ? { ...slot, status: 'occupied' as SlotStatus }
        : slot
    );
    
    setSlots(slotsWithStatus);
  }, [liveData]);
  
  if (!liveData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Live no encontrado</h1>
          <Button asChild>
            <Link to="/agenda">← Volver a la agenda</Link>
          </Button>
        </div>
      </div>
    );
  }

  const canReserve = Boolean(selectedSlot && acceptedTerms && teamSelection.team && liveData.status !== 'full');

  const handleReservation = () => {
    if (canReserve) {
      // Mock checkout flow
      navigate(`/checkout/mock?liveId=${id}&slotId=${selectedSlot}`);
    }
  };

  const handleWaitingList = () => {
    // Mock waiting list
    navigate(`/waiting-list?liveId=${id}`);
  };

  return (
    <div className="min-h-screen bg-pearl-white">
      {/* Header */}
      <div className="bg-ink-black text-porcelain-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild className="text-porcelain-white hover:text-brushed-gold">
              <Link to="/agenda">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a agenda
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Live Info */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-ink-black mb-3 leading-tight">
                    {liveData.title}
                  </h1>
                  <p className="text-soft-graphite mb-4">{liveData.description}</p>
                </div>
                {getStatusBadge(liveData.status)}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-soft-graphite">
                  <Calendar className="w-5 h-5 mr-3 text-brushed-gold" />
                  <span>{formatDate(liveData.date)} · {liveData.time}–{liveData.endTime}</span>
                </div>
                <div className="flex items-center text-soft-graphite">
                  <Clock className="w-5 h-5 mr-3 text-brushed-gold" />
                  <span>Turno 18' · Buffer 2' · 1 vendedor por turno</span>
                </div>
              </div>

              <div className="bg-pearl-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-soft-graphite">Turnos disponibles</span>
                  <span className="text-sm font-bold text-brushed-gold">
                    {liveData.availableSlots}/{liveData.totalSlots}
                  </span>
                </div>
              </div>
            </div>

            {/* Time Slot Selector */}
            {liveData.status !== 'full' ? (
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <h2 className="text-xl font-bold text-ink-black mb-6">Selecciona tu turno</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {slots.map((slot) => {
                    const isSelected = selectedSlot === slot.id;
                    const isOccupied = slot.status !== 'available';
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => !isOccupied && setSelectedSlot(isSelected ? null : slot.id)}
                        disabled={isOccupied}
                        className={cn(
                          "relative p-4 rounded-xl border-2 transition-all duration-200 min-h-[60px] flex flex-col items-center justify-center",
                          {
                            // Selected state (highest priority)
                            "border-brushed-gold bg-brushed-gold text-ink-black font-medium shadow-md": isSelected,
                            // Available state
                            "border-neutral-200 hover:border-brushed-gold bg-white text-ink-black": !isSelected && !isOccupied,
                            // Occupied state  
                            "border-neutral-300 bg-neutral-100 text-neutral-500 cursor-not-allowed": isOccupied && slot.status === 'occupied',
                            // Closed state
                            "border-neutral-300 bg-neutral-200 text-neutral-400 cursor-not-allowed": isOccupied && slot.status === 'closed'
                          }
                        )}
                        aria-pressed={isSelected}
                        aria-disabled={isOccupied}
                      >
                        <div className="text-sm font-medium">
                          {slot.startTime}–{slot.endTime}
                        </div>
                        <div className="text-xs opacity-75">
                          Turno {slot.number}
                        </div>
                        
                        {slot.status === 'occupied' && (
                          <User className="absolute top-2 right-2 w-3 h-3" />
                        )}
                        {slot.status === 'closed' && (
                          <Minus className="absolute top-2 right-2 w-3 h-3" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-neutral-200">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-neutral-200 rounded mr-2"></div>
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-neutral-100 border-2 border-neutral-300 rounded mr-2 flex items-center justify-center">
                        <User className="w-2 h-2 text-neutral-500" />
                      </div>
                      <span>Ocupado</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-brushed-gold border-2 border-brushed-gold rounded mr-2"></div>
                      <span>Tu selección</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center">
                <AlertCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-ink-black mb-2">Todos los turnos están ocupados</h3>
                <p className="text-soft-graphite mb-6">
                  Este live está completo, pero puedes unirte a la lista de espera por si hay cancelaciones.
                </p>
                <Button variant="outline" onClick={handleWaitingList}>
                  Unirme a lista de espera
                </Button>
              </div>
            )}

            {/* Team Selection */}
            {liveData.status !== 'full' && selectedSlot && (
              <div className="bg-ink-black rounded-xl shadow-sm border border-neutral-700 p-6 mt-6">
                <TeamSelector 
                  value={teamSelection} 
                  onChange={setTeamSelection} 
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Action Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6 sticky top-4">
              <h3 className="text-lg font-semibold text-ink-black mb-4">Resumen</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-soft-graphite">Live:</span>
                  <span className="text-ink-black font-medium">
                    {formatDate(liveData.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-graphite">Turno:</span>
                  <span className="text-ink-black font-medium">
                    {selectedSlot 
                      ? slots.find(s => s.id === selectedSlot)?.startTime + '–' + 
                        slots.find(s => s.id === selectedSlot)?.endTime
                      : 'No seleccionado'
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-graphite">Equipo:</span>
                  <span className="text-ink-black font-medium">
                    {selectedSlot ? (
                      <>
                        {teamSelection.team === 'seller' ? 'Seller' : 'Coach'}
                        {teamSelection.delivery && ' + Delivery'}
                      </>
                    ) : 'Selecciona turno'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-soft-graphite">Precio:</span>
                  <span className="text-ink-black font-medium">Se define en local</span>
                </div>
              </div>

              {liveData.status !== 'full' && (
                <>
                  <div className="mb-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 mr-3 w-4 h-4 text-brushed-gold border-neutral-300 rounded focus:ring-brushed-gold"
                      />
                      <span className="text-sm text-soft-graphite">
                        Acepto la política de cancelación (12 h)
                      </span>
                    </label>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full btn-gold"
                    disabled={!canReserve}
                    onClick={handleReservation}
                  >
                    {selectedSlot ? 'Reservar mi turno' : 'Selecciona un turno'}
                  </Button>
                </>
              )}
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold text-ink-black mb-4">Reglas del live</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-soft-graphite">Llegar 10 min antes</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-soft-graphite">1 vendedor por turno</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-soft-graphite">Cancelación hasta 12 h</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-soft-graphite">No-show se marca ausente</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}