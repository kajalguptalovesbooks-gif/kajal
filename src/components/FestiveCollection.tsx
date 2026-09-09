import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Product, Region } from '../types';
import { ProductCard } from './ProductCard';
import { DiyaIcon } from './FestiveMotif';
import { ScrollRevealPetals } from './FestiveMotion';

interface FestiveCollectionProps {
  products: Product[];
  region: Region;
  festivalMode: boolean;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  justAddedId: string | null;
}

export const FestiveCollection: React.FC<FestiveCollectionProps> = ({
  products,
  region,
  festivalMode,
  onSelectProduct,
  onQuickAdd,
  justAddedId,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const festiveProducts = products.filter((p) => p.isFestivePick);

  if (!festivalMode || region !== 'IN') {
    return null;
  }

  return (
    <section id="festive-picks" className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] to-white border-b border-[#FDE68A]/50 overflow-hidden">
      {/* Scroll-triggered gentle drifting petals into the section */}
      <ScrollRevealPetals />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with subtle natural appearance */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4"
        >
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#B45309] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FCD34D] mb-2.5">
              <DiyaIcon className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Limited Festive Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
              Ganesh Chaturthi Picks
            </h2>
            <p className="text-sm text-[#5F6368] mt-1.5 max-w-2xl">
              Curated everyday merchandise selected for festive gifting, eco-friendly celebration, and personal workspaces during the festival season.
            </p>

            {/* Festive accent line draws in smoothly */}
            {!shouldReduceMotion && (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="h-0.5 w-24 bg-gradient-to-r from-[#FBBC04] via-[#F59E0B] to-transparent mt-3 origin-left rounded-full"
              />
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs font-medium text-[#70757A]">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span>Festive gifting selection</span>
          </div>
        </motion.div>

        {/* Festive Product Grid with staggered scroll entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {festiveProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: shouldReduceMotion ? 0 : idx * 0.08,
                ease: 'easeOut',
              }}
            >
              <ProductCard
                product={product}
                region={region}
                festivalMode={festivalMode}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isAddedJustNow={justAddedId === product.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
