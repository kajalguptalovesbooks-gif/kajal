import React from 'react';
import { X, BarChart3, Activity, CheckCircle2, TrendingUp, Users, ShieldAlert, Sparkles } from 'lucide-react';
import { AnalyticsLog, Region } from '../types';

interface ExperimentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logs: AnalyticsLog[];
  festivalMode: boolean;
  region: Region;
  onToggleFestivalMode: () => void;
  onSetRegion: (r: Region) => void;
  onClearLogs: () => void;
}

export const ExperimentDrawer: React.FC<ExperimentDrawerProps> = ({
  isOpen,
  onClose,
  logs,
  festivalMode,
  region,
  onToggleFestivalMode,
  onSetRegion,
  onClearLogs,
}) => {
  if (!isOpen) return null;

  // Aggregate event counts
  const pageViews = logs.filter((l) => l.eventName === 'homepage_visit').length;
  const bannerClicks = logs.filter((l) => l.eventName === 'festive_banner_click').length;
  const pinChecks = logs.filter((l) => l.eventName === 'pin_check').length;
  const addsToCart = logs.filter((l) => l.eventName === 'add_to_cart').length;
  const checkouts = logs.filter((l) => l.eventName === 'checkout_initiate').length;
  const purchases = logs.filter((l) => l.eventName === 'purchase_complete').length;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#DADCE0] animate-in slide-in-from-right duration-250">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8EAED] flex items-center justify-between bg-[#F8F9FA]">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#202124]">
                GA4 Experiment & Analytics Telemetry
              </h2>
              <p className="text-[11px] text-[#5F6368]">
                India Localization & Festive Campaign Prototype
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#E8EAED]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-[#3C4043]">
          {/* PRD Context & Hypothesis Box */}
          <div className="bg-[#E8F0FE]/50 p-4 rounded-xl border border-[#D2E3FC] space-y-2">
            <div className="font-semibold text-[#174EA6] flex items-center gap-1.5 text-xs">
              <Users className="w-3.5 h-3.5" />
              <span>GA4 Data Foundation & Core Hypothesis</span>
            </div>
            <p className="text-[11px] text-[#1967D2] leading-relaxed">
              <strong>Observation:</strong> India generates ~1.4K active users in GA4 data, but recent periods showed declining user engagement.
            </p>
            <p className="text-[11px] text-[#3C4043] leading-relaxed">
              <strong>Hypothesis:</strong> "Can a more locally relevant shopping experience (INR pricing + PIN delivery check), combined with a temporary Ganesh Chaturthi campaign, improve engagement and purchase intent among Indian visitors?"
            </p>
          </div>

          {/* Test Setup / State Toggle */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#202124] text-xs uppercase tracking-wider">
              Variant State Controller
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E8EAED] space-y-1">
                <span className="text-[10px] text-[#70757A] font-semibold block">CURRENT VARIANT</span>
                <span className="font-bold text-sm text-[#202124]">
                  {festivalMode && region === 'IN' ? 'Test (Festive + India)' : 'Control (Standard)'}
                </span>
              </div>
              <div className="p-3 bg-[#F8F9FA] rounded-xl border border-[#E8EAED] space-y-1">
                <span className="text-[10px] text-[#70757A] font-semibold block">CURRENCY & GEO</span>
                <span className="font-bold text-sm text-[#202124]">
                  {region === 'IN' ? 'INR (₹) • India' : 'USD ($) • Global'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={onToggleFestivalMode}
                className={`flex-1 py-2 px-3 rounded-lg border font-semibold transition-colors cursor-pointer text-center ${
                  festivalMode
                    ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]'
                    : 'bg-white border-[#DADCE0] text-[#5F6368] hover:bg-[#F1F3F4]'
                }`}
              >
                Festive Layer: {festivalMode ? 'ON (Test)' : 'OFF (Control)'}
              </button>
              <button
                onClick={() => onSetRegion(region === 'IN' ? 'US' : 'IN')}
                className="py-2 px-3 rounded-lg border border-[#DADCE0] bg-white hover:bg-[#F1F3F4] text-[#3C4043] font-medium transition-colors cursor-pointer"
              >
                Switch to {region === 'IN' ? 'Global 🇺🇸' : 'India 🇮🇳'}
              </button>
            </div>
          </div>

          {/* Real-time Session KPI Funnel */}
          <div className="space-y-3">
            <h3 className="font-bold text-[#202124] text-xs uppercase tracking-wider">
              Prototype Session Metrics
            </h3>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E8EAED]">
                <div className="text-base font-bold text-[#202124]">{pageViews}</div>
                <div className="text-[10px] text-[#5F6368]">Page Views</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E8EAED]">
                <div className="text-base font-bold text-[#B45309]">{bannerClicks}</div>
                <div className="text-[10px] text-[#5F6368]">Festive Clicks</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E8EAED]">
                <div className="text-base font-bold text-[#1A73E8]">{pinChecks}</div>
                <div className="text-[10px] text-[#5F6368]">PIN Checks</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E8EAED]">
                <div className="text-base font-bold text-[#202124]">{addsToCart}</div>
                <div className="text-[10px] text-[#5F6368]">Add to Cart</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#F8F9FA] border border-[#E8EAED]">
                <div className="text-base font-bold text-[#202124]">{checkouts}</div>
                <div className="text-[10px] text-[#5F6368]">Checkouts</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#E6F4EA] border border-[#CEEAD6]">
                <div className="text-base font-bold text-[#188038]">{purchases}</div>
                <div className="text-[10px] text-[#137333]">Purchases</div>
              </div>
            </div>
          </div>

          {/* Live GA4 Event Log Stream */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#202124] text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#188038] animate-pulse" />
                <span>Live Event Stream ({logs.length})</span>
              </h3>
              <button
                onClick={onClearLogs}
                className="text-[10px] text-[#1A73E8] hover:underline cursor-pointer"
              >
                Clear Log
              </button>
            </div>

            <div className="bg-[#202124] text-[#E8EAED] font-mono text-[11px] rounded-xl p-3 max-h-56 overflow-y-auto space-y-1.5">
              {logs.length === 0 ? (
                <div className="text-[#80868B] italic text-center py-4">
                  No telemetry events recorded yet. Interact with the website to stream events.
                </div>
              ) : (
                logs.slice(0, 30).map((log) => (
                  <div key={log.id} className="leading-snug flex items-start space-x-2">
                    <span className="text-[#80868B] shrink-0">{log.timestamp}</span>
                    <span className="text-[#8AB4F8] font-semibold shrink-0">[{log.eventName}]</span>
                    {log.details && (
                      <span className="text-[#F1F3F4] truncate">
                        {JSON.stringify(log.details).replace(/"/g, '')}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#E8EAED] bg-[#F8F9FA] text-[11px] text-[#5F6368] flex items-center justify-between">
          <span>PRD Experiment Specification</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#202124] text-white rounded-lg hover:bg-[#3C4043]"
          >
            Close Telemetry
          </button>
        </div>
      </div>
    </div>
  );
};
