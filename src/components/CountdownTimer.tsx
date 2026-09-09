import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { DiyaIcon } from './FestiveMotif';

interface CountdownTimerProps {
  onCampaignEnd?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = () => {
  // Configurable prototype countdown (default: 4 days, 12 hours, 36 mins, 21 secs as per PRD)
  const [totalSeconds, setTotalSeconds] = useState<number>(4 * 86400 + 12 * 3600 + 36 * 60 + 21);

  useEffect(() => {
    if (totalSeconds <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [totalSeconds]);

  const hasEnded = totalSeconds <= 0;
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section className="bg-white border-b border-[#FDE68A]/60 py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left Headline & Context */}
        <div className="flex items-center space-x-3 text-center md:text-left">
          <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center shrink-0 shadow-xs border border-[#FCD34D]">
            <DiyaIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h3 className="text-base sm:text-lg font-bold text-[#202124] tracking-tight">
                Ganesh Chaturthi Festive Celebration
              </h3>
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                hasEnded
                  ? 'bg-[#F1F3F4] text-[#5F6368]'
                  : 'text-[#B45309] bg-[#FEF3C7]'
              }`}>
                <Sparkles className="w-3 h-3 text-[#D97706]" />
                {hasEnded ? 'Campaign Concluded' : 'Seasonal Festive Window'}
              </span>
            </div>
            <p className="text-xs text-[#5F6368] mt-0.5">
              {hasEnded
                ? 'The festive campaign window has wrapped up, but you are always welcome to browse the collection anytime.'
                : 'Here to celebrate with you for the days ahead. Take your time exploring our seasonal picks with doorstep delivery estimates.'}
            </p>
          </div>
        </div>

        {/* Right Countdown Blocks */}
        {!hasEnded ? (
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-center font-bold text-lg sm:text-xl text-[#202124] shadow-2xs font-mono">
                {pad(days)}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#5F6368] mt-1 uppercase tracking-wider">
                Days
              </span>
            </div>

            <span className="text-lg font-bold text-[#BDC1C6] -mt-4">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-center font-bold text-lg sm:text-xl text-[#202124] shadow-2xs font-mono">
                {pad(hours)}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#5F6368] mt-1 uppercase tracking-wider">
                Hours
              </span>
            </div>

            <span className="text-lg font-bold text-[#BDC1C6] -mt-4">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-center font-bold text-lg sm:text-xl text-[#202124] shadow-2xs font-mono">
                {pad(minutes)}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#5F6368] mt-1 uppercase tracking-wider">
                Minutes
              </span>
            </div>

            <span className="text-lg font-bold text-[#BDC1C6] -mt-4">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#FFFBEB] border border-[#FCD34D] flex items-center justify-center font-bold text-lg sm:text-xl text-[#B45309] shadow-2xs font-mono">
                {pad(seconds)}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium text-[#5F6368] mt-1 uppercase tracking-wider">
                Seconds
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-[#DADCE0] text-[#5F6368]">
            Campaign ended • Standard catalog active
          </div>
        )}
      </div>
    </section>
  );
};
