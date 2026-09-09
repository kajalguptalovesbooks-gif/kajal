import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown, SlidersHorizontal, Check } from 'lucide-react';
import { Product, Category, Region } from '../types';
import { ProductCard } from './ProductCard';

interface ProductListingProps {
  products: Product[];
  region: Region;
  festivalMode: boolean;
  selectedCategory: Category;
  onSelectCategory: (c: Category) => void;
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
  searchQuery,
  onSelectProduct,
  onQuickAdd,
  justAddedId,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStock = !inStockOnly || p.inStock;
        return matchesCategory && matchesSearch && matchesStock;
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
  }, [products, selectedCategory, searchQuery, inStockOnly, sortBy, region]);

  return (
    <section id="catalog" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title and Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#E8EAED] gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#202124]">
            {selectedCategory === 'All' ? 'Official Google Merchandise' : selectedCategory}
          </h2>
          <p className="text-sm text-[#5F6368] mt-1">
            Showing {filteredProducts.length} items {searchQuery && `matching "${searchQuery}"`}
            {region === 'IN' ? ' • Prices shown in Indian Rupees (INR ₹)' : ' • Prices shown in USD ($)'}
          </p>
        </div>

        {/* Filter and Sort bar */}
        <div className="flex flex-wrap items-center gap-3">
          {/* In Stock toggle */}
          <label className="inline-flex items-center space-x-2 text-xs font-medium text-[#3C4043] cursor-pointer bg-white px-3 py-2 rounded-lg border border-[#DADCE0] hover:bg-[#F8F9FA] transition-colors">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="rounded text-[#1A73E8] focus:ring-[#1A73E8]"
            />
            <span>In stock only</span>
          </label>

          {/* Sort selector */}
          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-[#DADCE0] text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#5F6368]" />
            <span className="text-[#70757A] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-medium text-[#202124] outline-hidden cursor-pointer"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
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
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E8EAED] mt-8 p-8">
          <div className="w-12 h-12 rounded-full bg-[#F1F3F4] flex items-center justify-center mx-auto text-[#5F6368] mb-3">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-[#202124]">No products match your filters</h3>
          <p className="text-xs text-[#5F6368] mt-1 max-w-sm mx-auto">
            Try resetting your search query or selecting a different merchandise category.
          </p>
          <button
            onClick={() => {
              onSelectCategory('All');
            }}
            className="mt-4 px-4 py-2 bg-[#1A73E8] text-white text-xs font-medium rounded-full hover:bg-[#1765CC]"
          >
            Show All Merchandise
          </button>
        </div>
      )}
    </section>
  );
};
