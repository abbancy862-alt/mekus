import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import MenuView from './components/MenuView';
import ReservationsView from './components/ReservationsView';
import GalleryView from './components/GalleryView';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [prefilledDishName, setPrefilledDishName] = useState<string>('');

  // Scroll to top on tab change for sleek premium feel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const handleSelectDishForReservation = (dishName: string) => {
    setPrefilledDishName(dishName);
    setActiveTab('reservations');
  };

  const handleQuickBookItem = (dishName: string) => {
    setPrefilledDishName(dishName);
    setActiveTab('reservations');
  };

  const handleClearPrefilledDish = () => {
    setPrefilledDishName('');
  };

  // Render proper sub-component
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            onQuickBookItem={handleQuickBookItem} 
          />
        );
      case 'menu':
        return (
          <MenuView 
            setActiveTab={setActiveTab} 
            onSelectDishForReservation={handleSelectDishForReservation} 
          />
        );
      case 'reservations':
        return (
          <ReservationsView 
            prefilledDishName={prefilledDishName}
            onClearPrefilledDish={handleClearPrefilledDish}
            setActiveTab={setActiveTab}
          />
        );
      case 'gallery':
        return <GalleryView setActiveTab={setActiveTab} />;
      default:
        return (
          <HomeView 
            setActiveTab={setActiveTab} 
            onQuickBookItem={handleQuickBookItem} 
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-forest font-sans antialiased text-text-light selection:bg-gold selection:text-bg-forest">
      {/* 1. Translucent Global Header Customizer */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuickReserve={() => {
          setPrefilledDishName('');
          setActiveTab('reservations');
        }}
      />

      {/* 2. Page Content Slider Animating Canvas */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Global Linked Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
