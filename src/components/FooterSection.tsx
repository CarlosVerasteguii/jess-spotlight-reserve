import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer className="bg-ink-black text-porcelain-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-brushed-gold rounded-sm flex items-center justify-center jess-glow">
                <span className="text-ink-black font-bold">JB</span>
              </div>
              <span className="text-2xl font-bold tracking-wide uppercase">JESS BOX</span>
            </div>
            <p className="text-porcelain-white/80 mb-6 max-w-md leading-relaxed">
              La plataforma líder para emprendedores que quieren mostrar sus productos 
              en livestream. Tu momento para brillar ante una audiencia comprometida.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-porcelain-white/70">
                <Mail className="w-4 h-4 mr-3 text-brushed-gold" />
                <span>hola@jessbox.com</span>
              </div>
              <div className="flex items-center text-porcelain-white/70">
                <Phone className="w-4 h-4 mr-3 text-brushed-gold" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center text-porcelain-white/70">
                <MapPin className="w-4 h-4 mr-3 text-brushed-gold" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brushed-gold">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/agenda" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Agenda
                </Link>
              </li>
              <li>
                <Link 
                  to="/como-funciona" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link 
                  to="/ayuda" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Ayuda
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Mi cuenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-brushed-gold">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/terminos" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacidad" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="text-porcelain-white/80 hover:text-brushed-gold jess-transition"
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-soft-graphite/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-porcelain-white/60 text-sm">
              © 2024 JESS BOX. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-porcelain-white/60 text-sm">
                Hecho con ❤️ para emprendedores
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};