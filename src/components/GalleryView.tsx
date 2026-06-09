import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Eye, X, ZoomIn, ArrowRight, Camera } from 'lucide-react';
import { GALLERY_ITEMS, ActiveTab } from '../types';

interface GalleryViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function GalleryView({ setActiveTab }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // List of unique categories derived statically
  const categories = [
    { id: 'all', label: 'Complete Story' },
    { id: 'culinary', label: 'The Plated Art (Culinary)' },
    { id: 'landscape', label: 'Dutse Horizons (Landscape)' },
    { id: 'ambience', label: 'Candlelight (Ambience)' },
    { id: 'craft', label: 'The Hearth (Craft)' },
  ];

  // Filtering Logic
  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (indexInFilteredList: number) => {
    // Find the original global item from filtered items
    const selectedItem = filteredItems[indexInFilteredList];
    const globalIndex = GALLERY_ITEMS.findIndex((item) => item.id === selectedItem.id);
    setLightboxIndex(globalIndex);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const handleNextLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev! + 1));
  };

  const handlePrevLightbox = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev! - 1));
  };

  return (
    <div className="bg-bg-forest text-text-light min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Gallery Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest text-[#b4cdb8] uppercase mb-3">
            <Camera className="h-4 w-4 text-gold animate-pulse" />
            <span>THE CHROMATIC CHRONICLE OF MEKUS</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            The Living Gallery
          </h2>
          <p className="font-serif text-sm italic text-text-muted mt-3">
            Visual highlights from our sanctuary. Inspect our seared seacrust plating, Dutse's timeless sun-colored minerals, and the glowing, smoke-filled lounges.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-gold border-gold text-bg-forest shadow-md font-bold'
                  : 'border-white/10 text-text-muted hover:border-gold/30 hover:bg-white/5 hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Photo Grid layout */}
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
                id={`gallery-item-${item.id}`}
              >
                {/* Image holder with micro actions */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-forest border-b border-gold/5">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 select-none group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-forest/80 via-transparent to-transparent opacity-65" />
                  
                  {/* Floating Action eye */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-gold/90 text-bg-forest p-3.5 rounded-full border border-gold/40 shadow-xl scale-95 group-hover:scale-100 transition-transform">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Category Stamp label */}
                  <span className="absolute bottom-4 left-4 bg-bg-forest/85 border border-gold/10 text-gold font-mono text-[9px] uppercase tracking-wider px-3 py-1 rounded">
                    {item.category}
                  </span>
                </div>

                {/* Subtitle / text */}
                <div className="p-6 md:p-8">
                  <h3 className="font-display text-base font-semibold text-white group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-serif text-xs text-text-muted mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Immersive CTA to reserves */}
        <div className="mt-20 border border-gold/10 rounded-2xl bg-surface-container-low p-8 text-center max-w-2xl mx-auto flex flex-col gap-4">
          <Compass className="h-8 w-8 text-gold mx-auto animate-[spin_6s_linear_infinite]" />
          <h4 className="font-display text-xl font-bold text-white">Experience Mekus Live</h4>
          <p className="font-serif text-xs text-text-muted leading-relaxed max-w-md mx-auto">
            These photographs celebrate just small static fragments of our culinary sanctuary. Secure your dynamic table slot to sense our scents, embers, and wind textures.
          </p>
          <button 
            onClick={() => setActiveTab('reservations')}
            className="mt-4 self-center rounded-full bg-gold hover:bg-gold-hover text-bg-forest px-8 py-3.5 font-sans text-xs font-bold tracking-widest uppercase transition-colors flex items-center gap-2"
          >
            <span>Reserve Table</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* FULLSCREEN LIGHTBOX DIALOG */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-forest/98 p-6 backdrop-blur-md"
              onClick={closeLightbox}
              id="gallery-zoom-lightbox"
            >
              {/* Outer Control row */}
              <div className="absolute top-6 right-6 flex items-center gap-4">
                <span className="font-mono text-xs tracking-widest text-[#cecece]">
                  PHOTO {lightboxIndex + 1} OF {GALLERY_ITEMS.length}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                  className="p-2.5 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-gold/30 rounded-full text-gold transition-colors"
                  aria-label="Close zoomed photo"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content frame */}
              <div 
                className="max-w-5xl w-full flex flex-col gap-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Photo holder */}
                <div className="relative aspect-[16/10] w-full max-h-[70vh] rounded-xl overflow-hidden border border-gold/15 bg-bg-forest">
                  <img 
                    src={GALLERY_ITEMS[lightboxIndex].image} 
                    alt={GALLERY_ITEMS[lightboxIndex].title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Arrows */}
                  <button
                    onClick={handlePrevLightbox}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-bg-forest/85 border border-white/5 hover:border-gold/40 text-gold hover:text-white rounded-full transition-all"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <button
                    onClick={handleNextLightbox}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-bg-forest/85 border border-white/5 hover:border-gold/40 text-gold hover:text-white rounded-full transition-all"
                    aria-label="Next image"
                  >
                    →
                  </button>
                </div>

                {/* Captions card */}
                <div className="bg-bg-forest border border-gold/15 p-6 rounded-xl flex flex-col gap-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#b4cdb8] bg-[#b4cdb8]/10 self-start px-2 py-0.5 rounded uppercase">
                    category: {GALLERY_ITEMS[lightboxIndex].category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-white">
                    {GALLERY_ITEMS[lightboxIndex].title}
                  </h3>
                  <p className="font-serif italic text-sm text-text-muted">
                    "{GALLERY_ITEMS[lightboxIndex].description}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
