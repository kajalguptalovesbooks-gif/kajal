import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, HelpCircle } from 'lucide-react';
import { CartItem, Region } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  region: Region;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  onOpenFeedbackPrompt: () => void;
  onSelectCategory?: (category: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  region,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onOpenFeedbackPrompt,
  onSelectCategory,
}) => {
  if (!isOpen) return null;

  // Calculate Subtotals
  const subtotalINR = items.reduce((acc, item) => acc + item.product.priceINR * item.quantity, 0);
  const subtotalUSD = items.reduce((acc, item) => acc + item.product.priceUSD * item.quantity, 0);

  // Delivery fee logic
  // In India: Free shipping over ₹1,999; else ₹150
  const deliveryFeeINR = subtotalINR >= 1999 || items.length === 0 ? 0 : 150;
  const deliveryFeeUSD = subtotalUSD >= 50 || items.length === 0 ? 0 : 5.0;

  const totalINR = subtotalINR + deliveryFeeINR;
  const totalUSD = subtotalUSD + deliveryFeeUSD;

  const handleCloseAndCheckAbandonment = () => {
    onClose();
    // If cart has items, trigger soft feedback nudge after brief timeout if not already answered
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-[#DADCE0] animate-in slide-in-from-right duration-250">
        {/* Cart Header */}
        <div className="p-5 border-b border-[#E8EAED] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#1A73E8]" />
            <h2 className="text-base font-bold text-[#202124]">
              Shopping Cart ({items.reduce((sum, i) => sum + i.quantity, 0)})
            </h2>
            {region === 'IN' && (
              <span className="text-[10px] font-semibold bg-[#E8F0FE] text-[#1A73E8] px-2 py-0.5 rounded-full">
                India 🇮🇳
              </span>
            )}
          </div>
          <button
            onClick={handleCloseAndCheckAbandonment}
            className="p-1.5 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] transition-colors"
            title="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#F1F3F4]">
          {items.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F8F9FA] flex items-center justify-center mx-auto text-[#BDC1C6] border border-[#E8EAED]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold text-[#202124] text-base">Your cart is empty</h3>
                <p className="text-xs text-[#5F6368] max-w-xs mx-auto mt-1 leading-relaxed">
                  You haven't added any Google merchandise yet. Explore categories below to start shopping:
                </p>
              </div>

              {/* Category jump buttons */}
              <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto pt-2">
                {[
                  { name: 'Apparel', label: 'Apparel' },
                  { name: 'Drinkware', label: 'Drinkware' },
                  { name: 'Bags & Lifestyle', label: 'Bags & Gear' },
                  { name: 'Accessories', label: 'Accessories' },
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      if (onSelectCategory) onSelectCategory(cat.name);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl border border-[#DADCE0] hover:border-[#1A73E8] hover:bg-[#E8F0FE]/40 text-xs font-medium text-[#3C4043] transition-colors text-center cursor-pointer"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#1A73E8] hover:bg-[#1765CC] text-white text-xs font-semibold rounded-full shadow-xs transition-colors cursor-pointer"
                >
                  Browse All Merchandise
                </button>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex space-x-3">
                {/* Product Thumbnail */}
                <div className="w-20 h-20 bg-[#F8F9FA] rounded-xl p-2 shrink-0 border border-[#E8EAED] flex items-center justify-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                {/* Info & Controls */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-semibold text-[#202124] line-clamp-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#9AA0A6] hover:text-[#EA4335] p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {(item.selectedSize || item.selectedColor) && (
                      <div className="text-[11px] text-[#70757A] mt-0.5">
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        {item.selectedSize && item.selectedColor && <span> • </span>}
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="font-bold text-xs sm:text-sm text-[#202124]">
                      {region === 'IN' ? (
                        <span>₹{(item.product.priceINR * item.quantity).toLocaleString('en-IN')}</span>
                      ) : (
                        <span>${(item.product.priceUSD * item.quantity).toFixed(2)}</span>
                      )}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-[#DADCE0] rounded-lg bg-[#F8F9FA] overflow-hidden">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#5F6368] hover:bg-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-semibold text-[#202124]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#5F6368] hover:bg-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer / Checkout CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E8EAED] bg-[#F8F9FA] space-y-3">
            {/* Free shipping progress bar for India */}
            {region === 'IN' && (
              <div className="bg-white p-2.5 rounded-xl border border-[#E8EAED] text-xs">
                {subtotalINR >= 1999 ? (
                  <div className="text-[#188038] font-semibold flex items-center gap-1.5">
                    <Truck className="w-4 h-4" />
                    <span>Free delivery unlocked on this prototype order!</span>
                  </div>
                ) : (
                  <div className="text-[#5F6368] space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span>Add ₹{(1999 - subtotalINR).toLocaleString('en-IN')} more for free delivery</span>
                      <span className="font-semibold">{Math.round((subtotalINR / 1999) * 100)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#E8EAED] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#1A73E8] rounded-full transition-all"
                        style={{ width: `${Math.min(100, (subtotalINR / 1999) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs text-[#5F6368]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#202124]">
                  {region === 'IN' ? `₹${subtotalINR.toLocaleString('en-IN')}` : `$${subtotalUSD.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {region === 'IN' ? (
                    deliveryFeeINR === 0 ? (
                      <span className="text-[#188038] font-medium">FREE</span>
                    ) : (
                      `₹${deliveryFeeINR}`
                    )
                  ) : deliveryFeeUSD === 0 ? (
                    <span className="text-[#188038] font-medium">FREE</span>
                  ) : (
                    `$${deliveryFeeUSD.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#DADCE0] text-sm font-bold text-[#202124]">
                <span>Total</span>
                <span>
                  {region === 'IN' ? `₹${totalINR.toLocaleString('en-IN')}` : `$${totalUSD.toFixed(2)}`}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={onProceedToCheckout}
              className="w-full py-3 bg-[#1A73E8] hover:bg-[#1765CC] text-white font-semibold text-sm rounded-xl flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Soft feedback nudge / What stopped you */}
            <div className="flex items-center justify-between pt-1 text-[11px] text-[#70757A]">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#188038]" />
                <span>Simulated checkout • Prototype test</span>
              </span>
              <button
                onClick={onOpenFeedbackPrompt}
                className="text-[#1A73E8] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Feedback</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
