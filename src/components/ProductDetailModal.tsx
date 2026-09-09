import React, { useState, useMemo } from 'react';
import { X, Star, Truck, CheckCircle2, AlertCircle, ShieldCheck, Heart, Share2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Product, Region, DeliveryCheckResult } from '../types';
import { simulatePinCheck } from '../data/products';
import { DiyaIcon, ModakAccent } from './FestiveMotif';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts?: Product[];
  region: Region;
  festivalMode: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
  onLogPinCheck?: (pin: string, result: DeliveryCheckResult) => void;
  onSelectAnotherProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts = [],
  region,
  festivalMode,
  onClose,
  onAddToCart,
  onLogPinCheck,
  onSelectAnotherProduct,
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

  // Quick PIN shortcuts
  const popularPins = [
    { pin: '400001', city: 'Mumbai' },
    { pin: '110001', city: 'New Delhi' },
    { pin: '560001', city: 'Bengaluru' },
    { pin: '500081', city: 'Hyderabad' },
    { pin: '411001', city: 'Pune' },
  ];

  const runPinCheck = (pinToTest: string) => {
    if (!pinToTest) return;
    setIsCheckingPin(true);
    setTimeout(() => {
      const sim = simulatePinCheck(pinToTest);
      let result: DeliveryCheckResult;

      if (sim.isValid) {
        result = {
          pinCode: pinToTest,
          status: 'available',
          city: sim.city,
          state: sim.state,
          estimatedDays: sim.deliveryDays,
          message: `Delivery available to ${sim.city || 'your address'} (${pinToTest})`,
        };
      } else {
        result = {
          pinCode: pinToTest,
          status: 'unavailable',
          message: 'Please enter a valid 6-digit Indian Postal PIN Code.',
        };
      }

      setDeliveryResult(result);
      setIsCheckingPin(false);
      if (onLogPinCheck) {
        onLogPinCheck(pinToTest, result);
      }
    }, 350);
  };

  const handleCheckDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    runPinCheck(pinInput);
  };

  const handleQuickPinClick = (pin: string) => {
    setPinInput(pin);
    runPinCheck(pin);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  // Recommended complementary products (Priority 4)
  const recommendations = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    return allProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 3);
  }, [allProducts, product.id]);

  const isFestiveItem = festivalMode && region === 'IN' && product.isFestivePick;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#DADCE0]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] transition-colors border border-[#E8EAED] cursor-pointer"
          title="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
            {/* Left Column: Image Stage */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-square bg-[#F8F9FA] rounded-2xl p-8 flex items-center justify-center border border-[#E8EAED] relative overflow-hidden">
                {isFestiveItem && (
                  <div className="absolute top-3 left-3 z-10 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D] shadow-xs">
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
                      <span>₹{product.priceINR.toLocaleString('en-IN')}</span>
                    ) : (
                      <span>${product.priceUSD.toFixed(2)}</span>
                    )}
                  </div>
                  {region === 'IN' && (
                    <div className="text-xs text-[#5F6368]">
                      <span>GST Included</span>
                      <span className="ml-2 text-[#188038] font-medium">• Free shipping above ₹1,999</span>
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
                      <span className="font-semibold">Festive Celebration Highlight: </span>
                      <span>{product.festiveHighlight}</span>
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && (
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-[#202124] mb-2">
                      <span>Select Size</span>
                      <span className="text-[#1A73E8]">Standard Fit</span>
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
                      className="w-8 h-8 flex items-center justify-center text-[#5F6368] hover:text-[#202124] font-medium rounded-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-semibold text-[#202124]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#5F6368] hover:text-[#202124] font-medium rounded-lg hover:bg-white transition-colors cursor-pointer"
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

                {/* INDIA LOCALIZATION SECTION: PIN Code Delivery Check (Priority 2) */}
                {region === 'IN' && (
                  <div className="mt-4 pt-4 border-t border-[#E8EAED] bg-[#F8F9FA] p-4 rounded-xl border border-[#E8EAED]">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#202124] mb-2">
                      <div className="flex items-center space-x-1.5">
                        <Truck className="w-4 h-4 text-[#1A73E8]" />
                        <span>Check Delivery Availability</span>
                      </div>
                      <span className="text-[11px] font-normal text-[#188038]">Pan-India Coverage</span>
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
                        {isCheckingPin ? 'Checking...' : 'Check PIN'}
                      </button>
                    </form>

                    {/* Quick test PIN shortcuts */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="text-[#70757A]">Quick PINs:</span>
                      {popularPins.map((p) => (
                        <button
                          key={p.pin}
                          type="button"
                          onClick={() => handleQuickPinClick(p.pin)}
                          className="px-2 py-0.5 bg-white hover:bg-[#E8F0FE] text-[#3C4043] hover:text-[#1A73E8] rounded border border-[#DADCE0] transition-colors cursor-pointer"
                        >
                          {p.city} ({p.pin})
                        </button>
                      ))}
                    </div>

                    {/* Delivery check feedback results */}
                    {deliveryResult.status === 'available' && (
                      <div className="mt-3 p-2.5 bg-[#E6F4EA] rounded-lg border border-[#CEEAD6] text-xs text-[#137333] space-y-1 animate-in fade-in">
                        <div className="font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-[#188038]" />
                          <span>✓ Delivery available to {deliveryResult.city} ({deliveryResult.pinCode})</span>
                        </div>
                        <div className="text-[11px] text-[#1e8e3e] pl-5">
                          Estimated delivery time: <strong>{deliveryResult.estimatedDays}</strong>
                        </div>
                        <div className="text-[10px] text-[#137333]/80 pl-5">
                          ⚡ Dispatched from nearest Indian fulfillment hub with live tracking.
                        </div>
                      </div>
                    )}

                    {deliveryResult.status === 'unavailable' && (
                      <div className="mt-3 p-2.5 bg-[#FCE8E6] rounded-lg border border-[#FAD2CF] text-xs text-[#C5221F] flex items-center gap-1.5 animate-in fade-in">
                        <AlertCircle className="w-4 h-4 text-[#EA4335] shrink-0" />
                        <span>{deliveryResult.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Complementary Product Recommendations (Priority 4 Product Discovery) */}
          {recommendations.length > 0 && (
            <div className="pt-6 border-t border-[#E8EAED]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[#202124] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  <span>You Might Also Like • Complete Your Gifting</span>
                </h3>
                <span className="text-xs text-[#70757A]">Complementary Google Gear</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => onSelectAnotherProduct && onSelectAnotherProduct(rec)}
                    className="p-3 rounded-xl border border-[#E8EAED] hover:border-[#1A73E8] bg-[#F8F9FA] hover:bg-white transition-all cursor-pointer flex items-center space-x-3 group"
                  >
                    <div className="w-14 h-14 rounded-lg bg-white p-1 border border-[#E8EAED] flex items-center justify-center shrink-0">
                      <img src={rec.image} alt={rec.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#202124] truncate group-hover:text-[#1A73E8] transition-colors">
                        {rec.name}
                      </h4>
                      <div className="text-xs font-bold text-[#202124] mt-0.5">
                        {region === 'IN' ? `₹${rec.priceINR.toLocaleString('en-IN')}` : `$${rec.priceUSD.toFixed(2)}`}
                      </div>
                      <span className="text-[10px] text-[#1A73E8] flex items-center gap-0.5 mt-1 font-medium">
                        <span>View Details</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
