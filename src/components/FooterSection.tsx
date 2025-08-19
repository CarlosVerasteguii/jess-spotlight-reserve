import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer 
      role="contentinfo"
      style={{ 
        background: 'var(--black)', 
        color: '#CFCFCF',
        borderTop: '1px solid rgba(255,255,255,0.08)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div 
                className="w-10 h-10 rounded-sm flex items-center justify-center jess-glow"
                style={{ background: 'var(--gold)' }}
              >
                <span style={{ color: 'var(--black)', fontWeight: 'bold' }}>JB</span>
              </div>
              <span className="text-2xl font-bold tracking-wide uppercase">JESS BOX</span>
            </div>
            <p className="mb-6 max-w-md leading-relaxed" style={{ color: '#CFCFCF', opacity: 0.8 }}>
              La plataforma líder para emprendedores que quieren mostrar sus productos 
              en livestream. Tu momento para brillar ante una audiencia comprometida.
            </p>
            <div className="space-y-3">
              <div className="flex items-center" style={{ color: '#CFCFCF' }}>
                <Mail className="w-4 h-4 mr-3" style={{ color: 'var(--gold)' }} />
                <a 
                  href="mailto:hola@jessbox.com"
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}
                >
                  hola@jessbox.com
                </a>
              </div>
              <div className="flex items-center" style={{ color: '#CFCFCF' }}>
                <Phone className="w-4 h-4 mr-3" style={{ color: 'var(--gold)' }} />
                <a 
                  href="tel:+34900123456"
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.textDecoration = 'underline'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.textDecoration = 'none'}
                >
                  +34 900 123 456
                </a>
              </div>
              <div className="flex items-center" style={{ color: '#CFCFCF' }}>
                <MapPin className="w-4 h-4 mr-3" style={{ color: 'var(--gold)' }} />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 
              className="text-lg font-semibold mb-6"
              style={{ color: 'var(--gold)' }}
            >
              Navegación
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/agenda" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.textDecoration = 'underline';
                    (e.target as HTMLElement).style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.textDecoration = 'none';
                    (e.target as HTMLElement).style.opacity = '1';
                  }}
                >
                  Agenda
                </Link>
              </li>
              <li>
                <Link 
                  to="/como-funciona" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.opacity = '1';
                  }}
                >
                  Cómo funciona
                </Link>
              </li>
              <li>
                <Link 
                  to="/ayuda" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.opacity = '1';
                  }}
                >
                  Ayuda
                </Link>
              </li>
              <li>
                <Link 
                  to="/auth" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.opacity = '1';
                  }}
                >
                  Mi cuenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 
              className="text-lg font-semibold mb-6"
              style={{ color: 'var(--gold)' }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/terminos" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.opacity = '1';
                  }}
                >
                  Términos de uso
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacidad" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.opacity = '1';
                  }}
                >
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies" 
                  className="jess-transition"
                  style={{ color: '#EDEDED' }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = 'underline';
                    e.target.style.opacity = '0.85';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = 'none';
                    e.target.style.opacity = '1';
                  }}
                >
                  Política de cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm" style={{ color: '#CFCFCF' }}>
              © 2024 JESS BOX. Todos los derechos reservados.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-sm" style={{ color: '#CFCFCF' }}>
                Hecho con ❤️ para emprendedores
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};