import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Phone, Mail, Sparkles, Compass, CheckCircle2, FileText, ArrowRight, Home } from 'lucide-react';
import { ActiveTab } from '../types';

interface ReservationsViewProps {
  prefilledDishName?: string;
  onClearPrefilledDish?: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function ReservationsView({ 
  prefilledDishName, 
  onClearPrefilledDish,
  setActiveTab
}: ReservationsViewProps) {
  // Booking Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guestCount, setGuestCount] = useState<number | string>(2);
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('6:00 PM');
  const [suiteChoice, setSuiteChoice] = useState('Highlands Horizon Suite');
  const [specialRequest, setSpecialRequest] = useState('');
  
  // App states
  const [isBooked, setIsBooked] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bookingCode, setBookingCode] = useState('');

  // Handle prefilled dishes from the menu view
  useEffect(() => {
    if (prefilledDishName) {
      setSpecialRequest(`Preferred creation: "${prefilledDishName}". Please prepare highland botanical pairing accordingly.`);
    }
  }, [prefilledDishName]);

  // Seating slots
  const timeSlots = [
    { value: '12:00 PM', label: '12:00 PM (Midday Harvest)' },
    { value: '2:30 PM', label: '2:30 PM (Zenith Sun)' },
    { value: '6:00 PM', label: '6:00 PM (Sunset Hearth)' },
    { value: '8:30 PM', label: '8:30 PM (Crown Fire)' },
    { value: '10:00 PM', label: '10:00 PM (Celestial Stillness)' },
  ];

  // Seating Suite options
  const suites = [
    { 
      id: 'highlands', 
      name: 'Highlands Horizon Suite', 
      desc: 'Visual panorama of Dutse\'s monolith hills under starry skies.',
      capacity: '2-6 guests'
    },
    { 
      id: 'moss', 
      name: 'Moss & Granite Room', 
      desc: 'Low-light ambient salon surrounded by live terrariums and soft moss.',
      capacity: '2-4 guests'
    },
    { 
      id: 'hearth', 
      name: 'Hearth Fireside', 
      desc: 'Close visual integration with our central wood-fired kitchen.',
      capacity: '1-8 guests'
    },
    { 
      id: 'private', 
      name: 'Private Salon Banquet', 
      desc: 'Confidential dining capsule with absolute sound insulation.',
      capacity: 'up to 16 guests'
    },
  ];

  // Validate form
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid Email is required';
    if (!phone.trim()) newErrors.phone = 'Phone number is required';
    if (!date) newErrors.date = 'Seating date is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to error
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    // Success simulation
    setErrors({});
    const randomCode = 'MKS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingCode(randomCode);
    setIsBooked(true);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  const handleBookAnother = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setGuestCount(2);
    setDate('');
    setTimeSlot('6:00 PM');
    setSuiteChoice('Highlands Horizon Suite');
    setSpecialRequest('');
    setIsBooked(false);
    if (onClearPrefilledDish) onClearPrefilledDish();
  };

  return (
    <div className="bg-bg-forest text-text-light min-h-screen py-16 px-6 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red/5 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="container mx-auto max-w-4xl">
        <AnimatePresence mode="wait">
          {!isBooked ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header block */}
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest text-[#b4cdb8] uppercase mb-4">
                  <Compass className="h-4 w-4 text-gold" />
                  <span>Interactive Sanctuary Securing Suite</span>
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  Reserve Your Sensation
                </h2>
                <p className="font-serif text-sm italic text-text-muted mt-3">
                  Please specify your credentials, timing request, and suite preference. Your reservation remains dynamic until confirming entry steps below.
                </p>
              </div>

              {prefilledDishName && (
                <div className="bg-gold/10 border border-gold/40 rounded-xl p-4 mb-8 flex items-center justify-between text-xs text-gold">
                  <div>
                    <span className="font-semibold block uppercase tracking-wider mb-0.5">PRESELECTED SENSATION INCLUDED:</span>
                    <span className="font-serif italic text-white text-sm">"{prefilledDishName}"</span>
                  </div>
                  <button 
                    onClick={onClearPrefilledDish}
                    className="hover:underline text-[10px] uppercase font-mono tracking-widest cursor-pointer text-text-muted hover:text-gold"
                  >
                    Reset choice
                  </button>
                </div>
              )}

              {/* Booking Form Layout */}
              <form onSubmit={handleBookingSubmit} className="glass-card rounded-2xl p-6 md:p-10 flex flex-col gap-8 shadow-2xl">
                {/* 1. Guest Metrics */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-4 border-b border-gold/15 pb-2 flex items-center gap-2">
                    <span className="text-xs text-[#b4cdb8] font-mono">01.</span>
                    <span>Guest Details</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-4 w-4 text-text-muted/60" />
                        <input
                          type="text"
                          required
                          placeholder="Your honorable title and name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`w-full pl-9 pr-4 py-3 bg-bg-forest border ${errors.fullName ? 'border-accent-red' : 'border-gold/15 focus:border-gold'} rounded-lg text-xs text-white focus:outline-none transition-colors`}
                          id="res-fullname"
                        />
                      </div>
                      {errors.fullName && <span className="text-[10px] text-accent-red font-semibold">{errors.fullName}</span>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-text-muted/60" />
                        <input
                          type="email"
                          required
                          placeholder="for receipt verification"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full pl-9 pr-4 py-3 bg-bg-forest border ${errors.email ? 'border-accent-red' : 'border-gold/15 focus:border-gold'} rounded-lg text-xs text-white focus:outline-none transition-colors`}
                          id="res-email"
                        />
                      </div>
                      {errors.email && <span className="text-[10px] text-accent-red font-semibold">{errors.email}</span>}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-4 w-4 text-text-muted/60" />
                        <input
                          type="tel"
                          required
                          placeholder="+234..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full pl-9 pr-4 py-3 bg-bg-forest border ${errors.phone ? 'border-accent-red' : 'border-gold/15 focus:border-gold'} rounded-lg text-xs text-white focus:outline-none transition-colors`}
                          id="res-phone"
                        />
                      </div>
                      {errors.phone && <span className="text-[10px] text-accent-red font-semibold">{errors.phone}</span>}
                    </div>

                    {/* Guest Counters */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest">People Amount</label>
                      <div className="flex gap-2 items-center">
                        {[1, 2, 4, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuestCount(num)}
                            className={`flex-1 py-3 text-xs tracking-widest font-mono rounded-lg border transition-all ${
                              guestCount === num
                                ? 'bg-gold border-gold text-bg-forest font-bold'
                                : 'bg-bg-forest border-gold/15 hover:border-gold/40 text-[#cecece]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                        <input
                          type="number"
                          min="1"
                          max="20"
                          value={typeof guestCount === 'number' ? guestCount : ''}
                          placeholder="Other"
                          onChange={(e) => setGuestCount(parseInt(e.target.value) || '')}
                          className="w-20 text-center py-3 bg-bg-forest border border-gold/15 rounded-lg text-xs text-white focus:outline-none focus:border-gold font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Timing Metrics */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-4 border-b border-gold/15 pb-2 flex items-center gap-2">
                    <span className="text-xs text-[#b4cdb8] font-mono">02.</span>
                    <span>Timing Slot</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Calendar Selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Select Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3.5 h-4 w-4 text-text-muted/60" />
                        <input
                          type="date"
                          required
                          value={date}
                          min={new Date().toISOString().split('T')[0]} // prevent reservation in parent terms
                          onChange={(e) => setDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 bg-bg-forest border ${errors.date ? 'border-accent-red' : 'border-gold/15 focus:border-gold'} rounded-lg text-xs text-white focus:outline-none transition-colors font-mono`}
                          id="res-date"
                        />
                      </div>
                      {errors.date && <span className="text-[10px] text-accent-red font-semibold">{errors.date}</span>}
                    </div>

                    {/* Clock Slot selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Hour Preference</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-4 py-3 bg-bg-forest border border-gold/15 focus:border-gold rounded-lg text-xs text-white focus:outline-none transition-colors font-mono"
                        id="res-timeslot"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value} className="bg-bg-forest">
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Thematic Suite Selection */}
                <div>
                  <h3 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-4 border-b border-gold/15 pb-2 flex items-center gap-2">
                    <span className="text-xs text-[#b4cdb8] font-mono">03.</span>
                    <span>Thematic Suite</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {suites.map((su) => (
                      <div
                        key={su.id}
                        onClick={() => setSuiteChoice(su.name)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                          suiteChoice === su.name
                            ? 'bg-gold/5 border-gold shadow-md shadow-gold/5'
                            : 'bg-bg-forest/60 border-white/5 hover:border-gold/20'
                        }`}
                        id={`suite-pill-${su.id}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="block text-xs font-semibold uppercase tracking-wider text-white">
                              {su.name}
                            </span>
                            {suiteChoice === su.name && <div className="h-1.5 w-1.5 bg-gold rounded-full animate-ping" />}
                          </div>
                          <p className="font-serif text-[10px] text-text-muted leading-relaxed">
                            {su.desc}
                          </p>
                        </div>
                        <div className="mt-3 text-[10px] font-mono tracking-widest uppercase text-gold">
                          {su.capacity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Special Requests / Custom prefiled text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-2 border-b border-gold/15 pb-2 flex items-center gap-2">
                    <span className="text-xs text-[#b4cdb8] font-mono">04.</span>
                    <span>Dietary Or Private Notes</span>
                  </h3>
                  <textarea
                    rows={3}
                    placeholder="E.g., extreme allergies, surprise anniversary celebration, speech requirements..."
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-forest border border-gold/15 focus:border-gold rounded-lg text-xs text-white focus:outline-none transition-colors font-serif placeholder:font-serif placeholder:text-text-muted/40"
                    id="res-notes"
                  />
                </div>

                {/* Submit Panel */}
                <div className="border-t border-gold/10 pt-8 flex items-center justify-between flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#cecece] tracking-widest">
                    <Sparkles className="h-3 w-3 text-gold animate-spin" />
                    <span>SECURED & DECRYPTED TRANSMISSION</span>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full sm:w-auto rounded-full bg-gold hover:bg-gold-hover text-bg-forest px-8 py-3.5 font-sans text-xs font-bold tracking-widest uppercase transition-colors text-center"
                    id="res-submit-btn"
                  >
                    Transmit Reservation Request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-2xl p-6 md:p-12 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden flex flex-col items-center"
              id="res-success-block"
            >
              {/* Star light sparks */}
              <div className="absolute inset-0 bg-radial-gradient from-gold/10 to-transparent pointer-events-none" />

              <CheckCircle2 className="h-16 w-16 text-gold animate-[pulse_2s_infinite] mb-6" />

              <span className="font-mono text-[10px] tracking-[0.25em] text-[#b4cdb8] uppercase mb-1">Entry Request Transmitted</span>
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-white">Your Sanctuary Suite Is Allocated</h2>
              
              <p className="font-serif text-xs text-text-muted leading-relaxed mt-4 max-w-md mx-auto">
                Welcome, <strong>{fullName}</strong>. Your requested presence at the <strong>{suiteChoice}</strong> on <strong>{date}</strong> has been secured in our guest registry.
              </p>

              {/* Blueprint Receipt card */}
              <div className="my-8 w-full border border-gold/20 bg-bg-forest rounded-xl p-5 md:p-6 text-left relative flex flex-col gap-3 font-mono text-[11px]">
                {/* Torn coupon visual effects on border */}
                <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-6 rounded-r-full bg-surface-container border-r border-surface-container relative z-10" />
                <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-3 h-6 rounded-l-full bg-surface-container border-l border-surface-container relative z-10" />

                <div className="flex items-center justify-between border-b border-gold/10 pb-2 flex-wrap gap-2 text-gold">
                  <span className="font-bold">STATUS: SECURITIES BOOKED</span>
                  <span className="font-black text-xs">{bookingCode}</span>
                </div>

                <div className="grid grid-cols-2 gap-y-2 text-[#cecece]">
                  <div>GUEST HOST:</div>
                  <div className="text-right text-white font-sans uppercase font-xs">{fullName}</div>
                  
                  <div>PEOPLE:</div>
                  <div className="text-right text-white font-black">{guestCount} Suites</div>

                  <div>TIMING:</div>
                  <div className="text-right text-white uppercase font-black">{timeSlot} • {date}</div>

                  <div>CUISINE SUITE:</div>
                  <div className="text-right text-gold uppercase font-semibold">{suiteChoice}</div>
                </div>

                {specialRequest && (
                  <div className="mt-2 border-t border-gold/5 pt-2 text-[10px] italic text-[#8d928c]">
                    <span className="block font-bold not-italic uppercase mb-0.5 tracking-wider text-text-muted">DIET REQUEST:</span>
                    "{specialRequest}"
                  </div>
                )}
              </div>

              {/* Instructions regarding dress codes */}
              <div className="flex items-start gap-3 bg-[rgba(242,202,80,0.05)] border border-gold/10 p-4 rounded-xl text-left text-xs mb-8">
                <FileText className="h-5 w-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-[9px] text-[#b4cdb8] uppercase tracking-wider mb-0.5">Highlands Attire Notice</span>
                  <p className="font-serif text-[11px] text-text-muted leading-relaxed">
                    Due to local environmental high-altitude breezes in Dutse, we recommend guests adopt long-sleeved traditional robes or semi-formal luxury jackets for optimal thermal warmth during twilight sessions.
                  </p>
                </div>
              </div>

              {/* Interactive buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button
                  onClick={() => setActiveTab('home')}
                  className="flex-1 rounded-full bg-gold hover:bg-gold-hover text-bg-forest py-3 px-6 text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-1.5"
                >
                  <Home className="h-4 w-4" />
                  <span>The Sanctuary Main</span>
                </button>
                <button
                  onClick={handleBookAnother}
                  className="flex-1 rounded-full border border-gold/25 hover:border-gold text-gold py-3 px-6 text-xs font-semibold tracking-widest uppercase transition-colors text-center"
                >
                  Configure Another Slot
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
