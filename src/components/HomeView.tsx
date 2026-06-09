import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, Calendar, ArrowRight, ArrowLeft, Star, Heart, Sparkles, MapPin, Award, Flame, Leaf, Instagram, Play, Volume2, VolumeX, MessageCircle, Bookmark, ExternalLink } from 'lucide-react';
import { ActiveTab, SIGNATURE_CREATIONS, TESTIMONIALS } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickBookItem?: (menuItemName: string) => void;
}

export default function HomeView({ setActiveTab, onQuickBookItem }: HomeViewProps) {
  const [activeSliderIdx, setActiveSliderIdx] = useState(0);
  const [activeReelIdx, setActiveReelIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [likedReels, setLikedReels] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({
    0: 1242,
    1: 893,
    2: 1544
  });

  const instagramReels = [
    {
      title: "Pouring Miyan Zogale",
      caption: "Streaming hot and creamy botanical Moringa-soup (Miyan Zogale) over fluffy, cloud-soft Tuwon Shinkafa. The true scent of Dutse highlands.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-cooking-in-a-pot-close-up-41604-large.mp4",
      comments: [
        { user: "fatima_dutse", text: "Best Tuwo in Jigawa state, hands down! 😍" },
        { user: "kamal_haruna", text: "The Miyan Zogale looks so rich, absolutely love the presentation!" },
        { user: "foodie_nigeria", text: "Fine-dining meets Northern heritage. Brilliant work, Mekus!" }
      ]
    },
    {
      title: "The Fire of the Hearth",
      caption: "Sizzling and slow-cooking our wood-smoked Kilishi and tender gourmet Suya skewered elements directly over live blazing cherry tree coals.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-meat-on-the-grill-41610-large.mp4",
      comments: [
        { user: "al_amin_gumel", text: "The woodsmoke flavor is incredibly deep. A masterpiece on coal." },
        { user: "hafsat_jgw", text: "Can hear the sizzle from my screen! 🔥🔥" },
        { user: "travel_north", text: "A must-visit spot behind the Secretariat. The atmosphere is majestic." }
      ]
    },
    {
      title: "Plating the Masa Gold",
      caption: "Tossing local sweet wild flower honey and dynamic peanut dust onto crispy, griddled golden fermented rice Masa cakes.",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-putting-fresh-herbs-on-a-gourmet-plate-41609-large.mp4",
      comments: [
        { user: "umm_muhammad", text: "Crispy edges with a pillowy heart... beautiful Masa." },
        { user: "yakubu_d", text: "Love the honey drizzle pairing! A classic sweet/savory contrast." },
        { user: "chef_tobi", text: "Plating skill is Parisian level but entirely Nigerian at soul." }
      ]
    }
  ];

  const handleToggleLike = (idx: number) => {
    setLikedReels(prev => {
      const isCurrentlyLiked = !!prev[idx];
      setLikeCounts(counts => ({
        ...counts,
        [idx]: counts[idx] + (isCurrentlyLiked ? -1 : 1)
      }));
      return {
        ...prev,
        [idx]: !isCurrentlyLiked
      };
    });
  };

  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const heroBgY = useTransform(scrollY, [0, 600], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0.2]);

  const handleNextSlider = () => {
    setActiveSliderIdx((prev) => (prev + 1) % SIGNATURE_CREATIONS.length);
  };

  const handlePrevSlider = () => {
    setActiveSliderIdx((prev) => (prev === 0 ? SIGNATURE_CREATIONS.length - 1 : prev - 1));
  };

  // Quick book selection handler
  const handleQuickBook = (dishName: string) => {
    if (onQuickBookItem) {
      onQuickBookItem(dishName);
    } else {
      setActiveTab('reservations');
    }
  };

  return (
    <div className="bg-bg-forest text-text-light overflow-hidden">
      {/* 1. HERO SECTION WITH PARALLAX */}
      <section ref={heroRef} className="relative flex min-h-[92vh] items-center justify-center px-6 py-20">
        <motion.div 
          style={{ y: heroBgY, opacity: heroOpacity }}
          className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-HyKKiJ6oCp41pJarS7ePfOwdrmM6E79HBmF1N7Z1q8QXTr-asmavX5bJZm_mnN6gsT7ixHHjhM608dPodjy8Qt4kL3Rg56CDXRwjX2r2Iqp46Kth-HH-8hkdNAP0FAFZh0w5PPJkaSPpYzZrZBnD0WtTEpixoPRtbLExGeFv4tOK2CxvbiMFImBnetQhFMlvTAaN2F_sfMZNNoc1Xlw39ngwCyrC8u7egVcSTEq2JEsDRBoZpLjWG0lgurkQHGoN16xchtj1mg')] bg-cover bg-center"
        >
          {/* Custom Forest Deep Moss Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-forest via-bg-forest/65 to-bg-forest/40" />
          <div className="absolute inset-0 bg-radial-gradient from-accent-red/10 via-transparent to-transparent opacity-80" />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 rounded-full border border-gold/25 bg-bg-forest/80 px-4 py-1.5 font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-6 shadow-lg backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-gold" />
              <span>DUTSE HIGHLANDS HERITAGE SANCTUARY</span>
            </div>

            <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
              <span className="block font-serif font-light italic text-gold text-3xl sm:text-5xl md:text-6xl mb-2">Stillness of the Forest</span>
              <span className="block uppercase tracking-wider">Passion of Gold & Flame</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-serif text-sm italic leading-relaxed text-[#c3c8c1] sm:text-base">
              "An exquisite fine dining culinary and heritage sanctuary in Dutse, where the timeless resilience of granite monoliths meets the glowing hearth."
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('reservations')}
                className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gold hover:bg-gold-hover text-bg-forest font-sans text-xs font-bold tracking-widest uppercase py-4 px-8 transition-all"
                id="hero-book-btn"
              >
                <span>Reserve a Sanctuary Desk</span>
                <Calendar className="h-4 w-4 text-bg-forest" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, bg: 'rgba(255, 255, 255, 0.05)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab('menu')}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent text-white font-sans text-xs font-semibold tracking-widest uppercase py-4 px-8 transition-colors"
                id="hero-menu-btn"
              >
                <span>The Culinary Gallery</span>
                <motion.span className="group-hover:translate-x-1.5 transition-transform">
                  <ArrowRight className="h-4 w-4 text-gold" />
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Scroll down decoration indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] tracking-widest text-text-muted uppercase">Sensing Earth</span>
          <div className="h-10 w-0.5 bg-gradient-to-b from-gold/50 to-transparent animate-bounce" />
        </div>
      </section>

      {/* 2. THE CHRONICLE OF MEKUS (NARRATIVE DIALOGUE) */}
      <section className="container mx-auto max-w-7xl px-6 py-24 border-t border-gold/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Visual Column */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-gold/15 relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlvOX7GmqlPW6UlE074Nh7QdqdVVgZXnD_HEdfEIHQIA4FUGy2jjI7jTIuB1cMDz0dOiJZkVTyVit8sY9vwmr8q3WizfoUiRHZUSw32ezUG0lf-rSMygP6lTxbZYTybtMnwesboRy2k6VBbKc26dfZDCTODUYTgksIhpX7m4cTeky7x2MYwYuUVUkNhBeKYaEcCdECTbQaCOLpL_yr54b_TbTHFhtOFDJWtEAj1-xkiboJJCgmzffXmiogT0apXDR5QTl0MW-RMg" 
                alt="Chef hands plating art" 
                className="w-full h-full object-cover grayscale opacity-90 transition-all hover:grayscale-0 hover:scale-105 duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-forest to-transparent" />
            </div>

            {/* Float Badge overlay */}
            <div className="absolute -bottom-8 -right-4 md:right-8 bg-surface-container border border-gold/25 p-6 rounded-xl max-w-xs shadow-2xl backdrop-blur-md">
              <span className="block font-mono text-[10px] tracking-widest text-[#b4cdb8] uppercase mb-1">Our Conviction</span>
              <p className="font-serif italic text-xs leading-relaxed text-text-light text-rose-50/90">
                "We do not feed. We evoke memory. Every dish is a monument carved out of Dutse's rocky soils."
              </p>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="flex flex-col gap-6">
            <span className="flex items-center gap-2 font-mono text-[11px] tracking-widest text-[#b4cdb8] uppercase">
              <Award className="h-4 w-4 text-gold" />
              <span>THE PHILOSOPHY OF SANCTUARY</span>
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              An Exquisite Legacy Born of Stone and Ember
            </h2>
            <p className="font-serif text-sm leading-relaxed text-text-muted">
              Deep within Jigawa's elevated granite formations lies <strong>Mekus</strong>, a sanctuary of culinary design. Nestled in high altitudes, our environment thrives on intense dry warmth during the day and calming, stillness at night.
            </p>
            <p className="font-serif text-sm leading-relaxed text-text-muted">
              Our hearth burns exclusively local woods—slowly smoking delicacies at hundreds of degrees, while celebrating centuries of tribal techniques passed through families. The result is a modern dining journey tailored for refined tastes.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="border-l-2 border-gold/30 pl-4 py-1">
                <span className="block font-display text-2xl font-bold text-gold">100%</span>
                <span className="block font-mono text-[10px] tracking-widest text-[#cecece] uppercase mt-1">Highland Sourced</span>
              </div>
              <div className="border-l-2 border-[#b4cdb8]/30 pl-4 py-1">
                <span className="block font-display text-2xl font-bold text-[#b4cdb8]">48h</span>
                <span className="block font-mono text-[10px] tracking-widest text-[#cecece] uppercase mt-1">Wood Smoke Cure</span>
              </div>
            </div>

            <button 
              onClick={() => setActiveTab('menu')}
              className="mt-6 self-start flex items-center gap-2 text-xs font-semibold tracking-widest text-gold uppercase hover:underline"
            >
              <span>Explore Ingredients Library</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE SIGNATURE CREATIONS CAROUSEL */}
      <section className="bg-surface-container-low py-24 border-y border-gold/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12">
            <div>
              <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[#b4cdb8] uppercase mb-2">
                <Flame className="h-3.5 w-3.5 text-gold animate-bounce" />
                <span>HEARTH CREATIONS</span>
              </span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
                The Signature Highlights
              </h3>
            </div>
            
            {/* Slider controls */}
            <div className="flex items-center gap-4 mt-6 md:mt-0">
              <button 
                onClick={handlePrevSlider}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 hover:border-gold/50 bg-bg-forest/55 text-gold hover:text-white transition-all cursor-pointer"
                aria-label="Previous signature"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={handleNextSlider}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/20 hover:border-gold/50 bg-bg-forest/55 text-gold hover:text-white transition-all cursor-pointer"
                aria-label="Next signature"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interactive Core Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-bg-forest rounded-2xl border border-gold/10 p-6 md:p-10 shadow-2xl">
            {/* Left side detail block */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <span className="font-mono text-[10px] tracking-widest text-[#ff9e9d] uppercase">
                Creation {activeSliderIdx + 1} of {SIGNATURE_CREATIONS.length}
              </span>
              
              <h4 className="font-display text-2xl md:text-3xl font-semibold text-gold">
                {SIGNATURE_CREATIONS[activeSliderIdx].name}
              </h4>
              
              <p className="font-serif text-sm leading-relaxed text-text-muted mt-2">
                {SIGNATURE_CREATIONS[activeSliderIdx].description}
              </p>

              <div className="flex items-baseline gap-4 mt-2">
                <span className="font-mono text-xl font-bold text-[#b4cdb8]">
                  {SIGNATURE_CREATIONS[activeSliderIdx].priceFormatted}
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase text-text-muted">
                  Includes highland botanical pairing
                </span>
              </div>

              <div className="h-px bg-gold/10 my-4" />

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleQuickBook(SIGNATURE_CREATIONS[activeSliderIdx].name)}
                  className="flex-1 rounded-full bg-accent-red hover:bg-[#87252c] text-white font-sans text-xs font-bold tracking-widest uppercase py-3.5 px-6 transition-all text-center"
                >
                  Book Cooking Session
                </button>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="flex-1 rounded-full border border-gold/25 hover:border-gold text-gold font-sans text-xs font-semibold py-3.5 px-6 tracking-widest uppercase transition-colors text-center"
                >
                  View Full Slate
                </button>
              </div>
            </div>

            {/* Right side Image block */}
            <div className="lg:col-span-7 relative aspect-[4/3] rounded-xl overflow-hidden border border-gold/10">
              <img 
                src={SIGNATURE_CREATIONS[activeSliderIdx].image} 
                alt={SIGNATURE_CREATIONS[activeSliderIdx].name}
                className="w-full h-full object-cover transform scale-100 hover:scale-105 duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-forest/80 via-transparent to-transparent" />
              
              {/* Quick Spec list */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-bg-forest/90 text-[9px] font-mono px-3 py-1.5 rounded-full border border-gold/20 text-gold uppercase tracking-wider">
                  Hearth Smoke
                </span>
                <span className="bg-bg-forest/90 text-[9px] font-mono px-3 py-1.5 rounded-full border border-[#b4cdb8]/20 text-[#b4cdb8] uppercase tracking-wider">
                  Organic
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE HIGHLANDS ENVIRONMENTAL BENTO GRID */}
      <section className="container mx-auto max-w-7xl px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[#b4cdb8] uppercase mb-2">
            <Leaf className="h-3.5 w-3.5 text-gold" />
            <span>TERROIR METRICS & CRAFT</span>
          </span>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Sourced in the Rocks, Tempered by Fire
          </h3>
          <p className="font-serif text-sm italic text-text-muted mt-2">
            Every dish we plate is an environmental dialogue between our geographic coordinates and age-old culinary custom.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Map & Coordinates (Aesthetics & Tech representation combined) */}
          <div className="glass-card p-8 rounded-2xl flex flex-col gap-4 md:col-span-1">
            <div className="w-10 h-10 rounded border border-gold/30 flex items-center justify-center text-gold bg-gold/5">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="font-display font-semibold text-lg text-white">Highlands Terroir</h4>
            <div className="aspect-[5/3] rounded-lg overflow-hidden border border-white/5 opacity-80">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApg0nInYcuB9Jk2PuULlNDEVdlVJ9vIWSDIDHm-nNNnKr6pAk1GeynAJDGKOYF4aqD5GQ6eF_i9NxOS0iJT-1ErXuTBLKcT96t8USyiUfdJZhDpS2nntP_f9ZaG81q1WfOjfMhuKtW5yb3u4pIbQTbNXiAYamteBPqUhvEYkRFjVlSHJcDgDCkINW5eAIs0yGhmiHXgYuFvbGwIbo2-6aATzZQAUj2wyVhZ29_LyiLeHnMxwO-o-evRJtRTw0aHi4TS2ueoqHUlQ" 
                alt="Stylized map of Dutse coordinates" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-serif text-xs text-text-muted leading-relaxed">
              Situated behind the Secretariat in Dutse, where high altitudes bless our harvest with exquisite mineral-rich elements.
            </p>
          </div>

          {/* Card 2: Massive Fire Flame / Cook Method */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between md:col-span-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent-red/10 rounded-full blur-3xl opacity-65 -z-10" />
            
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] tracking-widest text-[#ff9e9d] uppercase bg-[#ff9e9d]/10 self-start px-2.5 py-1 rounded">
                HEARTH TRADITION
              </span>
              <h4 className="font-display font-semibold text-xl md:text-2xl text-white">
                The Wood Wood-Hearth Flame
              </h4>
              <p className="font-serif text-sm text-text-muted max-w-xl">
                We craft our fires with local woods, giving our plates an unmistakable smoky character. Delicate elements like smoked Wagyu and lamb are slow roasted at highly controlled hums.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-8 border-t border-gold/15 pt-6">
              <div className="font-mono text-center">
                <span className="block text-2xl font-bold text-gold">400°C</span>
                <span className="block text-[9px] uppercase tracking-wider text-text-muted">Seared Crust</span>
              </div>
              <div className="h-8 w-px bg-gold/10" />
              <div className="font-mono text-center">
                <span className="block text-2xl font-bold text-[#b4cdb8]">12 Hrs</span>
                <span className="block text-[9px] uppercase tracking-wider text-text-muted">Cold Infusion</span>
              </div>
              <div className="h-8 w-px bg-gold/10" />
              <button 
                onClick={() => setActiveTab('menu')}
                className="ml-auto flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/10 text-xs text-white"
              >
                <span>Read Story</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Card 3: Dining Craftsmanship */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between md:col-span-2">
            <div className="flex flex-col gap-3">
              <h4 className="font-display font-semibold text-lg text-white">Private Salons and Banquets</h4>
              <p className="font-serif text-xs text-text-muted leading-relaxed">
                A sanctuary designed for absolute focus and dining delight. Our glass-paneled salons host highly private banquets looking out into Dutse's breathtaking rocky horizon.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border border-gold bg-cover bg-center overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ1u50sOY9W6YQUaLfoGdBIrCHEH-OL2UafVj1wdQibh1uzomlnHhobMioi22ZFKcD7J9FMroouHY80_0LjZ3QJHHq5Dvoh_28ejeI72vatP1HdBQrpAuNZhr2eD659MH8dg414NBrOnprnNJMyjGjTtPHIgW5OE5tEeWMiKUlhSUF-WpqgExBYAutnJY0tiaTuAsdLUm4iB1uDVjD8_3JUayjuZbwqFGPJiMn_hyerhfc0rWDzL9U-dDK9a2US4pK3zsMtfgBYw" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border border-gold bg-cover bg-center overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI5LtAW7lQ3gSDa4MVv2xzJ3AM95dfyzALHJDrpF1qFJhLjEiD5iRuR6k-kxjIMeARhumUdul0TY-WCoHRM0QXu5xzYjZXkzeG8zLbw13tfjzsEsHzEIi_ol6PDYE5jGJvpAvJ3L-k7uIRn8c2wsLk2I80niRVNlYtVDBugY-3C3hFcfxYTqL4pi3VkwHPqS6ABXKaK-k9Ut6g8Q98A1P8V5Ugiyv-FmdQKH7pQg0lADOH7HX4bNfjJWv1FggqbK_s4mXGYJD5Xw" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border border-gold bg-bg-forest flex items-center justify-center text-[9px] text-gold font-bold">
                  +12
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('reservations')}
                className="text-xs font-semibold text-gold tracking-widest uppercase hover:underline"
              >
                Inquire Space →
              </button>
            </div>
          </div>

          {/* Card 4: Curated Plating */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between md:col-span-1">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] tracking-widest text-[#b4cdb8] uppercase">
                ESTHETIC
              </span>
              <h4 className="font-display font-semibold text-lg text-white">Plated Sculpture</h4>
              <p className="font-serif text-xs text-text-muted leading-relaxed">
                Plates designed by master ceramists to complement individual sensory and mineral density textures.
              </p>
            </div>

            <button 
              onClick={() => setActiveTab('gallery')}
              className="mt-6 text-xs font-semibold text-white tracking-widest uppercase hover:text-gold transition-colors text-left"
            >
              Examine Plating Gallery
            </button>
          </div>
        </div>
      </section>

      {/* 4.5. THE HEARTH LIVE INSTAGRAM REEL GALLERY */}
      <section className="border-t border-gold/10 bg-bg-forest py-24 overflow-hidden relative">
        <div className="absolute inset-0 bg-radial-gradient from-accent-red/5 via-transparent to-transparent opacity-60" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.25em] text-[#cecece] uppercase mb-2">
              <Instagram className="h-4 w-4 text-emerald-500 animate-pulse" />
              <span>THE HEARTH LIVE • REEL STREAM</span>
            </span>
            <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl">
              Streaming Live @mekus_cousines
            </h3>
            <p className="font-serif text-sm italic text-text-muted mt-2">
              Autoplaying direct logs from our kitchen hearth in Dutse. Touch active reels to unmute, like, and examine comments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Reels Selection List */}
            <div className="lg:col-span-4 flex flex-col gap-4 order-2 lg:order-1">
              <span className="font-mono text-[10px] tracking-widest text-[#cecece] uppercase border-b border-gold/10 pb-2 mb-2 block">
                CHOOSE REEL LOG
              </span>
              
              {instagramReels.map((reel, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReelIdx(idx)}
                  className={`p-5 rounded-xl border text-left transition-all relative ${
                    activeReelIdx === idx
                      ? 'border-gold bg-surface-container shadow-md shadow-gold/5'
                      : 'border-white/5 bg-panel-dark hover:bg-surface-container-high/60'
                  }`}
                >
                  {activeReelIdx === idx && (
                    <span className="absolute top-3 right-3 h-2 w-2 rounded-full bg-secondary animate-ping" />
                  )}
                  <span className="block font-mono text-[9px] tracking-wider text-gold uppercase mb-1">
                    Reel Log #0{idx + 1}
                  </span>
                  <span className="block font-display text-base font-semibold text-white mb-2">
                    {reel.title}
                  </span>
                  <span className="block text-xs font-serif text-text-muted line-clamp-2">
                    {reel.caption}
                  </span>
                </button>
              ))}

              <a 
                href="https://www.instagram.com/mekus_cousines/" 
                target="_blank" 
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-secondary hover:bg-[#8c0a1b] text-white font-sans text-xs font-bold tracking-widest uppercase py-4 transition-all w-full text-center"
              >
                <Instagram className="h-4 w-4" />
                <span>Visit Instagram profile</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Right Column: Premium Smartphone Mockup Player */}
            <div className="lg:col-span-8 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[340px] aspect-[9/19] rounded-[42px] border-[10px] border-neutral-900 bg-black shadow-2xl shadow-gold/10 overflow-hidden ring-4 ring-white/5">
                {/* Smartphone Dynamic Island / Speaker notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full z-30 flex items-center justify-between px-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                  <div className="w-8 h-1 bg-neutral-800 rounded-full" />
                </div>

                {/* Smartphone Screen Canvas */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between">
                  {/* Smartphone Top Instabar */}
                  <div className="p-4 pt-10 pb-8 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between z-20">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full border border-gold/40 p-0.5 overflow-hidden">
                        <img src="/input_file_0.png" className="w-full h-full object-cover rounded-full" alt="mekus" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold text-white tracking-wide">mekus_cousines</span>
                        <div className="flex items-center gap-1">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-secondary animate-pulse" />
                          <span className="text-[7px] font-mono text-secondary-container font-extrabold uppercase tracking-widest bg-secondary/20 px-1 py-0.2 rounded">LIVE HEARTH</span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setIsMuted(!isMuted)} 
                      className="p-1.5 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60"
                      aria-label="Toggle sound"
                    >
                      {isMuted ? <VolumeX className="h-3.5 w-3.5 text-rose-300" /> : <Volume2 className="h-3.5 w-3.5 text-gold" />}
                    </button>
                  </div>

                  {/* HTML Video Element playing on loop (key forced on change to reset video seamlessly) */}
                  <div className="absolute inset-0">
                    <video
                      key={activeReelIdx}
                      src={instagramReels[activeReelIdx].videoUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30" />
                  </div>

                  {/* Smartphone Bottom Overlays & Side controls */}
                  <div className="p-4 pb-6 z-20 flex justify-between items-end gap-3 w-full">
                    {/* Left overlay: text info & comments loop */}
                    <div className="flex-1 flex flex-col gap-3 max-w-[80%]">
                      <p className="text-[10px] font-sans text-[#dde5dc] leading-relaxed line-clamp-2 italic">
                        "{instagramReels[activeReelIdx].caption}"
                      </p>

                      {/* Micro-Comments container */}
                      <div className="flex flex-col gap-1.5 bg-black/50 backdrop-blur-md rounded-lg p-2.5 border border-white/5">
                        <span className="block text-[7px] font-mono tracking-wider text-gold uppercase">
                          Recent Comments
                        </span>
                        <div className="h-[48px] overflow-hidden relative">
                          <AnimatePresence mode="popLayout">
                            {instagramReels[activeReelIdx].comments.map((comment, cIdx) => (
                              <motion.div 
                                key={cIdx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.9, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, delay: cIdx * 0.15 }}
                                className="text-[8px] leading-relaxed block"
                              >
                                <strong className="text-secondary/95 mr-1 font-mono">@{comment.user}:</strong>
                                <span className="text-white/90">{comment.text}</span>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>

                    {/* Right side overlays: Instagram Actions */}
                    <div className="flex flex-col gap-4 text-center items-center">
                      {/* Heart Button */}
                      <button 
                        onClick={() => handleToggleLike(activeReelIdx)}
                        className="flex flex-col items-center gap-1 group"
                        aria-label="Like"
                      >
                        <div className={`p-2 rounded-full backdrop-blur-md border ${
                          likedReels[activeReelIdx]
                            ? 'bg-secondary/40 border-secondary text-rose-500 scale-110'
                            : 'bg-black/40 border-white/10 text-white hover:text-rose-400'
                        } transition-all`}>
                          <Heart className={`h-4.5 w-4.5 ${likedReels[activeReelIdx] ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </div>
                        <span className="text-[8px] font-mono text-[#dde5dc]">
                          {likeCounts[activeReelIdx]}
                        </span>
                      </button>

                      {/* Comment icon (Decorative placeholder) */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="p-2 rounded-full bg-black/40 border border-white/10 text-white">
                          <MessageCircle className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[8px] font-mono text-[#dde5dc]">
                          {instagramReels[activeReelIdx].comments.length}
                        </span>
                      </div>

                      {/* Bookmark icon (Decorative placeholder) */}
                      <div className="flex flex-col items-center gap-1">
                        <div className="p-2 rounded-full bg-black/40 border border-white/10 text-white">
                          <Bookmark className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[8px] font-mono text-[#dde5dc]">
                          Save
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. GUEST DIALOGUES (TESTIMONIALS) */}
      <section className="bg-surface-container-low py-24 border-t border-gold/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h3 className="font-display text-3xl font-bold text-white">
              Scribings of our Guests
            </h3>
            <p className="font-serif text-xs italic text-text-muted mt-2">
              Verbatim logs taken from the Sanctuary's historic Leather Guest Book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                key={t.id}
                className="bg-bg-forest border border-gold/5 hover:border-gold/20 p-8 rounded-xl flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="font-serif text-sm italic leading-relaxed text-[#dde5dc]">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-widest text-gold uppercase">
                    {t.author}
                  </span>
                  <Heart className="h-3 w-3 text-accent-coral/60" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IMMERSIVE INVITATION BANNER */}
      <section className="relative py-24 text-center px-6">
        <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBarAyy4VXOAo3IS0D1eAcRhTE6H_Nm314yrLhHoWOdNbK5WZwjSGsg75N9tR6sE36dnx--ghSFWPSmxJTWtl7W0B45_CZ3x8VFWo6jFbir1s9nFmeHE-ujOWcGrlHI-jAYFoLGP6bTlXu6bHmpPoJ7xNGVNulpmMInABpp8ErlVEbYX3N7-Xms9wqESJDMKcWRVIGzI3uaSqBGXqYdlJ5ZXLTYRoAeW06Ib6hXduMTRl5jOqjMS1GFHP2BkMyFFmh3T9ROCuW1EQ')] bg-cover bg-center grayscale brightness-50" />
        <div className="absolute inset-0 bg-bg-forest/85" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="font-mono text-[11px] tracking-widest text-gold bg-gold/10 inline-block px-4 py-1.5 rounded uppercase mb-4">
            Secured Entry
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-semibold text-white leading-tight">
            Will You Honor Us with Your Presence?
          </h3>
          <p className="font-serif text-sm text-text-muted mt-4 max-w-md mx-auto leading-relaxed">
            Due to our sensory nature, we limit seating to just twelve suites per session. Secure your desk in advance.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setActiveTab('reservations')}
              className="w-full sm:w-auto rounded-full bg-gold hover:bg-gold-hover text-bg-forest px-8 py-3.5 font-sans text-xs font-bold tracking-widest uppercase transition-colors"
            >
              Initiate Booking
            </button>
            <button 
              onClick={() => setActiveTab('menu')}
              className="w-full sm:w-auto rounded-full border border-white/20 px-8 py-3.5 font-sans text-xs font-semibold tracking-widest uppercase text-white hover:bg-white/5 transition-colors"
            >
              Culinary Roster
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
