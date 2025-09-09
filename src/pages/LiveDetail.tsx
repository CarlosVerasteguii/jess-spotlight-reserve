import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User, CheckCircle2, AlertCircle, Minus, Info, ExternalLink, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TeamSelector } from "@/components/TeamSelector";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { VideoModal } from "@/components/VideoModal";

// Mock data for the live event
const getLiveData = (id: string) => {
  const mockLives = {
    "1": {
      id: "1",
      title: "THE BOX CLUB Live – Productos Artesanales",
      date: "2024-01-24",
      time: "19:00",
      endTime: "22:00",
      availableSlots: 7,
      totalSlots: 9,
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
      totalSlots: 9,
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
      totalSlots: 9,
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

// Package and advance payment types
type PackageType = 'basic' | 'deluxe' | 'elite';
type AdvanceOption = '1h' | '2h';

interface PackageOption {
  id: PackageType;
  name: string;
  commission: number;
  description: string;
}

interface AdvancePayment {
  duration: AdvanceOption;
  amount: number;
}

const packages: PackageOption[] = [
  { id: 'basic', name: 'Básico', commission: 15, description: 'Comisión del 15%' },
  { id: 'deluxe', name: 'Deluxe', commission: 25, description: 'Comisión del 25%' },
  { id: 'elite', name: 'Elite', commission: 30, description: 'Comisión del 30%' }
];

const advanceOptions: AdvancePayment[] = [
  { duration: '1h', amount: 350 },
  { duration: '2h', amount: 450 }
];

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
  const { toast } = useToast();
  
  // Existing state
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [teamSelection, setTeamSelection] = useState<TeamSelection>({ team: 'seller', delivery: false });
  
  // New state for advance payment system
  const [selectedPackage, setSelectedPackage] = useState<PackageType | null>(null);
  const [selectedAdvance, setSelectedAdvance] = useState<AdvanceOption>('2h'); // Default 2h as recommended
  const [estimatedSales, setEstimatedSales] = useState<string>('');
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  
  const init = useRef(false);
  
  const liveData = getLiveData(id!);
  
  // Calculate estimated commission and balance
  const calculateEstimates = () => {
    if (!selectedPackage || !estimatedSales || !parseFloat(estimatedSales)) {
      return { commission: 0, balance: 0, isNegative: false };
    }
    
    const sales = parseFloat(estimatedSales);
    const packageOption = packages.find(p => p.id === selectedPackage);
    const advanceAmount = advanceOptions.find(a => a.duration === selectedAdvance)?.amount || 0;
    
    if (!packageOption) return { commission: 0, balance: 0, isNegative: false };
    
    const commission = sales * (packageOption.commission / 100);
    const balance = commission - advanceAmount;
    
    return {
      commission,
      balance,
      isNegative: balance < 0
    };
  };
  
  const estimates = calculateEstimates();
  
  // Validation functions
  const validateReservation = () => {
    const errors = [];
    
    if (!selectedSlot) {
      errors.push("Selecciona un turno para continuar.");
    }
    
    if (!selectedPackage) {
      errors.push("Selecciona un paquete.");
    }
    
    if (!acceptedTerms) {
      errors.push("Debes aceptar las reglas.");
    }
    
    return errors;
  };

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

  const canReserve = Boolean(selectedSlot && selectedPackage && acceptedTerms && teamSelection.team && liveData.status !== 'full');

  const handleReservation = () => {
    const validationErrors = validateReservation();
    
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => {
        toast({
          title: "Error de validación",
          description: error,
          variant: "destructive"
        });
      });
      return;
    }
    
    if (canReserve) {
      // Mock checkout flow with new data
      const advanceAmount = advanceOptions.find(a => a.duration === selectedAdvance)?.amount;
      navigate(`/checkout/mock?liveId=${id}&slotId=${selectedSlot}&package=${selectedPackage}&advance=${advanceAmount}`);
    }
  };

  const handleWaitingList = () => {
    // Mock waiting list
    navigate(`/waiting-list?liveId=${id}`);
  };

  return (
    <TooltipProvider>
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
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-4 h-4 ml-2 text-soft-graphite" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Tiempo de cambio entre presentaciones</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <div className="bg-pearl-white rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-soft-graphite">Cupos disponibles</span>
                    <span className="text-sm font-bold text-brushed-gold">
                      {liveData.availableSlots}/{liveData.totalSlots}
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Slot Selector */}
              {liveData.status !== 'full' ? (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
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
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 text-center mb-6">
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

              {/* How it works link */}
              {liveData.status !== 'full' && (
                <div className="text-center mb-6">
                  <VideoModal
                    trigger={
                      <button className="inline-flex items-center gap-2 text-brushed-gold hover:text-brushed-gold/80 transition-colors font-medium text-sm">
                        <Play className="w-4 h-4" />
                        ¿Cómo funciona?
                      </button>
                    }
                  />
                </div>
              )}

              {/* Team Selection */}
              {liveData.status !== 'full' && selectedSlot && (
                <div className="bg-ink-black rounded-xl shadow-sm border border-neutral-700 p-6 mb-6">
                  <TeamSelector 
                    value={teamSelection} 
                    onChange={setTeamSelection} 
                  />
                </div>
              )}

              {/* Package Selection */}
              {liveData.status !== 'full' && selectedSlot && (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
                  <h3 className="text-xl font-bold text-ink-black mb-6">Elige tu paquete</h3>
                  <RadioGroup value={selectedPackage} onValueChange={(value) => setSelectedPackage(value as PackageType)}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {packages.map((pkg) => (
                        <div key={pkg.id} className="relative">
                          <Label
                            htmlFor={pkg.id}
                            className={cn(
                              "flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all",
                              selectedPackage === pkg.id
                                ? "border-brushed-gold bg-brushed-gold/10"
                                : "border-neutral-200 hover:border-brushed-gold"
                            )}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-ink-black">{pkg.name}</span>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Info className="w-4 h-4 text-soft-graphite" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>El % se aplica sobre el total vendido; el anticipo se descuenta de la comisión resultante.</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <span className="text-2xl font-bold text-brushed-gold mb-1">{pkg.commission}%</span>
                            <span className="text-sm text-soft-graphite">{pkg.description}</span>
                            <RadioGroupItem
                              value={pkg.id}
                              id={pkg.id}
                              className="absolute top-4 right-4"
                            />
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Advance Payment Selection */}
              {liveData.status !== 'full' && selectedSlot && (
                <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-ink-black mb-2">Anticipo aplicable</h3>
                    <RadioGroup value={selectedAdvance} onValueChange={(value) => setSelectedAdvance(value as AdvanceOption)}>
                      <div className="space-y-3">
                        {advanceOptions.map((option) => (
                          <div key={option.duration} className="flex items-center space-x-3">
                            <RadioGroupItem value={option.duration} id={option.duration} />
                            <Label htmlFor={option.duration} className="flex-1 cursor-pointer">
                              <span className="font-medium">{option.duration === '1h' ? '1 hora' : '2 horas'}</span>
                              {option.duration === '2h' && <span className="text-brushed-gold ml-2">(recomendado)</span>}
                              <span className="ml-auto font-bold">${option.amount}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                    <p className="text-sm text-soft-graphite mt-4">
                      Tu anticipo se descuenta de la comisión final según tu paquete (15% / 25% / 30%). El anticipo siempre se paga para apartar el lugar.
                    </p>
                  </div>

                  {/* Estimated Sales Calculator */}
                  {selectedPackage && (
                    <div className="border-t border-neutral-200 pt-6">
                      <h4 className="text-md font-semibold text-ink-black mb-4">Cálculo orientativo (opcional)</h4>
                      <div className="mb-4">
                        <Label htmlFor="estimated-sales" className="text-sm font-medium text-soft-graphite">
                          Ventas estimadas ($)
                        </Label>
                        <input
                          id="estimated-sales"
                          type="number"
                          value={estimatedSales}
                          onChange={(e) => setEstimatedSales(e.target.value)}
                          placeholder="0"
                          className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brushed-gold focus:border-transparent"
                        />
                      </div>

                      {estimates.commission > 0 && (
                        <div className="bg-pearl-white rounded-lg p-4 space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Comisión estimada:</span>
                            <span className="font-medium">${estimates.commission.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Anticipo:</span>
                            <span className="font-medium">${advanceOptions.find(a => a.duration === selectedAdvance)?.amount}</span>
                          </div>
                          <div className="flex justify-between text-sm font-bold border-t border-neutral-300 pt-2">
                            <span>Saldo estimado post-live:</span>
                            <span className={estimates.isNegative ? "text-amber-600" : "text-emerald-600"}>
                              ${estimates.balance.toFixed(2)}
                            </span>
                          </div>
                          
                          {estimates.isNegative && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-3">
                              <p className="text-sm text-amber-800">
                                Si la comisión es menor al anticipo, el anticipo la cubre y no hay reembolso del excedente (puede quedar como crédito si así se define en políticas).
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
                    <span className="text-soft-graphite">Paquete:</span>
                    <span className="text-ink-black font-medium">
                      {selectedPackage ? `${packages.find(p => p.id === selectedPackage)?.commission}%` : 'No seleccionado'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-soft-graphite">Anticipo hoy:</span>
                    <span className="text-ink-black font-medium">
                      ${advanceOptions.find(a => a.duration === selectedAdvance)?.amount}
                    </span>
                  </div>
                </div>

                <div className="bg-pearl-white rounded-lg p-3 mb-6">
                  <p className="text-xs text-soft-graphite text-center">
                    El anticipo se descuenta de tu comisión post-live.
                  </p>
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
                          He leído y acepto las{' '}
                          <Dialog open={rulesModalOpen} onOpenChange={setRulesModalOpen}>
                            <DialogTrigger asChild>
                              <button className="text-brushed-gold underline hover:text-brushed-gold/80">
                                reglas clave
                              </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle className="text-xl font-bold">Reglas clave</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-3">
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Puntualidad:</strong> Llega 10 min antes para preparar equipo.
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Cancelación:</strong> Puedes cancelar hasta 12 h antes.
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Ausencia sin aviso:</strong> Se marca no-show y podrías perder futuras reservas.
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Anticipo:</strong> No reembolsable; se descuenta de la comisión final.
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Productos:</strong> Deben ser reales y disponibles para venta.
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Fotos:</strong> Cárgalas 5 días antes del live.
                                    </div>
                                  </div>
                                  <div className="flex items-start">
                                    <CheckCircle2 className="w-5 h-5 text-brushed-gold mr-3 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <strong>Logística:</strong> Todos los paquetes viajan los viernes y se entregan el fin de semana en puntos; recolecciones locales sin costo; envíos nacionales con costo extra.
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-3 pt-4">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setRulesModalOpen(false)}
                                  className="flex-1"
                                >
                                  Ver reglas completas
                                </Button>
                                <Button 
                                  onClick={() => {
                                    setAcceptedTerms(true);
                                    setRulesModalOpen(false);
                                  }}
                                  className="flex-1 btn-gold"
                                >
                                  Aceptar y continuar
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                          {' '}(cancelación 12 h)
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
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}