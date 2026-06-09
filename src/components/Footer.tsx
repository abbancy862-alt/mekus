import { motion } from 'motion/react';
import { Phone, MapPin, Mail, Sparkles } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gold/15 bg-bg-forest pt-16 pb-8 text-text-light">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
          {/* Brand Intro Column */}
          <div className="flex flex-col gap-4 md:col-span-1.5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-bg-forest/50 overflow-hidden p-0.5 shadow-sm">
                <img 
                  src="/input_file_0.png" 
                  alt="Mekus Logo" 
                  className="h-full w-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="font-display text-base font-bold text-gold absolute -z-10">M</span>
              </div>
              <div>
                <span className="block font-display text-base font-bold tracking-wider text-gold">Mekus</span>
                <span className="block text-[8px] font-mono tracking-[0.25em] text-[#b4cdb8] uppercase">COUSINES</span>
              </div>
            </div>
            <p className="font-serif text-sm italic leading-relaxed text-text-muted mt-2">
              An exquisite culinary sanctuary in Dutse, where the stillness of the rocks meet the deep passion of the wild flame.
            </p>
            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono tracking-widest text-[#cecece]">
              <Sparkles className="h-3 w-3 text-gold" />
              <span>EST. 2024 • JIGAWA STATE</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold border-b border-gold/15 pb-2">
              Explore
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium tracking-wider uppercase text-text-muted">
              <li>
                <button 
                  onClick={() => handleLinkClick('home')}
                  className="hover:text-gold transition-colors text-left"
                >
                  The Sanctuary
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('menu')}
                  className="hover:text-gold transition-colors text-left"
                >
                  Culinary Gallery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('gallery')}
                  className="hover:text-gold transition-colors text-left"
                >
                  The Chronicle (Gallery)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleLinkClick('reservations')}
                  className="hover:text-gold transition-colors text-left text-gold/90 font-semibold"
                >
                  Book a Table
                </button>
              </li>
            </ul>
          </div>

          {/* Address & Hours */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold border-b border-gold/15 pb-2">
              Hours
            </h4>
            <div className="flex flex-col gap-3 font-mono text-xs text-text-muted leading-relaxed">
              <div>
                <span className="block text-gold text-[10px] tracking-wider uppercase font-semibold">Cuisine Salon</span>
                <span className="block mt-0.5">Daily: 12:00 PM – 11:30 PM</span>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <span className="block text-[#b4cdb8] text-[10px] tracking-wider uppercase font-semibold">Tasting Lounge</span>
                <span className="block mt-0.5">Fri – Sat: 3:00 PM – 1:00 AM</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-4">
            <h4 className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-gold border-b border-gold/15 pb-2">
              Inquiries
            </h4>
            <ul className="flex flex-col gap-4 text-xs text-text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-serif italic leading-relaxed text-text-muted">
                  Behind Secretariat, Dutse Highlands, Dutse, Jigawa State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#cecece] flex-shrink-0" />
                <a href="tel:+2348066926174" className="font-mono hover:text-gold transition-colors">
                  +234 806 692 6174
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#cecece] flex-shrink-0" />
                <a href="mailto:mekuscousines@gmail.com" className="font-mono hover:text-gold transition-colors">
                  mekuscousines@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gold/10 pt-8 flex flex-col gap-4 sm:flex-row items-center justify-between">
          <p className="text-[11px] font-mono text-[#8d928c] text-center sm:text-left">
            © {currentYear} MEKUS RESTAURANT. ALL RIGHTS SECURED.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-mono text-text-muted">
            <button onClick={() => handleLinkClick('reservations')} className="hover:text-gold transition-colors">
              PRIVACY LAWS
            </button>
            <span className="h-3 w-px bg-white/10" />
            <button onClick={() => handleLinkClick('menu')} className="hover:text-gold transition-colors">
              DINING LAWS
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
