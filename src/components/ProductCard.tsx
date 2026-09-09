import React from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { Product, Region } from '../types';
import { DiyaIcon } from './FestiveMotif';

interface ProductCardProps {
  product: Product;
  region: Region;
  festivalMode: boolean;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  isAddedJustNow?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  region,
  festivalMode,
  onSelect,
  onQuickAdd,
  isAddedJustNow = false,
}) => {
  const showFestiveHighlight = festivalMode && region === 'IN' && product.isFestivePick;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-md cursor-pointer flex flex-col overflow-hidden ${
        showFestiveHighlight
          ? 'border-[#FDE68A] hover:border-[#F59E0B]/60'
          : 'border-[#E8EAED] hover:border-[#DADCE0]'
      }`}
    >
      {/* Badges / Festive Tag Bar */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start pointer-events-none">
        {showFestiveHighlight && (
          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] shadow-2xs">
            <DiyaIcon className="w-3 h-3 text-[#D97706]" />
            <span>{product.festiveTag || 'Festive Pick'}</span>
          </span>
        )}
        {product.badge && !showFestiveHighlight && (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F8F9FA] flex items-center justify-center p-6">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-[#5F6368] mb-1">
            <span className="tracking-wide uppercase text-[10px] font-semibold">{product.category}</span>
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
              <span className="font-semibold text-[#202124]">{product.rating}</span>
              <span className="text-[#80868B]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-medium text-sm sm:text-base text-[#202124] group-hover:text-[#1A73E8] transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Festive contextual recommendation when active */}
          {showFestiveHighlight && product.festiveHighlight && (
            <p className="mt-1.5 text-[11px] text-[#B45309] line-clamp-1">
              ✨ {product.festiveHighlight}
            </p>
          )}
        </div>

        {/* Pricing and Action */}
        <div className="pt-2 border-t border-[#F1F3F4] flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-[#202124]">
              {region === 'IN' ? (
                <span>₹{product.priceINR.toLocaleString('en-IN')}</span>
              ) : (
                <span>${product.priceUSD.toFixed(2)}</span>
              )}
            </div>
            {region === 'IN' && (
              <span className="text-[10px] text-[#188038] font-medium flex items-center gap-0.5">
                Doorstep delivery available
              </span>
            )}
          </div>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={(e) => onQuickAdd(product, e)}
            className={`inline-flex items-center justify-center p-2.5 rounded-full transition-all cursor-pointer ${
              isAddedJustNow
                ? 'bg-[#E6F4EA] text-[#188038] border border-[#34A853]'
                : 'bg-[#F1F3F4] text-[#202124] hover:bg-[#1A73E8] hover:text-white border border-transparent shadow-2xs'
            }`}
            title="Quick add to cart"
          >
            {isAddedJustNow ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
