import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'gms-01',
    name: 'Google Organic Cotton Unisex T-Shirt',
    category: 'Apparel',
    priceINR: 1799,
    priceUSD: 24.0,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.8,
    reviewsCount: 142,
    description: '100% certified organic ring-spun cotton with the iconic minimalist Google chest print. Breathable, durable, and crafted for everyday comfort during seasonal celebrations.',
    badge: 'Best Seller',
    isFestivePick: true,
    festiveTag: 'Festive Pick',
    festiveHighlight: 'Comfortable 100% organic cotton for family gatherings and festive pooja days.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Warm Marigold', hex: '#E37400' },
      { name: 'Google Slate', hex: '#3C4043' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    inStock: true,
    material: '100% Certified Organic Cotton',
  },
  {
    id: 'gms-02',
    name: 'Google Chrome Eco Insulated Water Bottle (750ml)',
    category: 'Drinkware',
    priceINR: 2099,
    priceUSD: 26.0,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewsCount: 218,
    description: 'Double-walled vacuum insulated stainless steel keeps your beverages ice cold for 24 hours or piping hot for 12 hours. Featuring a laser-etched Chrome motif.',
    badge: 'Festive Favorite',
    isFestivePick: true,
    festiveTag: 'Special Edition',
    festiveHighlight: 'An eco-friendly celebration gift that replaces single-use plastics.',
    colors: [
      { name: 'Brushed Golden Brass', hex: '#D4AF37' },
      { name: 'Matte Onyx', hex: '#202124' },
      { name: 'Alpine Frost', hex: '#E8EAED' },
    ],
    inStock: true,
    material: '18/8 Food-Grade Stainless Steel',
    dimensions: '750ml capacity (25 oz)',
  },
  {
    id: 'gms-03',
    name: 'Android Festive Collectible Figurine',
    category: 'Accessories',
    priceINR: 1299,
    priceUSD: 16.0,
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.9,
    reviewsCount: 380,
    description: 'The beloved Android mascot in a limited seasonal desk-edition finish. Poseable rotating arms with high-precision matte vinyl sculpting. Perfect festive workstation companion.',
    badge: 'Limited Run',
    isFestivePick: true,
    festiveTag: 'Limited Edition',
    festiveHighlight: 'Delightful collector piece to brighten up your desk for the festive season.',
    colors: [
      { name: 'Festive Gold Edition', hex: '#FBBC04' },
      { name: 'Classic Android Green', hex: '#34A853' },
    ],
    inStock: true,
    material: 'Non-toxic Vinyl',
    dimensions: '3.25 inches tall',
  },
  {
    id: 'gms-04',
    name: 'Google Campus Recycled Commuter Backpack (22L)',
    category: 'Bags & Lifestyle',
    priceINR: 4499,
    priceUSD: 59.0,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
    ],
    rating: 4.7,
    reviewsCount: 96,
    description: 'Water-resistant city commuter backpack manufactured from 24 recycled plastic bottles. Features a dedicated 16-inch padded laptop compartment and discreet luggage pass-through.',
    badge: 'Top Rated',
    isFestivePick: true,
    festiveTag: 'Festive Gift Idea',
    festiveHighlight: 'A durable, premium gift for college students and working professionals.',
    colors: [
      { name: 'Anthracite Grey', hex: '#2C3038' },
      { name: 'Subtle Earth Tan', hex: '#A89F91' },
    ],
    inStock: true,
    material: '100% Recycled PET Polyester',
    dimensions: '46cm x 30cm x 15cm',
  },
  {
    id: 'gms-05',
    name: 'Google Minimalist Ceramic Coffee Mug (350ml)',
    category: 'Drinkware',
    priceINR: 899,
    priceUSD: 12.0,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 164,
    description: 'Stoneware matte exterior with a smooth gloss interior. Designed with an ergonomic broad handle and subtle debossed Google 4-color underline.',
    isFestivePick: false,
    colors: [
      { name: 'Warm Cream', hex: '#F1EFEA' },
      { name: 'Charcoal Black', hex: '#202124' },
    ],
    inStock: true,
    material: 'High-fire Stoneware Ceramic',
  },
  {
    id: 'gms-06',
    name: 'Google Pixel Cable & Tech Accessory Pouch',
    category: 'Accessories',
    priceINR: 1599,
    priceUSD: 22.0,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 112,
    description: 'Weatherproof origami-style expandable tech organizer. Keep chargers, dongles, power banks, earbuds, and stylus neatly sorted.',
    isFestivePick: true,
    festiveTag: 'Popular Pick',
    festiveHighlight: 'Great for traveling home to visit family during festive holidays.',
    colors: [
      { name: 'Storm Grey', hex: '#5F6368' },
      { name: 'Hazel Sage', hex: '#879589' },
    ],
    inStock: true,
    material: 'Weatherproof Recycled Poly Canvas',
  },
  {
    id: 'gms-07',
    name: 'Google Heavyweight French Terry Zip Hoodie',
    category: 'Apparel',
    priceINR: 3499,
    priceUSD: 48.0,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewsCount: 88,
    description: '400 GSM heavyweight organic French terry cotton with custom nickel hardware, ribbed side panels, and embroidered tonal Google wordmark.',
    isFestivePick: false,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Heather Grey', hex: '#D2D3D5' },
      { name: 'Deep Midnight Navy', hex: '#1A233A' },
    ],
    inStock: true,
    material: '400 GSM Organic French Terry',
  },
  {
    id: 'gms-08',
    name: 'Google Recycled Canvas Everyday Tote Bag',
    category: 'Bags & Lifestyle',
    priceINR: 1199,
    priceUSD: 15.0,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewsCount: 75,
    description: 'Heavy-duty 14oz canvas tote with reinforced shoulder straps and internal zipped valuables pocket. Screen-printed with the iconic Google primary colors.',
    isFestivePick: true,
    festiveTag: 'Eco Festive',
    festiveHighlight: 'Sustainable and roomy for shopping traditional sweets and festive essentials.',
    colors: [
      { name: 'Natural Cotton', hex: '#F5F5DC' },
      { name: 'Forest Green', hex: '#1E4D2B' },
    ],
    inStock: true,
    material: '14oz 100% Recycled Cotton Duck',
  },
  {
    id: 'gms-09',
    name: 'Google Bamboo Hardcover Journal & Ballpoint Set',
    category: 'Accessories',
    priceINR: 999,
    priceUSD: 14.0,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewsCount: 63,
    description: 'Sustainable bamboo wood cover notebook with 160 lined pages of 100gsm recycled acid-free paper, paired with a matching weighted aluminum/bamboo pen.',
    isFestivePick: false,
    inStock: true,
    material: 'FSC-Certified Bamboo & Recycled Paper',
  },
  {
    id: 'gms-10',
    name: 'Google Heritage Stainless Steel Tumbler (450ml)',
    category: 'Drinkware',
    priceINR: 1899,
    priceUSD: 24.0,
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewsCount: 129,
    description: 'Splash-proof slide-lid tumbler fitting standard vehicle cup holders. Keeps your morning chai or iced brew at optimal temperature.',
    isFestivePick: false,
    colors: [
      { name: 'Glacier White', hex: '#FFFFFF' },
      { name: 'Google Blue', hex: '#1A73E8' },
    ],
    inStock: true,
    material: 'Double Wall Vacuum Stainless Steel',
  },
];

// Simulated PIN code database for India prototype delivery checks
export interface PinLocation {
  city: string;
  state: string;
  deliveryDays: string;
  expressAvailable: boolean;
}

export const KNOWN_PIN_CODES: Record<string, PinLocation> = {
  '400001': { city: 'Mumbai (Fort / South)', state: 'Maharashtra', deliveryDays: '2 - 3 business days', expressAvailable: true },
  '400050': { city: 'Mumbai (Bandra)', state: 'Maharashtra', deliveryDays: '2 - 3 business days', expressAvailable: true },
  '411001': { city: 'Pune (Camp)', state: 'Maharashtra', deliveryDays: '2 - 4 business days', expressAvailable: true },
  '110001': { city: 'New Delhi (Connaught Place)', state: 'Delhi NCR', deliveryDays: '2 - 3 business days', expressAvailable: true },
  '122002': { city: 'Gurugram (DLF)', state: 'Haryana', deliveryDays: '2 - 3 business days', expressAvailable: true },
  '560001': { city: 'Bengaluru (MG Road)', state: 'Karnataka', deliveryDays: '2 - 3 business days', expressAvailable: true },
  '560100': { city: 'Bengaluru (Electronic City)', state: 'Karnataka', deliveryDays: '2 - 4 business days', expressAvailable: true },
  '500081': { city: 'Hyderabad (Hitech City)', state: 'Telangana', deliveryDays: '2 - 4 business days', expressAvailable: true },
  '600001': { city: 'Chennai (George Town)', state: 'Tamil Nadu', deliveryDays: '3 - 5 business days', expressAvailable: true },
  '700001': { city: 'Kolkata (BBD Bagh)', state: 'West Bengal', deliveryDays: '3 - 5 business days', expressAvailable: true },
  '380001': { city: 'Ahmedabad (Lal Darwaja)', state: 'Gujarat', deliveryDays: '3 - 5 business days', expressAvailable: true },
  '302001': { city: 'Jaipur (MI Road)', state: 'Rajasthan', deliveryDays: '3 - 5 business days', expressAvailable: false },
  '682001': { city: 'Kochi (Fort Kochi)', state: 'Kerala', deliveryDays: '3 - 5 business days', expressAvailable: true },
  '226001': { city: 'Lucknow (Hazratganj)', state: 'Uttar Pradesh', deliveryDays: '4 - 6 business days', expressAvailable: false },
  '160017': { city: 'Chandigarh (Sector 17)', state: 'Chandigarh', deliveryDays: '3 - 4 business days', expressAvailable: true },
};

export function simulatePinCheck(pin: string): {
  isValid: boolean;
  city?: string;
  state?: string;
  deliveryDays?: string;
  expressAvailable?: boolean;
} {
  const cleaned = pin.trim();
  if (!/^\d{6}$/.test(cleaned)) {
    return { isValid: false };
  }

  if (KNOWN_PIN_CODES[cleaned]) {
    return { isValid: true, ...KNOWN_PIN_CODES[cleaned] };
  }

  // Generative simulation for any valid 6-digit Indian PIN code
  const firstDigit = cleaned.charAt(0);
  let state = 'India Hub';
  if (['1', '2'].includes(firstDigit)) state = 'Northern Region';
  else if (['3', '4'].includes(firstDigit)) state = 'Western Region';
  else if (['5', '6'].includes(firstDigit)) state = 'Southern Region';
  else if (['7', '8'].includes(firstDigit)) state = 'Eastern Region';

  return {
    isValid: true,
    city: `Standard Delivery Zone (${cleaned})`,
    state,
    deliveryDays: '4 - 6 business days',
    expressAvailable: false,
  };
}
