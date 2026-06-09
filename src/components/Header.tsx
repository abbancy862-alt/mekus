import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Calendar } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickReserve: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenQuickReserve }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'The Sanctuary' },
    { id: 'menu', label: 'Culinary Gallery' },
    { id: 'reservations', label: 'Reservations' },
    { id: 'gallery', label: 'The Chronicle' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold/10 bg-bg-forest/80 backdrop-blur-md">
      {/* Top micro-banner */}
      <div className="hidden border-b border-gold/5 bg-bg-forest/90 py-1.5 md:block">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-6 text-[11px] font-mono tracking-widest text-[#cecece]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold font-sans font-semibold">
              <MapPin className="h-3 w-3 text-secondary" />
              <span>DUTSE HIGHLANDS, JIGAWA</span>
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="h-3 w-3 text-secondary" />
              <a href="tel:+2348066926174">CALL: +234 (0) 806 692 6174</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>DAILY: 12:00 PM – 11:30 PM</span>
            <span className="h-3 w-px bg-white/10" />
            <span className="text-gold font-sans font-semibold hover:underline cursor-pointer" onClick={() => setActiveTab('reservations')}>
              RESERVE PRIVATE SALON
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo with forest & flame accents */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('home')}
            id="nav-brand-logo"
          >
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-bg-forest/50 overflow-hidden shadow">
              <div className="absolute inset-0 bg-radial-gradient from-accent-red/20 to-transparent" />
              <img 
                src="/input_file_0.png" 
                alt="Mekus Cousines Logo" 
                className="h-full w-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-gold">M</span>
              </div>
              {/* Flame spark dot */}
              <div className="absolute right-1 top-1 h-1.5 w-1.5 bg-accent-coral rounded-full animate-ping" />
            </div>
            <div>
              <span className="block font-display text-lg font-bold tracking-wider text-gold">Mekus</span>
              <span className="block text-[8px] font-mono tracking-[0.25em] text-[#b4cdb8] uppercase font-semibold">COUSINES</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`relative py-1 font-sans text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
                      activeTab === item.id 
                        ? 'text-gold' 
                        : 'text-[#cecece] hover:text-gold'
                    }`}
                    id={`nav-item-${item.id}`}
                  >
                    {item.label}
                    {activeTab === item.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenQuickReserve}
              className="group flex items-center gap-2 rounded-full border border-gold/40 bg-accent-red/20 hover:bg-accent-red/30 px-5 py-2.5 text-[11px] font-semibold tracking-widest text-gold uppercase transition-all"
              id="header-reserve-btn"
            >
              <Calendar className="h-3 w-3 group-hover:rotate-12 transition-transform" />
              <span>Book Table</span>
            </motion.button>
          </nav>

          {/* Mobile Hamburguer Menu Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onOpenQuickReserve}
              className="flex items-center justify-center p-2 rounded-full border border-gold/30 bg-accent-red/10 text-gold"
              aria-label="Quick Book"
            >
              <Calendar className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gold hover:bg-bg-forest-light rounded-lg border border-white/5 transition-colors"
              aria-label="Toggle menu"
              id="mobile-menu-trigger"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gold/10 bg-bg-forest md:hidden"
            id="mobile-nav-panel"
          >
            <div className="flex flex-col gap-5 px-6 py-8">
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-4 py-2 border-l-2 pl-4 text-xs font-semibold tracking-widest uppercase transition-all ${
                      activeTab === item.id 
                        ? 'border-gold text-gold bg-gold/5' 
                        : 'border-transparent text-[#cecece] hover:border-gold/30 hover:text-gold'
                    }`}
                  >
                    <span>{item.label}</span>
                  </motion.button>
                ))}
              </nav>

              <div className="h-px bg-gold/10 my-2" />

              <div className="flex flex-col gap-2.5 font-mono text-[10px] text-text-muted">
                <span className="flex items-center gap-2">
                  <MapPin className="h-3/5 w-3.5 text-gold" />
                  <span>Behind Secretariat, Dutse Highlands, Jigawa state</span>
                </span>
                <span className="flex items-center gap-2">
                  <Phone className="h-3/5 w-3.5 text-gold" />
                  <a href="tel:+2348066926174">+234 806 692 6174</a>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
