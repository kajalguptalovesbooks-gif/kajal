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

// 9, 10, 11, 12, 13. PURCHASE — EMOTIONAL REWARD CELEBRATION
interface PurchaseCelebrationOverlayProps {
  onCelebrationSettle?: () => void;
  isFestiveActive: boolean;
}

export const PurchaseCelebrationOverlay: React.FC<PurchaseCelebrationOverlayProps> = ({
  onCelebrationSettle,
  isFestiveActive,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);

  useEffect(() => {
    if (!isFestiveActive || shouldReduceMotion) {
      if (onCelebrationSettle) onCelebrationSettle();
      return;
    }

    // Sequence of 4 phases:
    // Phase 1 (0ms): soft glow appears
    // Phase 2 (400ms): controlled marigold petals gently drift downward + golden particles rise
    // Phase 3 (900ms): subtle decorative Ganesh Chaturthi motif appears
    // Phase 4 (2500ms): gradual settle, leaves calm confirmation card
    const timer1 = setTimeout(() => setPhase(2), 350);
    const timer2 = setTimeout(() => setPhase(3), 850);
    const timer3 = setTimeout(() => {
      setPhase(4);
      if (onCelebrationSettle) onCelebrationSettle();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isFestiveActive, shouldReduceMotion, onCelebrationSettle]);

  if (!isFestiveActive || shouldReduceMotion) {
    return null;
  }

  // 14 graceful marigold petals drifting down
  const celebrationPetals = [
    { id: 1, left: 15, size: 20, delay: 0.1, duration: 2.6, xOffset: -35, rotation: 70 },
    { id: 2, left: 28, size: 16, delay: 0.3, duration: 2.8, xOffset: 25, rotation: 140 },
    { id: 3, left: 42, size: 22, delay: 0.05, duration: 2.5, xOffset: -20, rotation: 45 },
    { id: 4, left: 55, size: 18, delay: 0.25, duration: 2.7, xOffset: 30, rotation: 110 },
    { id: 5, left: 68, size: 21, delay: 0.15, duration: 2.6, xOffset: -25, rotation: 90 },
    { id: 6, left: 82, size: 17, delay: 0.4, duration: 2.9, xOffset: 20, rotation: 160 },
    { id: 7, left: 22, size: 15, delay: 0.6, duration: 2.4, xOffset: 15, rotation: 30 },
    { id: 8, left: 75, size: 19, delay: 0.5, duration: 2.5, xOffset: -18, rotation: 125 },
    { id: 9, left: 36, size: 17, delay: 0.7, duration: 2.6, xOffset: -28, rotation: 80 },
    { id: 10, left: 62, size: 20, delay: 0.65, duration: 2.7, xOffset: 22, rotation: 150 },
    { id: 11, left: 10, size: 14, delay: 0.35, duration: 2.8, xOffset: 10, rotation: 65 },
    { id: 12, left: 88, size: 16, delay: 0.45, duration: 2.7, xOffset: -15, rotation: 100 },
  ];

  // 8 subtle golden sparkles/warm embers rising upward
  const risingParticles = [
    { id: 'r1', left: 30, bottom: 20, delay: 0.2, duration: 2.2, x: -15 },
    { id: 'r2', left: 45, bottom: 15, delay: 0.4, duration: 2.4, x: 20 },
    { id: 'r3', left: 58, bottom: 25, delay: 0.1, duration: 2.0, x: -10 },
    { id: 'r4', left: 70, bottom: 18, delay: 0.5, duration: 2.3, x: 25 },
    { id: 'r5', left: 25, bottom: 30, delay: 0.6, duration: 2.1, x: 12 },
    { id: 'r6', left: 52, bottom: 12, delay: 0.3, duration: 2.5, x: -18 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-20">
      {/* PHASE 1 — Confirmation Soft Warm Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: phase < 4 ? 0.8 : 0,
          scale: phase < 4 ? 1.05 : 1,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-radial from-[#FBBC04]/20 via-[#F59E0B]/10 to-transparent blur-xl"
      />

      {/* PHASE 3 — Abstract Elegant Ganesh Chaturthi Motif Aura */}
      <AnimatePresence>
        {phase >= 3 && phase < 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
            animate={{ opacity: 0.32, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.7 } }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-6 left-1/2 -translate-x-1/2 w-64 h-64 pointer-events-none"
          >
            <AbstractFestiveAura className="w-full h-full text-[#FBBC04]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2 — Marigold Petals Drifting Downward */}
      <AnimatePresence>
        {phase >= 2 && phase < 4 && (
          <div className="absolute inset-0">
            {celebrationPetals.map((petal) => (
              <motion.div
                key={petal.id}
                className="absolute top-0"
                style={{ left: `${petal.left}%` }}
                initial={{
                  y: -30,
                  x: 0,
                  opacity: 0,
                  rotate: petal.rotation,
                }}
                animate={{
                  y: ['0%', '115%'],
                  x: [0, petal.xOffset, petal.xOffset / 2, petal.xOffset * 1.2],
                  rotate: [petal.rotation, petal.rotation + 180, petal.rotation + 300],
                  opacity: [0, 0.85, 0.85, 0],
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <MarigoldPetalSvg
                  size={petal.size}
                  shade={petal.id % 2 === 0 ? 'warm-gold' : 'deep-saffron'}
                  opacity={0.85}
                />
              </motion.div>
            ))}

            {/* Rising warm golden particles */}
            {risingParticles.map((rp) => (
              <motion.div
                key={rp.id}
                className="absolute"
                style={{ left: `${rp.left}%`, bottom: `${rp.bottom}%` }}
                initial={{ y: 0, opacity: 0, scale: 0.6 }}
                animate={{
                  y: -140,
                  x: [0, rp.x, rp.x * 1.5],
                  opacity: [0, 0.9, 0.9, 0],
                  scale: [0.6, 1.2, 0.4],
                }}
                transition={{
                  duration: rp.duration,
                  delay: rp.delay,
                  ease: 'easeOut',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-t from-[#FBBC04] to-[#FDE047] shadow-xs shadow-[#FBBC04]/80" />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
