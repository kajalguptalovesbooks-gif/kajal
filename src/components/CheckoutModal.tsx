import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, QrCode, Building, CheckCircle2, ArrowLeft, Truck } from 'lucide-react';
import { CartItem, Region, CheckoutFormData, ConfirmedOrder } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  region: Region;
  onPlaceOrder: (order: ConfirmedOrder) => void;
}

const INDIAN_STATES = [
  'Maharashtra',
  'Delhi NCR',
  'Karnataka',
  'Telangana',
  'Tamil Nadu',
  'Gujarat',
  'Uttar Pradesh',
  'West Bengal',
  'Rajasthan',
  'Kerala',
  'Haryana',
  'Punjab',
  'Madhya Pradesh',
  'Bihar',
  'Goa',
];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  region,
  onPlaceOrder,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'Aditya Sharma',
    email: 'aditya.sharma@example.com',
    phone: '9820012345',
    address: 'Flat 402, Lotus Heights, Senapati Bapat Marg',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400013',
    paymentMethod: 'gpay_upi',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotalINR = items.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);
  const deliveryFeeINR = subtotalINR >= 1999 ? 0 : 150;
  const deliveryFeeUSD = subtotalUSD >= 50 ? 0 : 5.0;

  const totalINR = subtotalINR + deliveryFeeINR;
  const totalUSD = subtotalUSD + deliveryFeeUSD;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const confirmed: ConfirmedOrder = {
        orderId: `GMS-IN-${Math.floor(100000 + Math.random() * 900000)}`,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        items,
        subtotal: region === 'IN' ? subtotalINR : subtotalUSD,
        deliveryFee: region === 'IN' ? deliveryFeeINR : deliveryFeeUSD,
        total: region === 'IN' ? totalINR : totalUSD,
        currency: region === 'IN' ? 'INR' : 'USD',
        shippingDetails: formData,
        estimatedDeliveryDate: '3 - 5 business days',
      };

      setIsSubmitting(false);
      onPlaceOrder(confirmed);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#DADCE0]">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-6 py-4 border-b border-[#E8EAED] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] transition-colors mr-1"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-base sm:text-lg font-bold text-[#202124]">
              Google Merchandise Store Checkout
            </h2>
            {region === 'IN' && (
              <span className="text-xs font-semibold bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 rounded-full">
                India Localized 🇮🇳
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prototype simulation alert */}
        <div className="bg-[#FEF7E0] border-b border-[#FEEFC3] px-6 py-2 text-xs text-[#7A4F01] flex items-center justify-between">
          <span>
            ℹ️ <strong>Prototype Demonstration:</strong> Simplified checkout flow. No real payment or real customer charge occurs.
          </span>
          <span className="font-semibold text-[11px] uppercase tracking-wider">Demo Mode</span>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F3F4]">
                <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A73E8] text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Delivery Address</span>
                </h3>
                <span className="text-[11px] text-[#188038] font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  <span>Pan-India Service</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#3C4043] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#DADCE0] rounded-lg focus:border-[#1A73E8] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C4043] mb-1">Mobile (+91)</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#DADCE0] rounded-lg focus:border-[#1A73E8] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3C4043] mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-[#DADCE0] rounded-lg focus:border-[#1A73E8] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#3C4043] mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#DADCE0] rounded-lg focus:border-[#1A73E8] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C4043] mb-1">State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#DADCE0] rounded-lg focus:border-[#1A73E8] focus:outline-hidden bg-white"
                  >
                    {INDIAN_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#3C4043] mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={formData.pinCode}
                    onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-[#DADCE0] rounded-lg focus:border-[#1A73E8] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Demonstration */}
            <div className="space-y-4 pt-4 border-t border-[#E8EAED]">
              <div className="flex items-center justify-between pb-2 border-b border-[#F1F3F4]">
                <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1A73E8] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Payment Method (Demonstration)</span>
                </h3>
                <span className="text-[11px] text-[#5F6368]">Simulated</span>
              </div>

              <div className="space-y-2">
                {/* Google Pay / UPI */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'gpay_upi'
                    ? 'border-[#1A73E8] bg-[#E8F0FE]/40'
                    : 'border-[#DADCE0] hover:bg-[#F8F9FA]'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="gpay_upi"
                      checked={formData.paymentMethod === 'gpay_upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'gpay_upi' })}
                      className="text-[#1A73E8]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#202124] flex items-center gap-1.5">
                        <span className="font-bold text-[#1A73E8]">Google Pay</span>
                        <span>/ UPI</span>
                      </div>
                      <div className="text-[11px] text-[#5F6368]">Instant authorization via UPI app or QR</div>
                    </div>
                  </div>
                  <QrCode className="w-5 h-5 text-[#1A73E8]" />
                </label>

                {/* Credit / Debit Card */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-[#1A73E8] bg-[#E8F0FE]/40'
                    : 'border-[#DADCE0] hover:bg-[#F8F9FA]'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className="text-[#1A73E8]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#202124]">Credit or Debit Card</div>
                      <div className="text-[11px] text-[#5F6368]">Visa, Mastercard, RuPay, Amex</div>
                    </div>
                  </div>
                  <CreditCard className="w-5 h-5 text-[#5F6368]" />
                </label>

                {/* NetBanking */}
                <label className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'netbanking'
                    ? 'border-[#1A73E8] bg-[#E8F0FE]/40'
                    : 'border-[#DADCE0] hover:bg-[#F8F9FA]'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      checked={formData.paymentMethod === 'netbanking'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'netbanking' })}
                      className="text-[#1A73E8]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#202124]">Net Banking</div>
                      <div className="text-[11px] text-[#5F6368]">All major Indian banks supported</div>
                    </div>
                  </div>
                  <Building className="w-5 h-5 text-[#5F6368]" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order */}
          <div className="lg:col-span-5 bg-[#F8F9FA] rounded-xl p-5 border border-[#E8EAED] flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-[#202124] pb-3 border-b border-[#E8EAED]">
                Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </h3>

              <div className="mt-3 space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-lg bg-white p-1 border border-[#E8EAED] shrink-0">
                        <img src={item.product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="max-w-[160px]">
                        <div className="font-medium text-[#202124] truncate">{item.product.name}</div>
                        <div className="text-[11px] text-[#70757A]">Qty: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="font-semibold text-[#202124]">
                      {region === 'IN'
                        ? `₹${(item.product.priceINR * item.quantity).toLocaleString('en-IN')}`
                        : `$${(item.product.priceUSD * item.quantity).toFixed(2)}`}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-4 pt-4 border-t border-[#E8EAED] space-y-2 text-xs text-[#5F6368]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#202124]">
                    {region === 'IN' ? `₹${subtotalINR.toLocaleString('en-IN')}` : `$${subtotalUSD.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>
                    {region === 'IN' ? (
                      deliveryFeeINR === 0 ? <span className="text-[#188038] font-semibold">FREE</span> : `₹${deliveryFeeINR}`
                    ) : (
                      deliveryFeeUSD === 0 ? <span className="text-[#188038] font-semibold">FREE</span> : `$${deliveryFeeUSD.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DADCE0] text-base font-bold text-[#202124]">
                  <span>Total Due</span>
                  <span>
                    {region === 'IN' ? `₹${totalINR.toLocaleString('en-IN')}` : `$${totalUSD.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <div className="space-y-2 pt-2">
              <button
                id="place-order-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-[#1A73E8] hover:bg-[#1765CC] disabled:opacity-75 text-white font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Authorizing simulated order...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Place Order ({region === 'IN' ? `₹${totalINR.toLocaleString('en-IN')}` : `$${totalUSD.toFixed(2)}`})</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-center text-[#70757A]">
                By placing this order, you confirm acceptance of prototype test terms.
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
