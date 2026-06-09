import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, Leaf, Snowflake, Award, Sparkles, Heart } from 'lucide-react';
import { ActiveTab, MENU_ITEMS, MenuItem } from '../types';

interface MenuViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectDishForReservation: (dishName: string) => void;
}

export default function MenuView({ setActiveTab, onSelectDishForReservation }: MenuViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'starters' | 'mains' | 'desserts'>('all');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Memoized filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReserveWithDish = (dishName: string) => {
    onSelectDishForReservation(dishName);
  };

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'starters', label: 'Starters (Hearth)' },
    { id: 'mains', label: 'Mains (Monoliths)' },
    { id: 'desserts', label: 'Desserts (Sweet Amber)' },
  ] as const;

  return (
    <div className="bg-bg-forest text-text-light min-h-screen py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Banner Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest text-[#b4cdb8] uppercase mb-3">
            <Award className="h-4 w-4 text-gold" />
            <span>Meticulously Curated Roster</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            The Culinary Gallery
          </h2>
          <p className="font-serif text-sm italic text-text-muted mt-3">
            A reflection of the highlands. Each plate is drafted sequentially, relying on local crops, forest flora, and high-altitude elements.
          </p>
        </div>

        {/* Search and Filters Segment */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-low border border-gold/10 p-5 rounded-2xl mb-12 shadow-xl">
          {/* Dynamic Category Selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-[11px] font-sans font-semibold tracking-widest uppercase rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gold border-gold text-bg-forest shadow-md'
                    : 'border-white/10 hover:border-gold/30 hover:bg-white/5 text-text-muted hover:text-gold'
                }`}
                id={`cat-pill-${cat.id}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-3 flex items-center text-text-muted">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search smoke, rib, scallops..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-bg-forest border border-gold/15 rounded-full text-xs text-white placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
              id="menu-search-input"
            />
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isFav = !!favorites[item.id];
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={item.id}
                    className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group"
                    id={`menu-card-${item.id}`}
                  >
                    {/* Visual Preview */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-gold/5 bg-bg-forest">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-all"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-forest/60 via-transparent to-transparent" />
                      
                      {/* Heart Favorite Trigger */}
                      <button 
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md border transition-all ${
                          isFav 
                            ? 'bg-accent-red border-accent-red text-white'
                            : 'bg-bg-forest/70 border-white/10 hover:border-gold/50 text-[#cecece] hover:text-gold'
                        }`}
                        aria-label="Add to favorites"
                      >
                        <Heart className={`h-3.5 w-3.5 ${isFav ? 'fill-white' : ''}`} />
                      </button>

                      {/* Tag indicators */}
                      {item.tag && (
                        <span className="absolute bottom-4 left-4 flex items-center gap-1 bg-gold text-bg-forest font-mono text-[9px] font-bold px-2.5 py-1 rounded">
                          <Sparkles className="h-2.5 w-2.5" />
                          <span>{item.tag}</span>
                        </span>
                      )}

                      {item.isChefSpecial && (
                        <span className="absolute bottom-4 right-4 flex items-center gap-1 bg-accent-red text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded">
                          ★ CHEF SELECTION
                        </span>
                      )}
                    </div>

                    {/* Content Plate */}
                    <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-baseline justify-between gap-4 mb-2">
                          <h3 className="font-display text-lg font-semibold text-white group-hover:text-gold transition-colors">
                            {item.name}
                          </h3>
                          <span className="font-mono text-base font-bold text-[#b4cdb8]">
                            {item.priceFormatted}
                          </span>
                        </div>

                        <p className="font-serif text-xs text-text-muted leading-relaxed mt-2.5">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-center gap-3 border-t border-gold/10 pt-5">
                        {/* Interactive dynamic connect to reserve page! */}
                        <button
                          onClick={() => handleReserveWithDish(item.name)}
                          className="flex-1 rounded-full bg-bg-forest/60 border border-gold/35 hover:bg-gold hover:border-gold text-gold hover:text-bg-forest font-sans text-[10px] font-semibold tracking-widest uppercase py-2.5 px-4 transition-all text-center flex items-center justify-center gap-1.5"
                          id={`btn-reserve-${item.id}`}
                        >
                          <Calendar className="h-3 w-3" />
                          <span>Book Sensation</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24 border border-gold/10 rounded-2xl bg-surface-container-low max-w-xl mx-auto">
            <span className="block font-mono text-[11px] text-gold uppercase tracking-widest mb-3">No plates matched</span>
            <p className="font-serif text-sm text-text-muted">
              We update our ingredients regularly. Try typing "short rib", "lamb", or picking a clear tab category.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-6 rounded-full border border-gold/30 text-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-widest"
            >
              Clear Search Settings
            </button>
          </div>
        )}

        {/* Allergy indices / Policy Warning box */}
        <div className="mt-20 border border-gold/10 rounded-2xl bg-surface-container-low p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 flex flex-col gap-2">
            <span className="font-mono text-[9px] tracking-widest text-gold uppercase">DIETARY DISCRETIONS</span>
            <h4 className="font-display font-semibold text-white text-base">High-Altitude Botanical Spices</h4>
            <p className="font-serif text-xs text-text-muted leading-relaxed">
              We handle dry seeds, tree nuts (especially melon Egusi), and hot chili concentrates in our kitchen layout. Inform your dining architect during bookings if you suffer from severe peanut or organic sea crust hyper-sensitivities.
            </p>
          </div>
          <div className="md:col-span-4 flex items-center gap-4 justify-start md:justify-end">
            <span className="flex h-10 w-10 items-center justify-center rounded border border-[#b4cdb8]/20 bg-[#b4cdb8]/5 text-[#b4cdb8]">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="flex h-10 w-10 items-center justify-center rounded border border-blue-400/20 bg-blue-400/5 text-blue-400">
              <Snowflake className="h-5 w-5" />
            </span>
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
              Glaical Infused Cold Brews
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
