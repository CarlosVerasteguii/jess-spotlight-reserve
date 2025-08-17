import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, User, X } from "lucide-react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-ink-black text-porcelain-white sticky top-0 z-50 jess-backlight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brushed-gold rounded-sm flex items-center justify-center jess-glow">
              <span className="text-ink-black font-bold text-sm">JB</span>
            </div>
            <span className="text-xl font-bold tracking-wide uppercase">JESS BOX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/agenda"
              className={`jess-transition hover:text-brushed-gold ${
                isActive('/agenda') ? 'text-brushed-gold' : ''
              }`}
            >
              Agenda
            </Link>
            <Link
              to="/como-funciona"
              className={`jess-transition hover:text-brushed-gold ${
                isActive('/como-funciona') ? 'text-brushed-gold' : ''
              }`}
            >
              Cómo funciona
            </Link>
            <Link
              to="/ayuda"
              className={`jess-transition hover:text-brushed-gold ${
                isActive('/ayuda') ? 'text-brushed-gold' : ''
              }`}
            >
              Ayuda
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="minimal" size="sm" asChild>
              <Link to="/auth">
                <User className="w-4 h-4" />
                Mi cuenta
              </Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/agenda">
                <Calendar className="w-4 h-4" />
                Reservar
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-porcelain-white hover:text-brushed-gold"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-soft-graphite">
            <div className="flex flex-col space-y-4">
              <Link
                to="/agenda"
                className={`jess-transition hover:text-brushed-gold ${
                  isActive('/agenda') ? 'text-brushed-gold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Agenda
              </Link>
              <Link
                to="/como-funciona"
                className={`jess-transition hover:text-brushed-gold ${
                  isActive('/como-funciona') ? 'text-brushed-gold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cómo funciona
              </Link>
              <Link
                to="/ayuda"
                className={`jess-transition hover:text-brushed-gold ${
                  isActive('/ayuda') ? 'text-brushed-gold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Ayuda
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-soft-graphite">
                <Button variant="minimal" size="sm" asChild>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <User className="w-4 h-4" />
                    Mi cuenta
                  </Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/agenda" onClick={() => setIsMenuOpen(false)}>
                    <Calendar className="w-4 h-4" />
                    Reservar ahora
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};