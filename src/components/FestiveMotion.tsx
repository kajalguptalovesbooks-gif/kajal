import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

// Reusable organic Marigold Petal SVG component
export const MarigoldPetalSvg: React.FC<{
  className?: string;
  size?: number;
  rotation?: number;
  opacity?: number;
  shade?: 'warm-gold' | 'deep-saffron' | 'amber';
}> = ({
  className = '',
  size = 18,
  rotation = 0,
  opacity = 0.85,
  shade = 'warm-gold',
}) => {
  // Gradients for organic Indian marigold petals
  const gradientId = useMemo(
    () => `marigold-grad-${shade}-${Math.random().toString(36).substr(2, 6)}`,
    [shade]
  );

  const colors = {
    'warm-gold': { start: '#FBBC04', mid: '#F59E0B', end: '#D97706' },
    'deep-saffron': { start: '#F59E0B', mid: '#EA580C', end: '#C2410C' },
    'amber': { start: '#FDE047', mid: '#F59E0B', end: '#B45309' },
  }[shade];

  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
      }}
      className={`pointer-events-none select-none ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="12" y1="0" x2="12" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.start} stopOpacity="0.95" />
          <stop offset="65%" stopColor={colors.mid} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.end} stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {/* Organic curved petal shape */}
      <path
        d="M12 2C7 8 4 15 4 21C4 26 7.5 30 12 30C16.5 30 20 26 20 21C20 15 17 8 12 2Z"
        fill={`url(#${gradientId})`}
      />
      {/* Subtle central vein for refined realism */}
      <path
        d="M12 4V28"
        stroke="#FFFFFF"
        strokeOpacity="0.25"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

// Abstract celebratory Ganesh Chaturthi aura motif (diya / lotus / soft rays)
export const AbstractFestiveAura: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <defs>
      <radialGradient id="auraGlow" cx="100" cy="100" r="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBC04" stopOpacity="0.4" />
        <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="auraRay" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FBBC04" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#EA4335" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Soft ambient background circle */}
    <circle cx="100" cy="100" r="90" fill="url(#auraGlow)" />

    {/* Elegant geometric radiating arcs */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
      <line
        key={deg}
        x1="100"
        y1="50"
        x2="100"
        y2="30"
        stroke="#FBBC04"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeOpacity="0.4"
        transform={`rotate(${deg} 100 100)`}
      />
    ))}

    {/* Concentric subtle decorative rings */}
    <circle cx="100" cy="100" r="68" stroke="#F59E0B" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="50" stroke="#FBBC04" strokeWidth="1" strokeOpacity="0.35" />

    {/* Minimalist central diya flame silhouette */}
    <path
      d="M100 75 C97 85 92 90 100 100 C108 90 103 85 100 75 Z"
      fill="#FBBC04"
      fillOpacity="0.5"
    />
    <path
      d="M84 105 C84 116 91 122 100 122 C109 122 116 116 116 105 H84 Z"
      stroke="#D97706"
      strokeWidth="1.5"
      strokeOpacity="0.4"
    />
  </svg>
);

// 2. HOMEPAGE — FESTIVE ATMOSPHERE (Ambient warm light & drifting petals)
export const FestiveAtmosphereBackground: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // 5 petals for desktop, 2-3 for mobile to ensure light footprint and zero distraction
  const petalCount = isMobile ? 3 : 6;

  const petals = useMemo(() => {
    return Array.from({ length: petalCount }, (_, i) => ({
      id: i,
      left: 10 + (i * 80) / petalCount + (i % 2 === 0 ? 5 : -5),
      size: 14 + (i % 3) * 3,
      delay: i * 2.8,
      duration: 14 + (i % 4) * 3,
      rotation: (i * 65) % 360,
      shade: (i % 2 === 0 ? 'warm-gold' : 'amber') as 'warm-gold' | 'amber',
    }));
  }, [petalCount]);

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 right-1/4 w-96 h-96 bg-[#FBBC04]/10 rounded-full blur-3xl opacity-50" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft moving warm glow */}
      <motion.div
        className="absolute -top-24 right-1/4 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-[#FBBC04]/12 via-[#EA4335]/6 to-transparent blur-3xl"
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -25, 20, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Occasional diya-like warm shimmer near decorative banner header */}
      <motion.div
        className="absolute top-10 left-1/3 w-48 h-48 rounded-full bg-[#FBBC04]/8 blur-2xl"
        animate={{
          opacity: [0.3, 0.65, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Gentle drifting marigold petals */}
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, opacity: 0, rotate: p.rotation }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, 25, -15, 30, 0],
            rotate: [p.rotation, p.rotation + 180, p.rotation + 360],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        >
          <MarigoldPetalSvg size={p.size} shade={p.shade} opacity={0.65} />
        </motion.div>
      ))}
    </div>
  );
};

// 4. FESTIVE COLLECTION — PETAL FLOW (subtle scroll-triggered petals)
export const ScrollRevealPetals: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return null;

  return (
    <div className="absolute top-0 right-8 pointer-events-none overflow-hidden z-10 w-48 h-32">
      <motion.div
        initial={{ opacity: 0, y: -20, x: -20, rotate: 0 }}
        whileInView={{ opacity: [0, 0.75, 0], y: 60, x: 30, rotate: 120 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2.2, ease: 'easeOut', delay: 0.2 }}
        className="absolute top-2 right-12"
      >
        <MarigoldPetalSvg size={16} shade="warm-gold" opacity={0.7} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -30, x: 0, rotate: 45 }}
        whileInView={{ opacity: [0, 0.65, 0], y: 75, x: 45, rotate: 200 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 2.6, ease: 'easeOut', delay: 0.4 }}
        className="absolute top-4 right-24"
      >
        <MarigoldPetalSvg size={13} shade="deep-saffron" opacity={0.65} />
      </motion.div>
    </div>
  );
};

// 6 & 11. ADD TO CART — SMALL TRAVELING PETAL TRAIL TOWARD CART
export interface TravelingPetal {
  id: string;
  startX: number;
  startY: number;
}

export const TravelingPetalTrail: React.FC<{
  petals: TravelingPetal[];
  onComplete: (id: string) => void;
}> = ({ petals, onComplete }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion || petals.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {petals.map((petal) => {
        // Target destination is the header cart button (approx top-right corner)
        const targetX = window.innerWidth - 65;
        const targetY = 32;

        return (
          <motion.div
            key={petal.id}
            initial={{
              x: petal.startX,
              y: petal.startY,
              scale: 0.9,
              opacity: 0.9,
              rotate: 0,
            }}
            animate={{
              x: targetX,
              y: targetY,
              scale: [0.9, 1.1, 0.4],
              opacity: [0.9, 1, 0],
              rotate: 180,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1], // snappy smooth bezier
            }}
            onAnimationComplete={() => onComplete(petal.id)}
            className="fixed top-0 left-0"
          >
            <div className="relative">
              <MarigoldPetalSvg size={14} shade="warm-gold" opacity={0.9} />
              {/* Subtle warm trail glow */}
              <span className="absolute inset-0 rounded-full bg-[#FBBC04]/40 blur-xs" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

// 9, 10, 11, 12, 13. PURCHASE — 3-SECOND CELEBRATORY MARIGOLD PARTICLE EFFECT
export interface PurchaseCelebrationOverlayProps {
  isVisible?: boolean;
  onComplete?: () => void;
  onCelebrationSettle?: () => void;
  duration?: number;
  isFestiveActive?: boolean;
}

export const PurchaseCelebrationOverlay: React.FC<PurchaseCelebrationOverlayProps> = ({
  isVisible = true,
  onComplete,
  onCelebrationSettle,
  duration = 3000,
  isFestiveActive = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Exactly 3-second celebratory lifecycle
  useEffect(() => {
    if (!isVisible || !isFestiveActive) return;

    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        onComplete?.();
        onCelebrationSettle?.();
      }, 1000);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      onComplete?.();
      onCelebrationSettle?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [isVisible, isFestiveActive, duration, shouldReduceMotion, onComplete, onCelebrationSettle]);

  if (!isFestiveActive || !isVisible) {
    return null;
  }

  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0] }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="w-96 h-96 rounded-full bg-[#FBBC04]/15 blur-3xl"
        />
      </div>
    );
  }

  // Curated marigold-inspired particles drifting downward over ~2.4 - 2.9 seconds
  const marigoldPetals = [
    { id: 1, left: 8, size: 16, delay: 0.05, duration: 2.5, sway: -25, rotation: 35, shade: 'warm-gold' as const },
    { id: 2, left: 16, size: 20, delay: 0.2, duration: 2.7, sway: 30, rotation: 110, shade: 'deep-saffron' as const },
    { id: 3, left: 24, size: 15, delay: 0.1, duration: 2.4, sway: -18, rotation: 60, shade: 'amber' as const },
    { id: 4, left: 32, size: 22, delay: 0.28, duration: 2.8, sway: 24, rotation: 145, shade: 'warm-gold' as const },
    { id: 5, left: 40, size: 17, delay: 0.0, duration: 2.5, sway: -32, rotation: 80, shade: 'deep-saffron' as const },
    { id: 6, left: 48, size: 21, delay: 0.15, duration: 2.6, sway: 20, rotation: 40, shade: 'warm-gold' as const },
    { id: 7, left: 56, size: 18, delay: 0.32, duration: 2.8, sway: -22, rotation: 120, shade: 'amber' as const },
    { id: 8, left: 64, size: 23, delay: 0.08, duration: 2.5, sway: 35, rotation: 95, shade: 'deep-saffron' as const },
    { id: 9, left: 72, size: 16, delay: 0.22, duration: 2.6, sway: -28, rotation: 155, shade: 'warm-gold' as const },
    { id: 10, left: 80, size: 19, delay: 0.12, duration: 2.7, sway: 25, rotation: 50, shade: 'amber' as const },
    { id: 11, left: 88, size: 15, delay: 0.35, duration: 2.8, sway: -16, rotation: 130, shade: 'warm-gold' as const },
    { id: 12, left: 94, size: 18, delay: 0.18, duration: 2.6, sway: 22, rotation: 75, shade: 'deep-saffron' as const },
    { id: 13, left: 12, size: 14, delay: 0.42, duration: 2.5, sway: 20, rotation: 25, shade: 'amber' as const },
    { id: 14, left: 28, size: 17, delay: 0.38, duration: 2.5, sway: -24, rotation: 100, shade: 'warm-gold' as const },
    { id: 15, left: 52, size: 16, delay: 0.45, duration: 2.4, sway: -15, rotation: 65, shade: 'deep-saffron' as const },
    { id: 16, left: 68, size: 19, delay: 0.4, duration: 2.5, sway: 18, rotation: 140, shade: 'warm-gold' as const },
    { id: 17, left: 84, size: 15, delay: 0.48, duration: 2.4, sway: -20, rotation: 85, shade: 'amber' as const },
  ];

  // Subtle warm golden embers/pollen droplets
  const goldenDroplets = [
    { id: 'd1', left: 18, delay: 0.1, duration: 2.3, sway: 15, size: 5 },
    { id: 'd2', left: 35, delay: 0.25, duration: 2.6, sway: -18, size: 4 },
    { id: 'd3', left: 45, delay: 0.05, duration: 2.2, sway: 20, size: 6 },
    { id: 'd4', left: 60, delay: 0.3, duration: 2.5, sway: -14, size: 5 },
    { id: 'd5', left: 76, delay: 0.15, duration: 2.4, sway: 22, size: 4 },
    { id: 'd6', left: 90, delay: 0.35, duration: 2.7, sway: -16, size: 5 },
    { id: 'd7', left: 26, delay: 0.4, duration: 2.3, sway: 12, size: 4 },
    { id: 'd8', left: 66, delay: 0.45, duration: 2.4, sway: -15, size: 5 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="celebration-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
        className="fixed inset-0 pointer-events-none overflow-hidden z-50 select-none"
      >
        {/* Soft atmospheric ambient golden radial glow over the confirmation view */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: [0, 0.6, 0.45, 0],
            scale: [0.85, 1.05, 1.15, 1.2],
          }}
          transition={{ duration: 2.9, ease: 'easeOut' }}
          className="absolute inset-0 bg-radial from-[#FBBC04]/20 via-[#F59E0B]/8 to-transparent blur-2xl"
        />

        {/* Minimal festive aura watermark that fades gracefully */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0, 0.3, 0.25, 0],
            scale: [0.9, 1, 1.05, 1.08],
          }}
          transition={{ duration: 2.8, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
        >
          <AbstractFestiveAura className="w-full h-full text-[#FBBC04]" />
        </motion.div>

        {/* Downward drifting marigold-inspired particles */}
        {marigoldPetals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-0"
            style={{ left: `${petal.left}%` }}
            initial={{
              y: -50,
              x: 0,
              opacity: 0,
              rotate: petal.rotation,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, petal.sway, -petal.sway * 0.5, petal.sway * 0.8],
              rotate: [petal.rotation, petal.rotation + 140, petal.rotation + 280],
              opacity: [0, 0.9, 0.8, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              ease: [0.25, 0.1, 0.25, 1], // natural organic drag curve
            }}
          >
            <MarigoldPetalSvg
              size={petal.size}
              shade={petal.shade}
              opacity={0.9}
            />
          </motion.div>
        ))}

        {/* Subtle golden droplets/florets drifting with the petals */}
        {goldenDroplets.map((drop) => (
          <motion.div
            key={drop.id}
            className="absolute top-0"
            style={{ left: `${drop.left}%` }}
            initial={{
              y: -30,
              x: 0,
              opacity: 0,
            }}
            animate={{
              y: ['0vh', '110vh'],
              x: [0, drop.sway, -drop.sway * 0.6, drop.sway * 0.8],
              opacity: [0, 0.85, 0.7, 0],
            }}
            transition={{
              duration: drop.duration,
              delay: drop.delay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <div
              style={{ width: drop.size, height: drop.size }}
              className="rounded-full bg-gradient-to-t from-[#FBBC04] to-[#FDE047] shadow-xs shadow-[#FBBC04]/60"
            />
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
