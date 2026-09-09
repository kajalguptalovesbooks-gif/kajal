export type Region = 'IN' | 'US';

export type Category = 'All' | 'Apparel' | 'Drinkware' | 'Bags & Lifestyle' | 'Accessories';

export type Occasion = 'All' | 'Family' | 'Friends' | 'Work' | 'Yourself';

export type PriceFilter = 'all' | 'under-1500' | 'under-2500' | 'above-2500';

export interface Product {
  id: string;
  name: string;
  category: Category;
  priceINR: number;
  priceUSD: number;
  image: string;
  gallery?: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  badge?: string;
  isFestivePick?: boolean;
  festiveTag?: string;
  festiveHighlight?: string;
  occasions?: ('Family' | 'Friends' | 'Work' | 'Yourself')[];
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  inStock: boolean;
  material?: string;
  dimensions?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface DeliveryCheckResult {
  pinCode: string;
  status: 'idle' | 'checking' | 'available' | 'unavailable';
  city?: string;
  state?: string;
  estimatedDays?: string;
  message?: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: 'gpay_upi' | 'card' | 'netbanking';
}

export interface ConfirmedOrder {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  currency: 'INR' | 'USD';
  shippingDetails: CheckoutFormData;
  estimatedDeliveryDate: string;
}

export interface AnalyticsLog {
  id: string;
  timestamp: string;
  eventName:
    | 'homepage_visit'
    | 'festive_banner_click'
    | 'festive_collection_view'
    | 'product_view'
    | 'pin_check'
    | 'add_to_cart'
    | 'cart_view'
    | 'checkout_initiate'
    | 'purchase_complete'
    | 'feedback_submitted'
    | 'mode_toggle'
    | 'region_change';
  details?: Record<string, unknown>;
}

export type FeedbackReason =
  | 'Price'
  | 'Shipping'
  | 'Delivery availability'
  | 'Payment'
  | 'Just browsing'
  | 'Not ready to buy'
  | 'Other';
