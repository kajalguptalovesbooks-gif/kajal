import React from 'react';

// Subtle, modern, minimalist SVG motifs reflecting festive warmth without religious iconography
export const DiyaIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Flame */}
    <path d="M12 2C11 4.5 9.5 6 12 8C14.5 6 13 4.5 12 2Z" fill="currentColor" fillOpacity="0.2" />
    {/* Inner glow */}
    <path d="M12 4.5C11.5 5.5 11 6.2 12 7C13 6.2 12.5 5.5 12 4.5Z" fill="currentColor" />
    {/* Earthen bowl (Diya) */}
    <path d="M4 11C4 16 7.5 19 12 19C16.5 19 20 11 20 11H4Z" stroke="currentColor" />
    {/* Rim highlight */}
    <path d="M4 11H20" stroke="currentColor" />
    {/* Base support */}
    <path d="M9 19L8 21H16L15 19" stroke="currentColor" />
  </svg>
);

export const ModakAccent: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {/* Minimalist celebratory modak droplet motif */}
    <path d="M12 3C12 3 5 12 5 16C5 19.5 8 21 12 21C16 21 19 19.5 19 16C19 12 12 3 12 3Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 3V21" stroke="currentColor" strokeOpacity="0.4" strokeDasharray="2 2" />
    <path d="M9 12C9 15 10 19 12 21" stroke="currentColor" strokeOpacity="0.3" />
    <path d="M15 12C15 15 14 19 12 21" stroke="currentColor" strokeOpacity="0.3" />
  </svg>
);

export const FestivePatternBorder: React.FC<{ className?: string }> = ({ className = "h-1 w-full" }) => (
  <div className={`flex items-center justify-center space-x-2 overflow-hidden ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FBBC04]/40 to-transparent" />
    <div className="flex items-center space-x-1.5 opacity-70">
      <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC04]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
    </div>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FBBC04]/40 to-transparent" />
  </div>
);
