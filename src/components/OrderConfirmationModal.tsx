import React, { useState } from 'react';
import { CheckCircle, Package, Truck, ArrowRight, Download, Sparkles, RefreshCw } from 'lucide-react';
import { ConfirmedOrder } from '../types';
import { DiyaIcon } from './FestiveMotif';
import { PurchaseCelebrationOverlay, AbstractFestiveAura } from './FestiveMotion';

interface OrderConfirmationModalProps {
  order: ConfirmedOrder | null;
  onClose: () => void;
  isFestiveActive: boolean;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
  isFestiveActive,
}) => {
  if (!order) return null;

  const [downloadedMock, setDownloadedMock] = React.useState(false);
  const [showCelebration, setShowCelebration] = useState(true);
  const [celebrationKey, setCelebrationKey] = useState(0);

  // Trigger 3-second celebratory animation effect whenever an order is placed
  React.useEffect(() => {
    if (order) {
      setShowCelebration(true);
      setCelebrationKey((prev) => prev + 1);
    }
  }, [order?.orderId]);

  const handleDownloadInvoice = () => {
    setDownloadedMock(true);
    setTimeout(() => setDownloadedMock(false), 3000);
  };

  const handleReplayCelebration = () => {
    setShowCelebration(false);
    setTimeout(() => {
      setShowCelebration(true);
      setCelebrationKey((k) => k + 1);
    }, 60);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in zoom-in-95 duration-200">
      {/* 3-Second Celebratory Animation Effect: Subtle Marigold Particles Drifting Downward */}
      {showCelebration && (
        <PurchaseCelebrationOverlay
          key={celebrationKey}
          isVisible={showCelebration}
          duration={3000}
          onComplete={() => setShowCelebration(false)}
          isFestiveActive={true}
        />
      )}

      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#DADCE0] text-center z-20 overflow-hidden">
        {/* Subtle decorative background aura when festive */}
        {isFestiveActive && (
          <div className="absolute -top-16 -right-16 opacity-30 pointer-events-none w-48 h-48">
            <AbstractFestiveAura className="w-full h-full" />
          </div>
        )}

        {/* Animated Celebration Icon */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-20 h-20 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#188038] border-2 border-[#34A853] shadow-xs">
            <CheckCircle className="w-10 h-10" />
          </div>
          {isFestiveActive && (
            <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#FCD34D] flex items-center justify-center shadow-xs">
              <DiyaIcon className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[#E8F0FE] text-[#1A73E8]">
            <span>You're all set!</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#202124]">
            Thank you for your order!
          </h2>
          <p className="text-xs sm:text-sm text-[#5F6368] max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-[#202124]">{order.shippingDetails.fullName}</span>. We've received your order and we're getting everything ready for you with care.
          </p>

          {/* Festive Blessing Subtitle */}
          {isFestiveActive && (
            <div className="pt-2">
              <p className="text-xs text-[#92400E] bg-[#FFFBEB] px-3.5 py-1.5 rounded-full inline-block border border-[#FDE68A] font-medium">
                ✨ Wishing you and your loved ones joy, good health, and wonderful beginnings this festive season.
              </p>
            </div>
          )}
        </div>

        {/* Order Details Card */}
        <div className="bg-[#F8F9FA] rounded-2xl p-5 border border-[#E8EAED] text-left space-y-4 mb-6">
          <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#E8EAED] gap-2 text-xs">
            <div>
              <span className="text-[#70757A]">Order Reference: </span>
              <span className="font-bold text-[#202124] font-mono">{order.orderId}</span>
            </div>
            <div>
              <span className="text-[#70757A]">Date: </span>
              <span className="font-medium text-[#202124]">{order.createdAt}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Delivery address */}
            <div>
              <div className="font-semibold text-[#202124] mb-1 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#1A73E8]" />
                <span>Shipping to your doorstep</span>
              </div>
              <div className="text-[#5F6368] leading-relaxed">
                {order.shippingDetails.address}<br />
                {order.shippingDetails.city}, {order.shippingDetails.state} - {order.shippingDetails.pinCode}
              </div>
            </div>

            {/* Estimated delivery & items */}
            <div>
              <div className="font-semibold text-[#202124] mb-1 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-[#188038]" />
                <span>Estimated Arrival</span>
              </div>
              <div className="text-[#5F6368]">
                Arriving by <span className="font-semibold text-[#202124]">{order.estimatedDeliveryDate}</span>
              </div>
              <div className="text-[11px] text-[#188038] font-medium mt-1">
                ✓ Free doorstep delivery included with our compliments
              </div>
            </div>
          </div>

          {/* Items Preview */}
          <div className="pt-3 border-t border-[#E8EAED]">
            <div className="text-xs font-semibold text-[#202124] mb-2">
              Items in this Order ({order.items.length})
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 text-xs">
              {order.items.map((i) => (
                <div key={i.id} className="flex justify-between text-[#5F6368]">
                  <span className="truncate max-w-[280px]">
                    {i.quantity}x {i.product.name}
                  </span>
                  <span className="font-medium text-[#202124] shrink-0">
                    {order.currency === 'INR'
                      ? `₹${(i.product.priceINR * i.quantity).toLocaleString('en-IN')}`
                      : `$${(i.product.priceUSD * i.quantity).toFixed(2)}`}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-2 mt-2 border-t border-[#DADCE0] text-sm font-bold text-[#202124]">
              <span>Total Paid</span>
              <span className="text-[#1A73E8]">
                {order.currency === 'INR'
                  ? `₹${order.total.toLocaleString('en-IN')}`
                  : `$${order.total.toFixed(2)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-semibold text-xs sm:text-sm rounded-full transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <span>Continue Exploring</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleDownloadInvoice}
            className="w-full sm:w-auto px-5 py-3 bg-white hover:bg-[#F8F9FA] text-[#3C4043] font-medium text-xs sm:text-sm rounded-full border border-[#DADCE0] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{downloadedMock ? 'Sample Receipt Saved!' : 'Save Sample Receipt'}</span>
          </button>

          <button
            id="replay-celebration-btn"
            onClick={handleReplayCelebration}
            className="w-full sm:w-auto px-4 py-3 bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#92400E] font-medium text-xs sm:text-sm rounded-full border border-[#FCD34D] transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            title="Replay 3-second celebratory animation"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>Replay Celebration ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
