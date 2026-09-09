import React, { useState } from 'react';
import { Users, Heart, Briefcase, Sparkles, ArrowRight, X, Check } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Occasion, Product, Region } from '../types';
import { MarigoldPetalSvg } from './FestiveMotion';

interface ShopByOccasionProps {
  products: Product[];
  region: Region;
  selectedOccasion: Occasion;
  onSelectOccasion: (occasion: Occasion) => void;
}

interface OccasionCardConfig {
  id: Occasion;
  title: string;
  badge: string;
  subtitle: string;
  icon: React.ReactNode;
  sampleItems: string;
  colorClass: string;
  borderClass: string;
}

export const ShopByOccasion: React.FC<ShopByOccasionProps> = ({
  products,
  region,
  selectedOccasion,
  onSelectOccasion,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [sparkleId, setSparkleId] = useState<Occasion | null>(null);

  // Re-ordered per prompt: For Friends, For Family, For Work, For Yourself
  const occasionConfigs: OccasionCardConfig[] = [
    {
      id: 'Friends',
      title: 'For Friends',
      badge: 'Gifting & Memories',
      subtitle: 'Playful desk collectibles, holiday gifts, and lightweight travel totes.',
      icon: <Heart className="w-5 h-5 text-[#EA4335]" />,
      sampleItems: 'Android Mascot, Canvas Tote, Tech Pouch',
      colorClass: 'bg-[#FEF7E0]',
      borderClass: 'border-[#FEEFC3]',
    },
    {
      id: 'Family',
      title: 'For Family',
      badge: 'Home & Dining',
      subtitle: 'Festive gatherings, home dining, and sharing warm tea moments with loved ones.',
      icon: <Users className="w-5 h-5 text-[#D97706]" />,
      sampleItems: 'Coasters, Mugs, Reusable Bottles',
      colorClass: 'bg-[#FFFBEB]',
      borderClass: 'border-[#FDE68A]',
    },
    {
      id: 'Work',
      title: 'For Work',
      badge: 'Productivity & Commute',
      subtitle: 'Commuter backpacks, bamboo journals, and clean cable organizers for office or remote setup.',
      icon: <Briefcase className="w-5 h-5 text-[#1A73E8]" />,
      sampleItems: 'Commuter Pack, Tech Pouch, Journal Set',
      colorClass: 'bg-[#E8F0FE]',
      borderClass: 'border-[#D2E3FC]',
    },
    {
      id: 'Yourself',
      title: 'For Yourself',
      badge: 'Personal Essentials',
      subtitle: 'Organic cotton tees, heavy terry hoodies, and daily hydration gear for your everyday comfort.',
      icon: <Sparkles className="w-5 h-5 text-[#188038]" />,
      sampleItems: 'Organic Tee, Zip Hoodie, Tumbler',
      colorClass: 'bg-[#E6F4EA]',
      borderClass: 'border-[#CEEAD6]',
    },
  ];

  const handleCardClick = (occ: Occasion) => {
    if (selectedOccasion === occ) {
      onSelectOccasion('All');
    } else {
      onSelectOccasion(occ);
      setSparkleId(occ);
      setTimeout(() => setSparkleId(null), 650);
    }

    // Smoothly scroll down to catalogue so user sees updated journey
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 80);
  };

  const getOccasionCount = (occ: Occasion) => {
    return products.filter((p) => p.occasions && p.occasions.includes(occ as any)).length;
  };

  return (
    <section id="shop-by-occasion" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1A73E8] uppercase tracking-wider mb-1">
            <span>Thoughtful Gifting</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1 max-w-2xl leading-relaxed">
            Whether you are visiting dear friends, sharing festive moments with family, heading to work, or simply treating yourself—we have something nice waiting for you.
          </p>
        </div>

        {selectedOccasion !== 'All' ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#B45309] font-medium bg-[#FEF3C7] px-2.5 py-1 rounded-full border border-[#FCD34D] flex items-center gap-1.5 animate-in fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] animate-pulse" />
              <span>Tailored for you: <strong>{selectedOccasion}</strong></span>
            </span>
            <button
              onClick={() => onSelectOccasion('All')}
              className="inline-flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3C4043] font-medium transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Show all</span>
            </button>
          </div>
        ) : (
          <span className="text-xs text-[#70757A]">Choose who you are shopping for to personalize your view</span>
        )}
      </div>

      {/* 4 Responsive Occasion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {occasionConfigs.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          const count = getOccasionCount(occ.id);
          const isSparkling = sparkleId === occ.id;

          return (
            <motion.div
              key={occ.id}
              onClick={() => handleCardClick(occ.id)}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: isSelected ? -4 : 0,
                    }
              }
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`group relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden ${
                isSelected
                  ? 'border-[#F59E0B] bg-gradient-to-b from-white to-[#FFFDF9] ring-2 ring-[#FBBC04]/60 shadow-md'
                  : 'border-[#E8EAED] bg-white hover:border-[#BDC1C6] hover:shadow-sm'
              }`}
            >
              {/* Tiny festive particle transition when selected */}
              <AnimatePresence>
                {isSparkling && !shouldReduceMotion && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-2 -right-2 pointer-events-none"
                  >
                    <div className="relative w-12 h-12">
                      <motion.div
                        animate={{ x: [0, 8], y: [0, -8], opacity: [1, 0] }}
                        transition={{ duration: 0.5 }}
                        className="absolute top-2 right-2"
                      >
                        <MarigoldPetalSvg size={10} shade="warm-gold" opacity={0.8} />
                      </motion.div>
                      <motion.div
                        animate={{ x: [0, -6], y: [0, -10], opacity: [1, 0] }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="absolute top-4 right-4"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FBBC04] shadow-xs" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                {/* Header: Icon + Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div className={`w-10 h-10 rounded-xl ${occ.colorClass} border ${occ.borderClass} flex items-center justify-center shrink-0 shadow-2xs`}>
                    {occ.icon}
                  </div>
                  <span className="text-[11px] font-medium text-[#70757A] bg-[#F8F9FA] px-2 py-0.5 rounded-full border border-[#E8EAED]">
                    {occ.badge}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-[#202124] group-hover:text-[#1A73E8] transition-colors">
                    {occ.title}
                  </h3>
                  <span className="text-xs font-semibold text-[#5F6368]">
                    {count} {count === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <p className="text-xs text-[#5F6368] mt-1.5 line-clamp-2 leading-relaxed">
                  {occ.subtitle}
                </p>
              </div>

              {/* Sample gear preview & action footer */}
              <div className="mt-4 pt-3 border-t border-[#F1F3F4] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#70757A] truncate max-w-[170px]">
                  {occ.sampleItems}
                </span>

                <div className={`flex items-center gap-1 font-semibold text-xs ${
                  isSelected ? 'text-[#B45309]' : 'text-[#5F6368] group-hover:text-[#1A73E8]'
                }`}>
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Selected</span>
                    </>
                  ) : (
                    <>
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
