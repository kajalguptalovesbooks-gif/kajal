import React from 'react';
import { Users, Heart, Briefcase, Sparkles, ArrowRight, X, Check } from 'lucide-react';
import { Occasion, Product, Region } from '../types';

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
  const occasionConfigs: OccasionCardConfig[] = [
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
      // Toggle off if already selected
      onSelectOccasion('All');
    } else {
      onSelectOccasion(occ);
    }

    // Smoothly scroll down to catalogue so user sees filtered items
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 60);
  };

  const getOccasionCount = (occ: Occasion) => {
    return products.filter((p) => p.occasions && p.occasions.includes(occ as any)).length;
  };

  return (
    <section id="shop-by-occasion" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[#1A73E8] uppercase tracking-wider mb-1">
            <span>Occasion-Based Gifting</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
            Shop by Occasion
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6368] mt-1 max-w-2xl leading-relaxed">
            Curated merchandise selections designed for festive visits, family dinner hosting, office teams, and everyday personal essentials.
          </p>
        </div>

        {selectedOccasion !== 'All' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5F6368]">
              Active filter: <strong className="text-[#202124]">{selectedOccasion}</strong>
            </span>
            <button
              onClick={() => onSelectOccasion('All')}
              className="inline-flex items-center space-x-1 text-xs px-2.5 py-1 rounded-full bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3C4043] font-medium transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Clear Filter</span>
            </button>
          </div>
        )}
      </div>

      {/* 4 Responsive Occasion Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {occasionConfigs.map((occ) => {
          const isSelected = selectedOccasion === occ.id;
          const count = getOccasionCount(occ.id);

          return (
            <div
              key={occ.id}
              onClick={() => handleCardClick(occ.id)}
              className={`group relative rounded-2xl p-5 border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-[#1A73E8] bg-white ring-2 ring-[#1A73E8]/20 shadow-md scale-[1.01]'
                  : 'border-[#E8EAED] bg-white hover:border-[#BDC1C6] hover:shadow-sm'
              }`}
            >
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
                  isSelected ? 'text-[#1A73E8]' : 'text-[#5F6368] group-hover:text-[#1A73E8]'
                }`}>
                  {isSelected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1A73E8]" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
