import React from 'react';
import { Globe, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { Region } from '../types';
import { DiyaIcon } from './FestiveMotif';

interface FooterProps {
  region: Region;
  festivalMode: boolean;
  onOpenFeedback: () => void;
  onOpenExperiment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  region,
  festivalMode,
  onOpenFeedback,
  onOpenExperiment,
}) => {
  return (
    <footer className="bg-white border-t border-[#E8EAED] text-[#5F6368] text-xs">
      {/* Values & Assurance Strip */}
      <div className="border-b border-[#F1F3F4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#202124] text-xs">Curated Merchandise</div>
              <div className="text-[11px] text-[#70757A] mt-0.5">
                Authentic design inspired by Google lifestyle apparel, drinkware & tech gear.
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#E6F4EA] text-[#188038] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#202124] text-xs">
                {region === 'IN' ? 'Delivery Simulation' : 'Global Shipping'}
              </div>
              <div className="text-[11px] text-[#70757A] mt-0.5">
                {region === 'IN'
                  ? 'Simulated PIN code delivery check across major Indian metro zones.'
                  : 'Worldwide delivery experience preview.'}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0">
              {festivalMode && region === 'IN' ? (
                <DiyaIcon className="w-4 h-4" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
            </div>
            <div>
              <div className="font-semibold text-[#202124] text-xs">
                {festivalMode && region === 'IN' ? 'Festive Season Edition' : 'Sustainable Quality'}
              </div>
              <div className="text-[11px] text-[#70757A] mt-0.5">
                {festivalMode && region === 'IN'
                  ? 'Ganesh Chaturthi limited-time campaign layer demonstration.'
                  : 'Recycled plastics and 100% certified organic cotton items.'}
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#FCE8E6] text-[#EA4335] flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-[#202124] text-xs">Easy Returns</div>
              <div className="text-[11px] text-[#70757A] mt-0.5">
                Hassle-free 30-day exchange and replacement support.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 space-y-3">
          <div className="flex items-center space-x-2">
            {/* Google Logo */}
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-2xs border border-[#E8EAED]">
              <svg viewBox="0 0 24 24" className="w-4 h-4">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.36 24 12 24z"/>
                <path fill="#FBBC04" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.94 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
            </div>
            <span className="font-semibold text-[#202124] text-sm">Google Merchandise Store</span>
          </div>

          <p className="text-xs text-[#5F6368] leading-relaxed max-w-sm">
            This website is an experimental e-commerce prototype exploring localized shopping relevance (INR pricing and PIN code availability) and temporary festival layering for Indian visitors during Ganesh Chaturthi.
          </p>

          <div className="flex items-center space-x-3 pt-2">
            <button
              onClick={onOpenExperiment}
              className="text-[#1A73E8] hover:underline font-medium cursor-pointer"
            >
              View Experiment Details
            </button>
            <span>•</span>
            <button
              onClick={onOpenFeedback}
              className="text-[#1A73E8] hover:underline font-medium cursor-pointer"
            >
              Shopper Feedback
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-[#202124] mb-3">Shop Categories</h4>
          <ul className="space-y-2">
            <li><a href="#catalog" className="hover:text-[#202124]">Apparel</a></li>
            <li><a href="#catalog" className="hover:text-[#202124]">Drinkware & Bottles</a></li>
            <li><a href="#catalog" className="hover:text-[#202124]">Bags & Backpacks</a></li>
            <li><a href="#catalog" className="hover:text-[#202124]">Desk Accessories</a></li>
            {festivalMode && (
              <li>
                <a href="#festive-picks" className="text-[#B45309] font-medium hover:underline">
                  Festive Picks 🪔
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#202124] mb-3">Customer Care</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#202124]">Order Tracking</a></li>
            <li><a href="#" className="hover:text-[#202124]">Shipping Information</a></li>
            <li><a href="#" className="hover:text-[#202124]">PIN Code Coverage</a></li>
            <li><a href="#" className="hover:text-[#202124]">Sustainability Policy</a></li>
            <li><a href="#" className="hover:text-[#202124]">Contact Support</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#202124] mb-3">Experiment Disclaimers</h4>
          <p className="text-[11px] text-[#70757A] leading-relaxed">
            Non-production demonstration prototype. Prices in INR and delivery checks are simulated representations. No actual payments or transactions are executed.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E8EAED] py-4 px-4 sm:px-6 lg:px-8 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#70757A]">
          <div className="flex items-center space-x-3">
            <span>© 2026 Google LLC Prototype</span>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms</a>
          </div>
          <div>
            <span>Active Locale: {region === 'IN' ? 'India (INR ₹)' : 'Global / US (USD $)'}</span>
            <span className="mx-2">•</span>
            <span>Mode: {festivalMode ? 'Ganesh Chaturthi Campaign (Active)' : 'Standard Store Experience'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
