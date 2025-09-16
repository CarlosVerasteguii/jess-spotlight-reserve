import { Navigation } from "@/components/Navigation";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calendar, Clock, Users, MapPin, Filter } from "lucide-react";
import { useState } from "react";

// Mock data - expandido para mostrar más lives
const allLives = [
  {
    id: "1",
    title: "Live Beauty & Skincare",
    date: "2024-01-24",
    time: "14:00",
    duration: "2 horas",
    availableSlots: 3,
    totalSlots: 8,
    status: "available",
    location: "Studio A",
    category: "Belleza"
  },
  {
    id: "2", 
    title: "Live Hogar & Deco",
    date: "2024-01-24",
    time: "17:00", 
    duration: "1.5 horas",
    availableSlots: 1,
    totalSlots: 6,
    status: "few-left",
    location: "Studio B",
    category: "Hogar"
  },
  {
    id: "3",
    title: "Live Fashion & Accessories",
    date: "2024-01-25",
    time: "15:00",
    duration: "2 horas", 
    availableSlots: 0,
    totalSlots: 10,
    status: "full",
    location: "Studio A",
    category: "Moda"
  },
  {
    id: "4",
    title: "Live Wellness & Fitness",
    date: "2024-01-25",
    time: "19:00",
    duration: "1 hora",
    availableSlots: 0,
    totalSlots: 5,
    status: "waiting",
    location: "Studio C", 
    category: "Wellness"
  },
  {
    id: "5",
    title: "Live Tech & Gadgets",
    date: "2024-01-26",
    time: "16:00",
    duration: "2 horas",
    availableSlots: 6,
    totalSlots: 8,
    status: "available",
    location: "Studio A",
    category: "Tecnología"
  },
  {
    id: "6",
    title: "Live Food & Gourmet", 
    date: "2024-01-26",
    time: "20:00",
    duration: "1.5 horas",
    availableSlots: 2,
    totalSlots: 6,
    status: "few-left",
    location: "Studio B",
    category: "Comida"
  },
  {
    id: "7",
    title: "Live Arte & Manualidades",
    date: "2024-01-27",
    time: "14:30",
    duration: "2 horas",
    availableSlots: 4,
    totalSlots: 7,
    status: "available", 
    location: "Studio C",
    category: "Arte"
  },
  {
    id: "8",
    title: "Live Kids & Baby",
    date: "2024-01-27",
    time: "18:00",
    duration: "1 hora",
    availableSlots: 3,
    totalSlots: 5,
    status: "available",
    location: "Studio A", 
    category: "Niños"
  }
];

const categories = ["Todos", "Belleza", "Hogar", "Moda", "Wellness", "Tecnología", "Comida", "Arte", "Niños"];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "available":
      return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>;
    case "few-left":
      return <Badge variant="secondary" className="bg-orange-100 text-orange-800 border-orange-200">Pocos lugares</Badge>;
    case "full":
      return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">Completo</Badge>;
    case "waiting":
      return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">Lista de espera</Badge>;
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-MX', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const Agenda = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStatus, setSelectedStatus] = useState("Todos");

  const filteredLives = allLives.filter(live => {
    const categoryMatch = selectedCategory === "Todos" || live.category === selectedCategory;
    const statusMatch = selectedStatus === "Todos" || live.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--porcelain-white)' }}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-ink-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className="jess-h1 font-bold mb-6"
              style={{ color: 'var(--porcelain-white)' }}
            >
              Agenda de Lives
            </h1>
            <p 
              className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-8"
              style={{ color: 'var(--porcelain-white)', opacity: 0.8 }}
            >
              Explora todos nuestros lives programados y reserva tu espacio. 
              Cada live es una oportunidad única para presentar tus productos en vivo.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filtros:</span>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600 flex items-center">Categoría:</span>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-600">Estado:</span>
              {["Todos", "available", "few-left", "full", "waiting"].map((status) => (
                <Button
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  size="sm" 
                  onClick={() => setSelectedStatus(status)}
                  className="text-xs"
                >
                  {status === "Todos" ? "Todos" : 
                   status === "available" ? "Disponible" :
                   status === "few-left" ? "Pocos lugares" :
                   status === "full" ? "Completo" : "Lista de espera"}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lives Grid */}
      <section id="proximos" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 
              className="jess-h2 font-bold mb-4"
              style={{ color: 'var(--black)' }}
            >
              {filteredLives.length} Lives {selectedCategory !== "Todos" && `de ${selectedCategory}`}
            </h2>
            <p 
              className="text-gray-600"
            >
              Selecciona un live para ver los detalles y reservar tu turno
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLives.map((live) => (
              <Card key={live.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    {getStatusBadge(live.status)}
                    <div className="text-right">
                      <div className="text-sm text-gray-500">
                        {live.availableSlots}/{live.totalSlots} espacios
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg mb-3 text-gray-900">
                    {live.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {formatDate(live.date)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {live.time} ({live.duration})
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {live.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      {live.category}
                    </div>
                  </div>

                  <Button 
                    asChild
                    className={`w-full ${
                      live.status === "available" ? "btn-gold" :
                      live.status === "few-left" ? "bg-orange-600 hover:bg-orange-700 text-white" :
                      live.status === "full" ? "bg-gray-400 text-gray-600 cursor-not-allowed" :
                      "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                    disabled={live.status === "full"}
                  >
                    <Link to={`/live/${live.id}`}>
                      {live.status === "available" ? "Seleccionar turno" :
                       live.status === "few-left" ? "¡Últimos lugares!" :
                       live.status === "full" ? "Completo" :
                       "Lista de espera"}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLives.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay lives disponibles
              </h3>
              <p className="text-gray-500 mb-6">
                Con los filtros seleccionados no encontramos lives disponibles
              </p>
              <Button 
                onClick={() => {
                  setSelectedCategory("Todos");
                  setSelectedStatus("Todos");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 
            className="jess-h2 font-bold mb-6"
            style={{ color: 'var(--black)' }}
          >
            ¿No encuentras el live perfecto?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Revisa nuestros planes y descubre todas las opciones disponibles para emprendedores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/planes">
                Ver planes
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/reglas">
                Conocer las reglas
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default Agenda;