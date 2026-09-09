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
}

export const Header: React.FC<HeaderProps> = ({
  region,
  onRegionChange,
  festivalMode,
  onToggleFestivalMode,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenExperiment,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showRegionDropdown, setShowRegionDropdown] = useState(false);

  const categories: Category[] = ['All', 'Apparel', 'Drinkware', 'Bags & Lifestyle', 'Accessories'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8EAED] shadow-xs">
      {/* Top Prototype & Localized Announcement Banner */}
      <div className={`text-xs py-2 px-4 transition-colors duration-300 ${
        festivalMode && region === 'IN'
          ? 'bg-gradient-to-r from-[#FFF8E1] via-[#FFFDE7] to-[#FFF3E0] text-[#795548] border-b border-[#FFE082]'
          : 'bg-[#F1F3F4] text-[#5F6368] border-b border-[#E8EAED]'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            {festivalMode && region === 'IN' ? (
              <>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#FBBC04]/25 text-[#D97706]">
                  <DiyaIcon className="w-3.5 h-3.5" />
                </span>
                <span className="font-medium text-[#B45309]">
                  Ganesh Chaturthi Special:
                </span>
                <span className="hidden sm:inline">
                  Limited-time festive picks & fast India PIN code delivery. Free shipping on orders over ₹1,999.
                </span>
                <span className="sm:hidden text-xs">
                  Festive picks & ₹0 delivery above ₹1,999
                </span>
              </>
            ) : (
              <span>
                Google Merchandise Store — Official branded merchandise, sustainable apparel & tech gear.
              </span>
            )}
          </div>

          {/* Prototype Controls Bar inside header bar */}
          <div className="flex items-center space-x-3 ml-auto text-[11px]">
            {/* Region Selector */}
            <div className="relative">
              <button
                id="region-selector-btn"
                onClick={() => setShowRegionDropdown(!showRegionDropdown)}
                className="inline-flex items-center space-x-1 font-medium text-[#3C4043] bg-white/80 hover:bg-white px-2 py-0.5 rounded border border-[#DADCE0] transition-all cursor-pointer"
                title="Toggle Regional Experience"
              >
                <Globe className="w-3 h-3 text-[#1A73E8]" />
                <span>Region: {region === 'IN' ? 'India 🇮🇳 (INR ₹)' : 'Global 🇺🇸 (USD $)'}</span>
              </button>

              {showRegionDropdown && (
                <div className="absolute right-0 mt-1 w-52 bg-white rounded-lg shadow-lg border border-[#DADCE0] py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#70757A] font-semibold">
                    Select Experience Mode
                  </div>
                  <button
                    onClick={() => {
                      onRegionChange('IN');
                      setShowRegionDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-[#F8F9FA] ${
                      region === 'IN' ? 'bg-[#E8F0FE] text-[#1A73E8] font-medium' : 'text-[#3C4043]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>🇮🇳</span> India (INR ₹, PIN Check)
                    </span>
                    {region === 'IN' && <span className="text-[10px] font-bold text-[#1A73E8]">ACTIVE</span>}
                  </button>
                  <button
                    onClick={() => {
                      onRegionChange('US');
                      setShowRegionDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs hover:bg-[#F8F9FA] ${
                      region === 'US' ? 'bg-[#E8F0FE] text-[#1A73E8] font-medium' : 'text-[#3C4043]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>🇺🇸</span> Global / US (USD $)
                    </span>
                    {region === 'US' && <span className="text-[10px] font-bold text-[#1A73E8]">ACTIVE</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Festival Mode Switch (PRD Section 19) */}
            <button
              id="festival-mode-toggle"
              onClick={onToggleFestivalMode}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                festivalMode
                  ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E] font-semibold'
                  : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-[#F1F3F4]'
              }`}
              title="Toggle temporary Ganesh Chaturthi festive layer (PRD Section 19)"
            >
              <Sparkles className={`w-3 h-3 ${festivalMode ? 'text-[#D97706]' : 'text-[#9AA0A6]'}`} />
              <span>Festive Mode: {festivalMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Experiment Analytics Dashboard Trigger */}
            <button
              id="experiment-analytics-btn"
              onClick={onOpenExperiment}
              className="inline-flex items-center space-x-1 px-2 py-0.5 bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1A73E8] border border-[#AECBFA] rounded font-medium transition-colors cursor-pointer"
              title="View GA4 Test Hypothesis & Live Events"
            >
              <BarChart3 className="w-3 h-3" />
              <span className="hidden md:inline">GA4 Experiment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSelectCategory('All')}
              className="flex items-center space-x-2.5 text-left group cursor-pointer focus:outline-hidden"
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
                    <span className="text-[11px] font-semibold bg-[#E8F0FE] text-[#1A73E8] px-1.5 py-0.2 rounded border border-[#D2E3FC]">
                      India 🇮🇳
                    </span>
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors cursor-pointer ${
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
              <a
                href="#festive-picks"
                className="inline-flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-[#B45309] bg-[#FEF3C7] hover:bg-[#FDE68A] rounded-full border border-[#F59E0B]/30 transition-colors"
              >
                <DiyaIcon className="w-3.5 h-3.5 text-[#D97706]" />
                <span>Ganesh Chaturthi Picks</span>
              </a>
            )}
          </nav>

          {/* Right Action Controls (Search, Account, Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Toggle / Bar */}
            <div className="relative">
              {showSearch ? (
                <div className="flex items-center bg-[#F1F3F4] rounded-full px-3 py-1.5 w-48 sm:w-64 border border-transparent focus-within:border-[#1A73E8] focus-within:bg-white focus-within:shadow-sm transition-all">
                  <Search className="w-4 h-4 text-[#5F6368] shrink-0 mr-2" />
                  <input
                    type="text"
                    placeholder="Search Google gear..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    autoFocus
                    className="w-full text-xs sm:text-sm bg-transparent border-none outline-hidden text-[#202124] placeholder-[#80868B]"
                  />
                  {searchQuery && (
                    <button onClick={() => onSearchChange('')} className="p-0.5 hover:text-[#202124] text-[#80868B]">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => setShowSearch(false)}
                    className="ml-1 text-xs text-[#5F6368] hover:text-[#202124]"
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
              className="relative p-2 text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-full transition-colors cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center text-[11px] font-bold text-white bg-[#1A73E8] rounded-full border-2 border-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Category Row */}
        <div className="lg:hidden flex items-center space-x-1 py-2 overflow-x-auto no-scrollbar border-t border-[#F1F3F4]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-full shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#202124] text-white'
                  : 'text-[#5F6368] bg-[#F1F3F4] hover:bg-[#E8EAED]'
              }`}
            >
              {cat}
            </button>
          ))}
          {festivalMode && region === 'IN' && (
            <a
              href="#festive-picks"
              className="px-3 py-1 text-xs font-medium text-[#B45309] bg-[#FEF3C7] rounded-full shrink-0 border border-[#F59E0B]/30 flex items-center gap-1"
            >
              <DiyaIcon className="w-3 h-3 text-[#D97706]" />
              <span>Festive Picks</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
