import { useState } from "react";
import { Users, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type TeamCore = 'seller' | 'coach';

interface TeamSelection {
  team: TeamCore;
  delivery: boolean;
}

interface TeamSelectorProps {
  value: TeamSelection;
  onChange: (selection: TeamSelection) => void;
}

const teams = [
  {
    id: 'seller' as TeamCore,
    icon: Users,
    title: 'Seller',
    description: 'Mostramos y vendemos por ti',
    price: 'Incluido'
  },
  {
    id: 'coach' as TeamCore,
    icon: UserCheck,
    title: 'Coach',
    description: 'Tú presentas, te acompañamos en cámara',
    price: 'Incluido'
  }
];

export const TeamSelector = ({ value, onChange }: TeamSelectorProps) => {
  const handleTeamChange = (teamId: TeamCore) => {
    onChange({ ...value, team: teamId });
  };

  const handleDeliveryToggle = () => {
    onChange({ ...value, delivery: !value.delivery });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--white)' }}
        >
          Escoge tu equipo
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {teams.map((team) => {
            const Icon = team.icon;
            const isSelected = value.team === team.id;
            
            return (
              <button
                key={team.id}
                onClick={() => handleTeamChange(team.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  isSelected 
                    ? 'border-brushed-gold bg-brushed-gold/10' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-start space-x-3">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-brushed-gold text-ink-black' : 'bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 
                      className={`font-semibold mb-1 ${
                        isSelected ? 'text-brushed-gold' : 'text-porcelain-white'
                      }`}
                    >
                      {team.title}
                    </h4>
                    <p 
                      className={`text-sm ${
                        isSelected ? 'text-porcelain-white/90' : 'text-porcelain-white/70'
                      }`}
                    >
                      {team.description}
                    </p>
                    <span 
                      className={`text-xs ${
                        isSelected ? 'text-brushed-gold' : 'text-porcelain-white/60'
                      }`}
                    >
                      {team.price}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Delivery Toggle */}
      <div>
        <h4 
          className="text-base font-medium mb-3"
          style={{ color: 'var(--white)' }}
        >
          Servicios adicionales
        </h4>
        
        <label className="flex items-center justify-between p-4 rounded-lg border-2 border-gray-600 hover:border-gray-500 cursor-pointer transition-colors">
          <div className="flex-1">
            <div 
              className="font-medium"
              style={{ color: 'var(--white)' }}
            >
              Delivery
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--white)', opacity: 0.7 }}
            >
              Recogemos y entregamos pedidos
            </p>
          </div>
          <input
            type="checkbox"
            checked={value.delivery}
            onChange={handleDeliveryToggle}
            className="w-5 h-5 rounded border-gray-600 text-brushed-gold focus:ring-brushed-gold focus:ring-offset-gray-800"
            aria-checked={value.delivery}
          />
        </label>
      </div>
    </div>
  );
};