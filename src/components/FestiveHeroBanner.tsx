import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Region } from '../types';
import { DiyaIcon, ModakAccent, FestivePatternBorder } from './FestiveMotif';
import { FestiveAtmosphereBackground } from './FestiveMotion';

interface FestiveHeroBannerProps {
  region: Region;
  festivalMode: boolean;
  onExploreFestive: () => void;
  onExploreGeneral: () => void;
}

export const FestiveHeroBanner: React.FC<FestiveHeroBannerProps> = ({
  region,
  festivalMode,
  onExploreFestive,
  onExploreGeneral,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If Festival Mode is ON and Region is India:
  if (festivalMode && region === 'IN') {
    return (
      <div className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F0] to-[#FFF4E5] border-b border-[#FDE68A]">
        {/* Subtle atmospheric ambient glow & gentle drifting marigold petals */}
        <FestiveAtmosphereBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Copy & CTAs with Staggered Entrance */}
            <div className="lg:col-span-7 space-y-5">
              {/* Campaign Eyebrow Badge */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/90 border border-[#FCD34D] shadow-xs text-xs text-[#92400E]"
              >
                <DiyaIcon className="w-4 h-4 text-[#D97706]" />
                <span className="font-semibold tracking-wide uppercase text-[11px]">
                  A Warm Festive Welcome • India
                </span>
                <span className="w-1 h-1 rounded-full bg-[#D97706]" />
                <span className="text-[#B45309]">Ganesh Chaturthi</span>
              </motion.div>

              {/* Primary Headline */}
              <motion.h1
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.2, 0, 0.2, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#202124] leading-[1.15]"
              >
                Ganesh Chaturthi <br className="hidden sm:inline" />
                <span className="text-[#B45309]">Festive Collection</span>
              </motion.h1>

              {/* Supporting text */}
              <motion.p
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.28, ease: [0.2, 0, 0.2, 1] }}
                className="text-base sm:text-lg text-[#5F6368] max-w-xl leading-relaxed"
              >
                Thoughtful gifts, everyday essentials, and festive favorites—curated with care for your celebrations across India.
              </motion.p>

              {/* Localized India trust factors */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.4, ease: [0.2, 0, 0.2, 1] }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-[#5F6368]"
              >
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-[#FDE68A]/60">
                  <Truck className="w-4 h-4 text-[#1A73E8] shrink-0" />
                  <span>Doorstep delivery check by PIN</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-[#FDE68A]/60">
                  <span className="font-bold text-[#188038] text-sm shrink-0">₹</span>
                  <span>Clear INR pricing & local GST</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-xs p-2 rounded-lg border border-[#FDE68A]/60 col-span-2 sm:col-span-1">
                  <ShieldCheck className="w-4 h-4 text-[#EA4335] shrink-0" />
                  <span>Thoughtfully curated Google gear</span>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.48, ease: [0.2, 0, 0.2, 1] }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <button
                  id="hero-explore-festive-btn"
                  onClick={onExploreFestive}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-medium text-sm rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <span>Explore Festive Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="hero-explore-all-btn"
                  onClick={onExploreGeneral}
                  className="inline-flex items-center space-x-2 px-5 py-3 bg-white hover:bg-[#F8F9FA] text-[#3C4043] font-medium text-sm rounded-full border border-[#DADCE0] transition-colors cursor-pointer"
                >
                  <span>Browse All Merchandise</span>
                </button>
              </motion.div>
            </div>

            {/* Right Visual Showcase with Minimal Festive Elements */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.52, ease: [0.2, 0, 0.2, 1] }}
              className="lg:col-span-5 relative flex justify-center"
            >
              <div className="relative w-full max-w-md">
                {/* Floating Festive Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-[#FDE68A] shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F1F3F4]">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-[#FEF3C7] flex items-center justify-center text-[#D97706]">
                        <DiyaIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-semibold text-[#92400E]">
                        Ganesh Chaturthi Festive Collection
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#188038] bg-[#E6F4EA] px-2 py-0.5 rounded-full">
                      Seasonal Campaign
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-[#F8F9FA] rounded-xl p-3 border border-[#E8EAED] text-center group hover:border-[#FCD34D] transition-colors">
                      <div className="h-28 flex items-center justify-center overflow-hidden rounded-lg mb-2 bg-white">
                        <img
                          src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=400&q=80"
                          alt="Google Chrome Eco Bottle"
                          className="h-full object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-xs font-semibold text-[#202124] line-clamp-1">Chrome Eco Bottle</div>
                      <div className="text-xs text-[#188038] font-bold mt-0.5">₹2,099</div>
                      <span className="text-[10px] text-[#B45309] font-medium block">Special Edition</span>
                    </div>

                    <div className="bg-[#F8F9FA] rounded-xl p-3 border border-[#E8EAED] text-center group hover:border-[#FCD34D] transition-colors">
                      <div className="h-28 flex items-center justify-center overflow-hidden rounded-lg mb-2 bg-white">
                        <img
                          src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80"
                          alt="Android Collectible"
                          className="h-full object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="text-xs font-semibold text-[#202124] line-clamp-1">Android Figurine</div>
                      <div className="text-xs text-[#188038] font-bold mt-0.5">₹1,299</div>
                      <span className="text-[10px] text-[#B45309] font-medium block">Festive Desk Mascot</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#F1F3F4] flex items-center justify-between text-[11px] text-[#5F6368]">
                    <span className="flex items-center gap-1">
                      <ModakAccent className="w-3.5 h-3.5 text-[#D97706]" />
                      <span>Eco-conscious festive packaging</span>
                    </span>
                    <span className="text-[#1A73E8] font-medium">Limited stock</span>
                  </div>
                </div>

                {/* Subtle festive accents behind card */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#FBBC04]/20 to-transparent rounded-full blur-xl -z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Delicate color ribbon at bottom */}
        <FestivePatternBorder className="h-1.5" />
      </div>
    );
  }

  // Standard Google Merchandise Store Hero (Control State / Normal Experience)
  return (
    <div className="relative overflow-hidden bg-[#F8F9FA] border-b border-[#E8EAED]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-[#DADCE0] text-xs text-[#5F6368]">
              <span className="w-2 h-2 rounded-full bg-[#1A73E8]" />
              <span className="font-medium">Thoughtfully Crafted • Google Merchandise</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#202124] leading-tight">
              Simple, sustainable, and made for your everyday.
            </h1>

            <p className="text-base sm:text-lg text-[#5F6368] max-w-xl">
              Explore certified organic apparel, reusable drinkware, and mindful tech essentials from Google—designed with care for your day.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="hero-explore-control-btn"
                onClick={onExploreGeneral}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-medium text-sm rounded-full shadow-xs transition-colors cursor-pointer"
              >
                <span>Shop All Merchandise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative bg-white p-4 rounded-2xl border border-[#E8EAED] shadow-xs max-w-sm w-full">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-[#F1F3F4] flex items-center justify-center mb-3">
                <img
                  src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
                  alt="Google Campus Commuter Backpack"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-[#202124]">Google Campus Commuter Pack</div>
                  <div className="text-[#5F6368]">Crafted from 24 recycled bottles</div>
                </div>
                <div className="font-bold text-[#202124] text-sm">
                  {region === 'IN' ? '₹4,499' : '$59.00'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
