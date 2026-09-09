import React, { useState, useMemo } from 'react';
import { ArrowUpDown, SlidersHorizontal, X, Sparkles, Tag, Check, Filter } from 'lucide-react';
import { Product, Category, Region, Occasion, PriceFilter } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListingProps {
  products: Product[];
  region: Region;
  festivalMode: boolean;
  selectedCategory: Category;
  onSelectCategory: (c: Category) => void;
  selectedOccasion: Occasion;
  onSelectOccasion: (o: Occasion) => void;
  selectedPriceFilter: PriceFilter;
  onSelectPriceFilter: (p: PriceFilter) => void;
  searchQuery: string;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product, e: React.MouseEvent) => void;
  justAddedId: string | null;
}

export const ProductListing: React.FC<ProductListingProps> = ({
  products,
  region,
  festivalMode,
  selectedCategory,
  onSelectCategory,
  selectedOccasion,
  onSelectOccasion,
  selectedPriceFilter,
  onSelectPriceFilter,
  searchQuery,
  onSelectProduct,
  onQuickAdd,
  justAddedId,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories: Category[] = ['All', 'Apparel', 'Drinkware', 'Bags & Lifestyle', 'Accessories'];

  const occasions: { id: Occasion; label: string; icon?: string }[] = [
    { id: 'All', label: 'All Occasions' },
    { id: 'Family', label: 'For Family', icon: '👨‍👩‍👧' },
    { id: 'Friends', label: 'For Friends', icon: '🤝' },
    { id: 'Work', label: 'For Work', icon: '💼' },
    { id: 'Yourself', label: 'For Yourself', icon: '✨' },
  ];

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      All: products.length,
      Apparel: 0,
      Drinkware: 0,
      'Bags & Lifestyle': 0,
      Accessories: 0,
    };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      }
    });
    return counts;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

        // Search filter
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.festiveTag && p.festiveTag.toLowerCase().includes(searchQuery.toLowerCase()));

        // In Stock filter
        const matchesStock = !inStockOnly || p.inStock;

        // Occasion filter (Priority 3)
        const matchesOccasion =
          selectedOccasion === 'All' ||
          (p.occasions && p.occasions.includes(selectedOccasion as any));

        // Price Filter (Priority 2 & 4)
        let matchesPrice = true;
        if (selectedPriceFilter === 'under-1000') {
          matchesPrice = region === 'IN' ? p.priceINR < 1000 : p.priceUSD < 15;
        } else if (selectedPriceFilter === 'under-1500') {
          matchesPrice = region === 'IN' ? p.priceINR < 1500 : p.priceUSD < 20;
        } else if (selectedPriceFilter === 'under-2500') {
          matchesPrice = region === 'IN' ? p.priceINR >= 1500 && p.priceINR < 2500 : p.priceUSD >= 20 && p.priceUSD < 35;
        } else if (selectedPriceFilter === 'above-2500') {
          matchesPrice = region === 'IN' ? p.priceINR >= 2500 : p.priceUSD >= 35;
        }

        return matchesCategory && matchesSearch && matchesStock && matchesOccasion && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return region === 'IN' ? a.priceINR - b.priceINR : a.priceUSD - b.priceUSD;
        }
        if (sortBy === 'price-desc') {
          return region === 'IN' ? b.priceINR - a.priceINR : b.priceUSD - a.priceUSD;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        return 0; // featured default
      });
  }, [products, selectedCategory, searchQuery, inStockOnly, selectedOccasion, selectedPriceFilter, sortBy, region]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedOccasion !== 'All' ||
    selectedPriceFilter !== 'all' ||
    inStockOnly ||
    Boolean(searchQuery);

  const resetAllFilters = () => {
    onSelectCategory('All');
    onSelectOccasion('All');
    onSelectPriceFilter('all');
    setInStockOnly(false);
  };

  return (
    <section id="catalog" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Category Navigation Bar (Priority 1 Core User Journey) */}
      <div className="mb-6">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5F6368]">
            Browse by Category
          </h2>
          <span className="text-xs text-[#70757A]">
            Showing {filteredProducts.length} of {products.length} items
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const count = categoryCounts[cat] || 0;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`catalog-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectCategory(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#202124] text-white shadow-sm ring-2 ring-[#202124]/20'
                    : 'bg-white text-[#3C4043] border border-[#DADCE0] hover:bg-[#F8F9FA] hover:border-[#BDC1C6]'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#F1F3F4] text-[#5F6368]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-Filters: Occasions & Price Groupings */}
      <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-[#E8EAED] space-y-3.5 mb-8">
        {/* Row 1: Shop by Occasion (Priority 3 Festive Experience) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#202124] shrink-0 min-w-[130px]">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Shop by Occasion:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {occasions.map((occ) => {
              const isSelected = selectedOccasion === occ.id;
              return (
                <button
                  key={occ.id}
                  onClick={() => onSelectOccasion(occ.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8] font-semibold'
                      : 'bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-white hover:text-[#202124]'
                  }`}
                >
                  {occ.icon && <span>{occ.icon}</span>}
                  <span>{occ.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 2: Price Value Groupings (Priority 2 India Localisation) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2 border-t border-[#E8EAED]/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#202124] shrink-0 min-w-[130px]">
            <Tag className="w-3.5 h-3.5 text-[#188038]" />
            <span>Price Range ({region === 'IN' ? 'INR ₹' : 'USD $'}):</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under-1000', label: region === 'IN' ? 'Under ₹1,000' : 'Under $15' },
              { id: 'under-1500', label: region === 'IN' ? 'Under ₹1,500' : 'Under $20' },
              { id: 'under-2500', label: region === 'IN' ? '₹1,500 - ₹2,500' : '$20 - $35' },
              { id: 'above-2500', label: region === 'IN' ? '₹2,500 & Above' : '$35 & Above' },
            ].map((p) => {
              const isSelected = selectedPriceFilter === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPriceFilter(p.id as PriceFilter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E6F4EA] text-[#137333] border border-[#137333] font-semibold'
                      : 'bg-white text-[#5F6368] border border-[#DADCE0] hover:bg-white hover:text-[#202124]'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Title & Sorting Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E8EAED] gap-3">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#202124] flex items-center gap-2">
            <span>{selectedCategory === 'All' ? 'All Google Merchandise' : selectedCategory}</span>
            {selectedCategory !== 'All' && (
              <span className="text-sm font-normal text-[#5F6368]">
                ({filteredProducts.length} items)
              </span>
            )}
          </h3>
          <p className="text-xs text-[#5F6368] mt-0.5">
            {region === 'IN'
              ? '🇮🇳 Localized India Store • Clear INR pricing & inclusive GST'
              : 'Authentic Google Merchandise Store'}
          </p>
        </div>

        {/* Filter and Sort options */}
        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* In Stock toggle */}
          <label className="inline-flex items-center space-x-1.5 text-xs font-medium text-[#3C4043] cursor-pointer bg-white px-3 py-2 rounded-lg border border-[#DADCE0] hover:bg-[#F8F9FA] transition-colors">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-[#1A73E8] focus:ring-[#1A73E8] w-3.5 h-3.5"
            />
            <span>Show in-stock only</span>
          </label>

          {/* Sort dropdown */}
          <div className="flex items-center space-x-1.5 bg-white px-3 py-2 rounded-lg border border-[#DADCE0] text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5F6368]" />
            <span className="text-[#70757A] hidden md:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-[#202124] outline-hidden cursor-pointer"
            >
              <option value="featured">Featured favorites</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="rating">Highest customer rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-3">
          <span className="text-xs font-semibold text-[#5F6368]">Applied filters:</span>

          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#202124] text-white rounded-full text-xs font-medium">
              <span>Category: {selectedCategory}</span>
              <button onClick={() => onSelectCategory('All')} className="hover:text-[#EA4335] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedOccasion !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8F0FE] text-[#1A73E8] border border-[#1A73E8]/30 rounded-full text-xs font-medium">
              <span>Occasion: {selectedOccasion}</span>
              <button onClick={() => onSelectOccasion('All')} className="hover:text-[#EA4335] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedPriceFilter !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E6F4EA] text-[#137333] border border-[#137333]/30 rounded-full text-xs font-medium">
              <span>
                Price:{' '}
                {selectedPriceFilter === 'under-1000'
                  ? (region === 'IN' ? 'Under ₹1,000' : 'Under $15')
                  : selectedPriceFilter === 'under-1500'
                  ? (region === 'IN' ? 'Under ₹1,500' : 'Under $20')
                  : selectedPriceFilter === 'under-2500'
                  ? (region === 'IN' ? '₹1,500 - ₹2,500' : '$20 - $35')
                  : (region === 'IN' ? '₹2,500+' : '$35+')}
              </span>
              <button onClick={() => onSelectPriceFilter('all')} className="hover:text-[#EA4335] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FEF7E0] text-[#B06000] border border-[#B06000]/30 rounded-full text-xs font-medium">
              <span>"{searchQuery}"</span>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F1F3F4] text-[#3C4043] rounded-full text-xs font-medium">
              <span>In Stock Only</span>
              <button onClick={() => setInStockOnly(false)} className="hover:text-[#EA4335] cursor-pointer">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetAllFilters}
            className="text-xs text-[#1A73E8] hover:underline font-medium cursor-pointer ml-1"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((product) => (
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
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8EAED] mt-8 p-8 shadow-xs">
          <div className="w-12 h-12 rounded-full bg-[#F1F3F4] flex items-center justify-center mx-auto text-[#5F6368] mb-3">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#202124]">We couldn't find any products matching your filters</h3>
          <p className="text-xs text-[#5F6368] mt-1 max-w-sm mx-auto leading-relaxed">
            {selectedCategory !== 'All'
              ? `No items found in "${selectedCategory}" with the active filters.`
              : 'Don’t worry—try clearing a few filters or exploring a different category to see more Google gear.'}
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-[#1A73E8] hover:bg-[#1765CC] text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => onSelectCategory('All')}
                className="px-4 py-2 bg-[#F1F3F4] hover:bg-[#E8EAED] text-[#3C4043] text-xs font-medium rounded-full transition-colors cursor-pointer"
              >
                View All Categories
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
