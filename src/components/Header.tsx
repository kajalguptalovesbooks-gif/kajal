import React, { useState } from 'react';
import { ShoppingBag, Search, Sparkles, Globe, SlidersHorizontal, BarChart3, X } from 'lucide-react';
import { Category, Region } from '../types';
import { DiyaIcon } from './FestiveMotif';

interface HeaderProps {
  region: Region;
  onRegionChange: (r: Region) => void;
  festivalMode: boolean;
  onToggleFestivalMode: () => void;
  selectedCategory: Category;
  onSelectCategory: (c: Category) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenExperiment: () => void;
  cartPulse?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  region,
  onRegionChange,
  festivalMode,
  onToggleFestivalMode: _onToggleFestivalMode,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenExperiment: _onOpenExperiment,
  cartPulse = false,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  const categories: Category[] = ['All', 'Apparel', 'Drinkware', 'Bags & Lifestyle', 'Accessories'];

  const handleCategoryClick = (cat: Category) => {
    onSelectCategory(cat);
    // Smoothly scroll down to catalog so user instantly sees filtered results
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleFestivePicksClick = () => {
    const el = document.getElementById('festive-picks');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8EAED] shadow-xs">
      {/* Top Customer Announcement & Currency/Country Bar */}
      <div
        className={`text-xs py-2 px-4 transition-colors duration-300 ${
          festivalMode && region === 'IN'
            ? 'bg-gradient-to-r from-[#FFF8E1] via-[#FFFDE7] to-[#FFF3E0] text-[#795548] border-b border-[#FFE082]'
            : 'bg-[#F8F9FA] text-[#5F6368] border-b border-[#E8EAED]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Announcement Message */}
          <div className="flex items-center space-x-2 truncate">
            {festivalMode && region === 'IN' ? (
              <>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FBBC04]/25 text-[#D97706] shrink-0">
                  <DiyaIcon className="w-3.5 h-3.5" />
                </span>
                <span className="font-semibold text-[#B45309]">
                  Happy Ganesh Chaturthi!
                </span>
                <span className="hidden sm:inline truncate text-[#5F6368]">
                  Celebrating with festive picks, friendly INR pricing & doorstep delivery estimates across India.
                </span>
                <span className="sm:hidden text-xs truncate text-[#5F6368]">
                  Festive India Concept
                </span>
              </>
            ) : (
              <span className="truncate">
                Welcome to the Google Merchandise Store • Sustainable apparel, drinkware & everyday tech essentials
              </span>
            )}
          </div>

          {/* Customer Locale Switcher (India / Global) */}
          <div className="relative shrink-0 text-[11px]">
            <button
              id="region-selector-btn"
              onClick={() => setShowRegionDropdown(!showRegionDropdown)}
              className="inline-flex items-center space-x-1.5 font-medium text-[#3C4043] hover:text-[#202124] bg-white/90 hover:bg-white px-2.5 py-1 rounded-full border border-[#DADCE0] transition-all cursor-pointer shadow-2xs"
              title="Change Delivery Country / Currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#1A73E8]" />
              <span>{region === 'IN' ? '🇮🇳 India (INR ₹)' : '🇺🇸 Global (USD $)'}</span>
            </button>

            {showRegionDropdown && (
              <div className="absolute right-0 mt-1.5 w-56 bg-white rounded-xl shadow-xl border border-[#DADCE0] py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#70757A] font-bold">
                  Delivery Destination
                </div>
                <button
                  onClick={() => {
                    onRegionChange('IN');
                    setShowRegionDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-[#F8F9FA] transition-colors cursor-pointer ${
                    region === 'IN' ? 'bg-[#E8F0FE] text-[#1A73E8] font-semibold' : 'text-[#3C4043]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇮🇳</span>
                    <span>India (INR ₹)</span>
                  </span>
                  {region === 'IN' && <span className="text-[10px] font-bold text-[#1A73E8]">CURRENT</span>}
                </button>
                <button
                  onClick={() => {
                    onRegionChange('US');
                    setShowRegionDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-[#F8F9FA] transition-colors cursor-pointer ${
                    region === 'US' ? 'bg-[#E8F0FE] text-[#1A73E8] font-semibold' : 'text-[#3C4043]'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">🇺🇸</span>
                    <span>United States (USD $)</span>
                  </span>
                  {region === 'US' && <span className="text-[10px] font-bold text-[#1A73E8]">CURRENT</span>}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleCategoryClick('All')}
              className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-hidden"
              title="Google Merchandise Store Home"
            >
              {/* Google G Logo */}
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-xs border border-[#E8EAED] group-hover:shadow-sm transition-shadow">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.36 24 12 24z"
                  />
                  <path
                    fill="#FBBC04"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-base font-semibold tracking-tight text-[#202124] flex items-center gap-1.5">
                  <span>Google</span>
                  <span className="text-[#5F6368] font-normal text-sm">Merchandise Store</span>
                  {region === 'IN' && (
                    <span className="text-[10px] font-bold bg-[#E8F0FE] text-[#1A73E8] px-1.5 py-0.5 rounded border border-[#D2E3FC]">
                      India Prototype
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#202124] text-white shadow-xs'
                    : 'text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4]'
                }`}
              >
                {cat}
              </button>
            ))}

            {/* Special Ganesh Chaturthi Nav link when active */}
            {festivalMode && region === 'IN' && (
              <button
                onClick={handleFestivePicksClick}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-sm font-semibold text-[#B45309] bg-[#FEF3C7] hover:bg-[#FDE68A] rounded-full border border-[#F59E0B]/40 transition-colors cursor-pointer"
              >
                <DiyaIcon className="w-4 h-4 text-[#D97706]" />
                <span>Festive Picks</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls (Search & Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Toggle / Bar */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-[#F1F3F4] rounded-full px-3 py-1.5 w-48 sm:w-64 border border-transparent focus-within:border-[#1A73E8] focus-within:bg-white focus-within:shadow-xs transition-all">
                  <Search className="w-4 h-4 text-[#5F6368] shrink-0 mr-2" />
                  <input
                    type="text"
                    placeholder="Search tees, bottles, bags, or festive gifts..."
                    value={searchQuery}
                    onChange={(e) => {
                      onSearchChange(e.target.value);
                      if (e.target.value) {
                        const el = document.getElementById('catalog');
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.scrollY - 80;
                          window.scrollTo({ top, behavior: 'smooth' });
                        }
                      }
                    }}
                    autoFocus
                    className="w-full text-xs sm:text-sm bg-transparent border-none outline-hidden text-[#202124] placeholder-[#80868B]"
                  />
                  {searchQuery && (
                    <button onClick={() => onSearchChange('')} className="p-0.5 hover:text-[#202124] text-[#80868B] cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowSearch(false)}
                    className="ml-1 text-xs text-[#5F6368] hover:text-[#202124] cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <button
                  id="search-toggle-btn"
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors cursor-pointer"
                  title="Search merchandise"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className={`relative p-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-all duration-300 cursor-pointer ${
                cartPulse
                  ? 'ring-2 ring-[#FBBC04] bg-[#FFF8E1] scale-110 shadow-xs'
                  : ''
              }`}
              title="View Cart"
            >
              <ShoppingBag className={`w-5 h-5 transition-transform duration-300 ${cartPulse ? 'text-[#B45309] scale-110' : ''}`} />
              {cartCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 flex items-center justify-center text-[11px] font-bold text-white bg-[#1A73E8] rounded-full border-2 border-white shadow-xs transition-transform duration-300 ${
                  cartPulse ? 'scale-125 bg-[#D97706]' : 'scale-100'
                }`}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Category Row with min 44px touch targets */}
        <div className="lg:hidden flex items-center space-x-1.5 py-2.5 overflow-x-auto no-scrollbar border-t border-[#F1F3F4]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs font-medium rounded-full shrink-0 transition-colors cursor-pointer flex items-center ${
                selectedCategory === cat
                  ? 'bg-[#202124] text-white'
                  : 'text-[#5F6368] bg-[#F1F3F4] hover:bg-[#E8EAED]'
              }`}
            >
              {cat}
            </button>
          ))}
          {festivalMode && region === 'IN' && (
            <button
              onClick={handleFestivePicksClick}
              className="min-h-[38px] px-3.5 py-1.5 text-xs font-semibold text-[#B45309] bg-[#FEF3C7] rounded-full shrink-0 border border-[#F59E0B]/40 flex items-center gap-1.5 cursor-pointer"
            >
              <DiyaIcon className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Festive Picks</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
