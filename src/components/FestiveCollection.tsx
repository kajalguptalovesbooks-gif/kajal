import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product, Region } from '../types';
import { ProductCard } from './ProductCard';
import { DiyaIcon } from './FestiveMotif';

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
  const festiveProducts = products.filter((p) => p.isFestivePick);

  if (!festivalMode || region !== 'IN') {
    return null;
  }

  return (
    <section id="festive-picks" className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFFDF9] to-white border-b border-[#FDE68A]/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-[#B45309] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FCD34D] mb-2.5">
              <DiyaIcon className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Limited Campaign Edit</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
              Ganesh Chaturthi Picks
            </h2>
            <p className="text-sm text-[#5F6368] mt-1.5 max-w-2xl">
              Curated everyday merchandise selected for festive gifting, eco-friendly celebration, and personal workspaces during the festival season.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-medium text-[#70757A]">
            <span className="w-2 h-2 rounded-full bg-[#D97706]" />
            <span>Festive gifting selection</span>
          </div>
        </div>

        {/* Festive Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {festiveProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              region={region}
              festivalMode={festivalMode}
              onSelect={onSelectProduct}
              onQuickAdd={onQuickAdd}
              isAddedJustNow={justAddedId === product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
