import { Clock, User, Calendar, AlertTriangle } from "lucide-react";

const rules = [
  {
    icon: Clock,
    text: "Llegar 10 min antes"
  },
  {
    icon: User,
    text: "1 vendedor por slot"
  },
  {
    icon: Calendar,
    text: "Cancelación hasta 12h"
  },
  {
    icon: AlertTriangle,
    text: "No-show se marca ausente"
  }
];

export const QuickRulesSection = () => {
  return (
    <section 
      className="py-16"
      style={{ background: 'var(--black)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            className="jess-h3 font-semibold mb-6"
            style={{ color: 'var(--white)' }}
          >
            Reglas rápidas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rules.map((rule, index) => {
            const Icon = rule.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center space-x-3 p-4 rounded-lg"
                style={{ 
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Icon 
                  className="w-5 h-5 flex-shrink-0" 
                  style={{ 
                    color: 'var(--gold)',
                    strokeWidth: '1.5px'
                  }} 
                  aria-hidden="true"
                />
                <span 
                  className="text-sm font-medium text-center"
                  style={{ color: 'var(--ivory)' }}
                >
                  {rule.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};