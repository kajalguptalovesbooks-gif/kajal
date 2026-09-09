import React, { useState, useEffect, useCallback } from 'react';
import { PRODUCTS } from './data/products';
import {
  Product,
  Category,
  Region,
  CartItem,
  ConfirmedOrder,
  AnalyticsLog,
  FeedbackReason,
  DeliveryCheckResult,
} from './types';
import { Header } from './components/Header';
import { FestiveHeroBanner } from './components/FestiveHeroBanner';
import { CountdownTimer } from './components/CountdownTimer';
import { FestiveCollection } from './components/FestiveCollection';
import { ProductListing } from './components/ProductListing';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { UserFeedbackModal } from './components/UserFeedbackModal';
import { ExperimentDrawer } from './components/ExperimentDrawer';
import { Footer } from './components/Footer';
import { TravelingPetalTrail } from './components/FestiveMotion';

export default function App() {
  // Core prototype states
  const [region, setRegion] = useState<Region>('IN');
  const [festivalMode, setFestivalMode] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State (Starts empty for genuine first-time shopping experience)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Festive Motion states
  const [petalTrail, setPetalTrail] = useState<{
    startX: number;
    startY: number;
    targetX: number;
    targetY: number;
  } | null>(null);
  const [cartPulse, setCartPulse] = useState<boolean>(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [isExperimentOpen, setIsExperimentOpen] = useState<boolean>(false);

  // Analytics telemetry log (PRD Section 22)
  const [analyticsLogs, setAnalyticsLogs] = useState<AnalyticsLog[]>([]);

  // Log an event helper
  const logEvent = useCallback(
    (eventName: AnalyticsLog['eventName'], details?: Record<string, unknown>) => {
      const newLog: AnalyticsLog = {
        id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        eventName,
        details,
      };
      setAnalyticsLogs((prev) => [newLog, ...prev]);
    },
    []
  );

  // Initial visit log
  useEffect(() => {
    logEvent('homepage_visit', { region: 'IN', festivalMode: true });
  }, [logEvent]);

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
    clientX?: number,
    clientY?: number
  ) => {
    // Trigger petal trail if active in Festival Mode and not already active
    if (festivalMode && region === 'IN' && !petalTrail) {
      const cartBtn = document.getElementById('cart-drawer-toggle-btn');
      if (cartBtn) {
        const rect = cartBtn.getBoundingClientRect();
        setPetalTrail({
          startX: clientX ?? window.innerWidth / 2,
          startY: clientY ?? window.innerHeight / 2,
          targetX: rect.left + rect.width / 2,
          targetY: rect.top + rect.height / 2,
        });
      }
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });

    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1800);

    logEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      quantity,
      priceINR: product.priceINR,
    });
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();

    // Trigger subtle traveling petal trail toward cart in Festival Mode
    if (festivalMode && region === 'IN') {
      const cartBtn = document.getElementById('cart-drawer-toggle-btn');
      if (cartBtn) {
        const rect = cartBtn.getBoundingClientRect();
        setPetalTrail({
          startX: e.clientX,
          startY: e.clientY,
          targetX: rect.left + rect.width / 2,
          targetY: rect.top + rect.height / 2,
        });
      }
    }

    handleAddToCart(
      product,
      1,
      product.sizes ? product.sizes[0] : undefined,
      product.colors ? product.colors[0].name : undefined
    );
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Region Toggle
  const handleRegionChange = (newRegion: Region) => {
    setRegion(newRegion);
    logEvent('region_change', { from: region, to: newRegion });
  };

  // Festival Mode Toggle (PRD Section 19)
  const handleToggleFestivalMode = () => {
    setFestivalMode((prev) => {
      const next = !prev;
      logEvent('mode_toggle', { festivalMode: next });
      return next;
    });
  };

  // Banner Navigation
  const handleExploreFestive = () => {
    logEvent('festive_banner_click', { target: 'festive-picks' });
    const el = document.getElementById('festive-picks');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreGeneral = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Product Detail Selection
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    logEvent('product_view', {
      productId: product.id,
      productName: product.name,
      isFestive: product.isFestivePick,
    });
  };

  // PIN Delivery Check Log
  const handleLogPinCheck = (pin: string, result: DeliveryCheckResult) => {
    logEvent('pin_check', {
      pin,
      status: result.status,
      city: result.city,
      days: result.estimatedDays,
    });
  };

  // Checkout Flow
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    logEvent('checkout_initiate', {
      itemsCount: cart.length,
      totalINR: cart.reduce((acc, i) => acc + i.product.priceINR * i.quantity, 0),
    });
  };

  const handlePlaceOrder = (order: ConfirmedOrder) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
    setCart([]); // clear cart
    logEvent('purchase_complete', {
      orderId: order.orderId,
      total: order.total,
      currency: order.currency,
      pinCode: order.shippingDetails.pinCode,
    });
  };

  // Feedback Submission (PRD Section 16)
  const handleSubmitFeedback = (reason: FeedbackReason, note?: string) => {
    logEvent('feedback_submitted', { reason, note });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#202124]">
      {/* Primary Sticky Header with Region & Festival Mode Controls */}
      <Header
        region={region}
        onRegionChange={handleRegionChange}
        festivalMode={festivalMode}
        onToggleFestivalMode={handleToggleFestivalMode}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => {
          setIsCartOpen(true);
          logEvent('cart_view', { itemsCount: cart.length });
        }}
        onOpenExperiment={() => setIsExperimentOpen(true)}
        cartPulse={cartPulse}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner (Festive variant when active, standard control banner when off) */}
        <FestiveHeroBanner
          region={region}
          festivalMode={festivalMode}
          onExploreFestive={handleExploreFestive}
          onExploreGeneral={handleExploreGeneral}
        />

        {/* Limited-time Festive Countdown Timer (PRD Section 9) */}
        {festivalMode && region === 'IN' && (
          <CountdownTimer />
        )}

        {/* Temporary Ganesh Chaturthi Picks Collection (PRD Section 8) */}
        <FestiveCollection
          products={PRODUCTS}
          region={region}
          festivalMode={festivalMode}
          onSelectProduct={handleSelectProduct}
          onQuickAdd={handleQuickAdd}
          justAddedId={justAddedId}
        />

        {/* Regular Merchandise & Catalog Listing with Filters & Sorting (PRD Section 11 & 12) */}
        <ProductListing
          products={PRODUCTS}
          region={region}
          festivalMode={festivalMode}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSelectProduct={handleSelectProduct}
          onQuickAdd={handleQuickAdd}
          justAddedId={justAddedId}
        />
      </main>

      {/* Standard E-Commerce Footer with India Experiment Disclaimers */}
      <Footer
        region={region}
        festivalMode={festivalMode}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenExperiment={() => setIsExperimentOpen(true)}
      />

      {/* Product Detail Modal with India PIN Code Delivery Verification */}
      <ProductDetailModal
        product={selectedProduct}
        allProducts={PRODUCTS}
        region={region}
        festivalMode={festivalMode}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onLogPinCheck={handleLogPinCheck}
        onSelectAnotherProduct={handleSelectProduct}
      />

      {/* Sliding Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        region={region}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onOpenFeedbackPrompt={() => {
          setIsCartOpen(false);
          setIsFeedbackOpen(true);
        }}
      />

      {/* Simplified Demonstration Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          // Suggest feedback when closing checkout
          setTimeout(() => setIsFeedbackOpen(true), 300);
        }}
        items={cart}
        region={region}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Order Confirmed Celebration Screen */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        isFestiveActive={festivalMode && region === 'IN'}
      />

      {/* Purchase Intent Drop-Off Feedback Modal (PRD Section 16) */}
      <UserFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmitFeedback={handleSubmitFeedback}
      />

      {/* GA4 Experiment & Live Telemetry Drawer */}
      <ExperimentDrawer
        isOpen={isExperimentOpen}
        onClose={() => setIsExperimentOpen(false)}
        logs={analyticsLogs}
        festivalMode={festivalMode}
        region={region}
        onToggleFestivalMode={handleToggleFestivalMode}
        onSetRegion={setRegion}
        onClearLogs={() => setAnalyticsLogs([])}
      />

      {/* Add-to-Cart Petal Trail (Active only in Festival Mode for India) */}
      {festivalMode && region === 'IN' && petalTrail && (
        <TravelingPetalTrail
          isActive={!!petalTrail}
          startX={petalTrail.startX}
          startY={petalTrail.startY}
          targetX={petalTrail.targetX}
          targetY={petalTrail.targetY}
          onComplete={() => {
            setPetalTrail(null);
            setCartPulse(true);
            setTimeout(() => setCartPulse(false), 500);
          }}
        />
      )}
    </div>
  );
}
