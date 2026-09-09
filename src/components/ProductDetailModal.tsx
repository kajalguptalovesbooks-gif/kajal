import React, { useState } from 'react';
import { X, Star, Truck, CheckCircle2, AlertCircle, ShieldCheck, Heart, Share2, ShoppingBag } from 'lucide-react';
import { Product, Region, DeliveryCheckResult } from '../types';
import { simulatePinCheck } from '../data/products';
import { DiyaIcon, ModakAccent } from './FestiveMotif';

interface ProductDetailModalProps {
  product: Product | null;
  region: Region;
  festivalMode: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onLogPinCheck?: (pin: string, result: DeliveryCheckResult) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  region,
  festivalMode,
  onClose,
  onAddToCart,
  onLogPinCheck,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors ? product.colors[0].name : '');
  const [quantity, setQuantity] = useState<number>(1);

  // India Delivery PIN Code Check state
  const [pinInput, setPinInput] = useState<string>('');
  const [deliveryResult, setDeliveryResult] = useState<DeliveryCheckResult>({
    pinCode: '',
    status: 'idle',
  });
  const [isCheckingPin, setIsCheckingPin] = useState<boolean>(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput) return;

    setIsCheckingPin(true);
    setTimeout(() => {
      const sim = simulatePinCheck(pinInput);
      let result: DeliveryCheckResult;

      if (sim.isValid) {
        result = {
          pinCode: pinInput,
          status: 'available',
          city: sim.city,
          state: sim.state,
          estimatedDays: sim.deliveryDays,
          message: `Delivery available to ${sim.city || 'your address'} (${pinInput})`,
        };
      } else {
        result = {
          pinCode: pinInput,
          status: 'unavailable',
          message: 'Please enter a valid 6-digit Indian Postal PIN Code (e.g. 400001, 110001, 560001).',
        };
      }

      setDeliveryResult(result);
      setIsCheckingPin(false);
      if (onLogPinCheck) {
        onLogPinCheck(pinInput, result);
      }
    }, 450);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const isFestiveItem = festivalMode && region === 'IN' && product.isFestivePick;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#DADCE0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] transition-colors border border-[#E8EAED]"
          title="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Left Column: Image Stage */}
          <div className="md:col-span-6 space-y-4">
            <div className="aspect-square bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-[#E8EAED] relative overflow-hidden">
              {isFestiveItem && (
                <div className="absolute top-3 left-3 z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]">
                  <DiyaIcon className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Ganesh Chaturthi Festive Pick</span>
                </div>
              )}
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              />
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex space-x-3">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl bg-[#F8F9FA] p-2 border transition-all cursor-pointer ${
                      selectedImage === img
                        ? 'border-[#1A73E8] ring-2 ring-[#1A73E8]/20'
                        : 'border-[#E8EAED] hover:border-[#BDC1C6]'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-[#5F6368] mb-1">
                  <span className="uppercase tracking-wider font-semibold text-[#1A73E8]">{product.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]" />
                    <span className="font-semibold text-[#202124]">{product.rating}</span>
                    <span className="text-[#70757A]">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-[#202124] leading-snug">
                  {product.name}
                </h1>
              </div>

              {/* Price display with localized INR emphasis */}
              <div className="flex items-baseline space-x-3 pb-3 border-b border-[#F1F3F4]">
                <div className="text-2xl sm:text-3xl font-bold text-[#202124]">
                  {region === 'IN' ? (
                    <span className="text-[#202124]">₹{product.priceINR.toLocaleString('en-IN')}</span>
                  ) : (
                    <span>${product.priceUSD.toFixed(2)}</span>
                  )}
                </div>
                {region === 'IN' && (
                  <div className="text-xs text-[#5F6368]">
                    <span>Incl. of all taxes</span>
                    <span className="ml-2 text-[#188038] font-medium">• Free shipping over ₹1,999</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#5F6368] leading-relaxed">
                {product.description}
              </p>

              {/* Festive context callout if applicable */}
              {isFestiveItem && product.festiveHighlight && (
                <div className="p-3 bg-[#FFFDF0] rounded-xl border border-[#FDE68A] text-xs text-[#92400E] flex items-start space-x-2">
                  <ModakAccent className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">Festive Seasonal Note: </span>
                    <span>{product.festiveHighlight}</span>
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && (
                <div>
                  <div className="flex justify-between text-xs font-semibold text-[#202124] mb-2">
                    <span>Select Size</span>
                    <span className="text-[#1A73E8] cursor-pointer hover:underline">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#202124] text-white border-[#202124]'
                            : 'bg-white text-[#3C4043] border-[#DADCE0] hover:border-[#202124]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.colors && (
                <div>
                  <div className="text-xs font-semibold text-[#202124] mb-2">
                    Color: <span className="font-normal text-[#5F6368]">{selectedColor}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'border-[#1A73E8] ring-2 ring-[#1A73E8]/30 scale-110'
                            : 'border-transparent hover:scale-105'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full shadow-inner border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Add to Cart Action */}
              <div className="flex items-center space-x-3 pt-2">
                <div className="flex items-center border border-[#DADCE0] rounded-xl bg-[#F8F9FA] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#5F6368] hover:text-[#202124] font-medium rounded-lg hover:bg-white transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-[#202124]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#5F6368] hover:text-[#202124] font-medium rounded-lg hover:bg-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCartClick}
                  className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                    isAddedSuccess
                      ? 'bg-[#188038] text-white shadow-sm'
                      : 'bg-[#1A73E8] hover:bg-[#1765CC] text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  {isAddedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>

              {/* INDIA LOCALIZATION SECTION: PIN Code Delivery Check (PRD Section 6.2 & 13) */}
              {region === 'IN' && (
                <div className="mt-6 pt-5 border-t border-[#E8EAED] bg-[#F8F9FA] p-4 rounded-xl border border-[#E8EAED]">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-[#202124] mb-2">
                    <Truck className="w-4 h-4 text-[#1A73E8]" />
                    <span>🇮🇳 Check delivery availability</span>
                  </div>

                  <form onSubmit={handleCheckDelivery} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="Enter 6-digit PIN code (e.g. 400001)"
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-2 bg-white text-xs text-[#202124] border border-[#DADCE0] rounded-lg focus:outline-hidden focus:border-[#1A73E8]"
                    />
                    <button
                      type="submit"
                      disabled={isCheckingPin || !pinInput}
                      className="px-4 py-2 bg-[#202124] hover:bg-[#3C4043] disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      {isCheckingPin ? 'Checking...' : 'Check Availability'}
                    </button>
                  </form>

                  {/* Simulated prototype feedback results */}
                  {deliveryResult.status === 'available' && (
                    <div className="mt-3 p-2.5 bg-[#E6F4EA] rounded-lg border border-[#CEEAD6] text-xs text-[#137333] space-y-1 animate-in fade-in">
                      <div className="font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                        <span>✓ Delivery available to this location</span>
                      </div>
                      <div className="text-[11px] text-[#1e8e3e] pl-5">
                        {deliveryResult.city} • Estimated delivery in {deliveryResult.estimatedDays}
                      </div>
                      <div className="text-[10px] text-[#137333]/80 pl-5">
                        ⚡ Fast dispatch from India regional distribution center.
                      </div>
                    </div>
                  )}

                  {deliveryResult.status === 'unavailable' && (
                    <div className="mt-3 p-2.5 bg-[#FCE8E6] rounded-lg border border-[#FAD2CF] text-xs text-[#C5221F] flex items-center gap-1.5 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-[#EA4335] shrink-0" />
                      <span>{deliveryResult.message}</span>
                    </div>
                  )}

                  <div className="mt-2 text-[10px] text-[#70757A] flex items-center justify-between">
                    <span>Try testing: 400001 (Mumbai), 110001 (Delhi), 560001 (Bengaluru)</span>
                    <span className="font-medium text-[#1A73E8]">Prototype Verification</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
