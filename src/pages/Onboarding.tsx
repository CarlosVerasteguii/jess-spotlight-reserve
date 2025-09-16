import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Upload, Check, Star, Clock, Users, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";

interface FormData {
  // Step 1: Contact
  name: string;
  instagram: string;
  whatsapp: string;
  city: string;
  
  // Step 2: Objective
  objective: string;
  
  // Step 3: Pre-sale
  checklist: string[];
  photos: File[];
  
  // Step 4: Package
  selectedPackage: string;
  
  // Step 5: Confirmations
  acceptDelivery: boolean;
  acceptCommunication: boolean;
}

const OBJECTIVES = [
  { id: "spot", label: "SPOT/Storage", description: "Almacenamiento y exposición de productos" },
  { id: "consignment", label: "Consignación/Publicidad", description: "Venta por consignación con promoción" },
  { id: "live", label: "Live en The Box Club", description: "Transmisiones en vivo para ventas" },
  { id: "shopping", label: "ShoppingBOX", description: "Plataforma de venta online" }
];

const CHECKLIST_ITEMS = [
  "Prendas planchadas y sin arrugas",
  "Outfits completos armados",
  "Iluminación adecuada para fotos",
  "Accesorios y complementos",
  "Etiquetas con precios visibles",
  "Productos limpios y en buen estado",
  "Variedad de tallas disponibles",
  "Colores representativos de la marca"
];

const PACKAGES = [
  {
    id: "basic",
    name: "Básico",
    price: "$399",
    features: ["Exposición básica", "1 live mensual", "Soporte estándar"],
    popular: false
  },
  {
    id: "standard",
    name: "Estándar",
    price: "$489",
    features: ["Exposición premium", "2 lives mensuales", "Soporte prioritario", "Analytics básicos"],
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "$689",
    features: ["Exposición destacada", "4 lives mensuales", "Soporte 24/7", "Analytics avanzados", "Promoción especial"],
    popular: false
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$999",
    features: ["Exposición exclusiva", "Lives ilimitados", "Account manager", "Analytics completos", "Promoción premium", "Reportes personalizados"],
    popular: false
  }
];

const HOURLY_PACKAGES = [
  {
    id: "single",
    name: "Por hora",
    price: "$189/h",
    description: "Perfecto para pruebas"
  },
  {
    id: "triple",
    name: "3 horas",
    price: "$450",
    description: "Sesión extendida"
  },
  {
    id: "associated",
    name: "3h + Plataformas",
    price: "$349",
    description: "Con plataformas asociadas"
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    instagram: "",
    whatsapp: "",
    city: "",
    objective: "",
    checklist: [],
    photos: [],
    selectedPackage: "",
    acceptDelivery: false,
    acceptCommunication: false
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        if (!formData.name || !formData.whatsapp || !formData.city) {
          toast({ title: "Error", description: "Por favor completa todos los campos obligatorios", variant: "destructive" });
          return false;
        }
        break;
      case 2:
        if (!formData.objective) {
          toast({ title: "Error", description: "Por favor selecciona un objetivo", variant: "destructive" });
          return false;
        }
        break;
      case 4:
        if (!formData.selectedPackage) {
          toast({ title: "Error", description: "Por favor selecciona un paquete", variant: "destructive" });
          return false;
        }
        break;
      case 5:
        if (!formData.acceptDelivery || !formData.acceptCommunication) {
          toast({ title: "Error", description: "Debes aceptar los términos para continuar", variant: "destructive" });
          return false;
        }
        break;
    }
    return true;
  };

  const handleChecklistChange = (item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      checklist: checked 
        ? [...prev.checklist, item]
        : prev.checklist.filter(i => i !== item)
    }));
  };

  const handleSaveProgress = () => {
    toast({ title: "Progreso guardado", description: "Tu información ha sido guardada correctamente" });
  };

  const handleSubmit = () => {
    if (validateCurrentStep()) {
      toast({ title: "Solicitud enviada", description: "Nos pondremos en contacto contigo pronto" });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Datos de contacto</h2>
              <p className="text-muted-foreground">Información básica para contactarte</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre de la marca *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Mi Marca Fashion"
                />
              </div>
              
              <div>
                <Label htmlFor="instagram">Instagram/Facebook</Label>
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="@mimarca"
                />
              </div>
              
              <div>
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  placeholder="+52 55 1234 5678"
                />
              </div>
              
              <div>
                <Label htmlFor="city">Ciudad *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  placeholder="Ciudad de México"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">¿Cuál es tu objetivo?</h2>
              <p className="text-muted-foreground">Selecciona el servicio que más te interesa</p>
            </div>
            
            <RadioGroup 
              value={formData.objective} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, objective: value }))}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {OBJECTIVES.map((objective) => (
                <div key={objective.id} className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value={objective.id} id={objective.id} className="mt-1" />
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={objective.id} className="font-medium cursor-pointer">
                      {objective.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {objective.description}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Pre-Venta</h2>
              <p className="text-muted-foreground">Prepara tus productos para la mejor exposición</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Checklist de preparación</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHECKLIST_ITEMS.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={item}
                      checked={formData.checklist.includes(item)}
                      onCheckedChange={(checked) => handleChecklistChange(item, !!checked)}
                    />
                    <Label htmlFor={item} className="text-sm cursor-pointer">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Fotos de productos</h3>
                <Badge variant="outline">{formData.photos.length}/12</Badge>
              </div>
              
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Sube tus fotos aquí</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Máximo 12 fotos. Formatos: JPG, PNG (máx. 5MB c/u)
                </p>
                <Button variant="outline">
                  Seleccionar archivos
                </Button>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-800">
                  <strong>Recordatorio:</strong> Envía todas las fotos 24 horas antes de tu fecha programada
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Elige tu paquete</h2>
              <p className="text-muted-foreground">Selecciona el plan que mejor se adapte a tus necesidades</p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Paquetes mensuales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {PACKAGES.map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className={`cursor-pointer transition-all ${
                        formData.selectedPackage === pkg.id 
                          ? 'ring-2 ring-primary border-primary' 
                          : 'hover:shadow-md'
                      } ${pkg.popular ? 'border-primary' : ''}`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedPackage: pkg.id }))}
                    >
                      <CardHeader className="text-center pb-2">
                        {pkg.popular && (
                          <Badge className="w-fit mx-auto mb-2">
                            <Star className="w-3 h-3 mr-1" />
                            Más popular
                          </Badge>
                        )}
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <div className="text-2xl font-bold text-primary">{pkg.price}</div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {pkg.features.map((feature) => (
                            <li key={feature} className="flex items-center">
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Paquetes por horas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {HOURLY_PACKAGES.map((pkg) => (
                    <Card 
                      key={pkg.id}
                      className={`cursor-pointer transition-all ${
                        formData.selectedPackage === pkg.id 
                          ? 'ring-2 ring-primary border-primary' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, selectedPackage: pkg.id }))}
                    >
                      <CardHeader className="text-center">
                        <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        <div className="text-xl font-bold text-primary">{pkg.price}</div>
                        <CardDescription>{pkg.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button variant="outline" asChild>
                  <a href="/planes">Comparar todos los planes</a>
                </Button>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Confirmaciones finales</h2>
              <p className="text-muted-foreground">Últimos detalles antes de enviar tu solicitud</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="delivery"
                  checked={formData.acceptDelivery}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptDelivery: !!checked }))}
                />
                <div>
                  <Label htmlFor="delivery" className="cursor-pointer">
                    Acepto el tiempo de entrega de 3 días para showrooms asociados
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Los productos llegarán a los puntos de venta en un máximo de 3 días hábiles
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="communication"
                  checked={formData.acceptCommunication}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, acceptCommunication: !!checked }))}
                />
                <div>
                  <Label htmlFor="communication" className="cursor-pointer">
                    Acepto el canal de comunicación establecido
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Primer contacto por Inbox, comunicación posterior por WhatsApp
                  </p>
                </div>
              </div>
            </div>

            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-lg">Resumen de tu solicitud</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Marca:</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Ciudad:</span>
                  <span className="font-medium">{formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Objetivo:</span>
                  <span className="font-medium">
                    {OBJECTIVES.find(obj => obj.id === formData.objective)?.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Paquete:</span>
                  <span className="font-medium">
                    {[...PACKAGES, ...HOURLY_PACKAGES].find(pkg => pkg.id === formData.selectedPackage)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Items checklist:</span>
                  <span className="font-medium">{formData.checklist.length}/8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Publica tu marca</h1>
            <p className="text-xl text-muted-foreground">
              Únete a The Box Club y lleva tu marca al siguiente nivel
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Paso {currentStep} de {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% completado</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardContent className="p-6">
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleSaveProgress}>
                Guardar progreso
              </Button>
              
              {currentStep === totalSteps ? (
                <Button onClick={handleSubmit} className="flex items-center">
                  Enviar solicitud
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex items-center">
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}