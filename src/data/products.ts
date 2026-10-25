export type CategoryName =
  | 'Fruits & Vegetables'
  | 'Dairy & Breakfast'
  | 'Snacks & Munchies'
  | 'Cold Drinks & Juices'
  | 'Instant Food'
  | 'Household & Cleaning'
  | 'Personal Care'
  | 'Bakery';

export interface Product {
  id: string;
  name: string;
  category: CategoryName;
  weight: string;
  price: number;
  mrp: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  tag?: 'Bestseller' | 'New';
  deliveryTime: string;
  image: string;
  description: string;
  highlights: string[];
  storageInfo: string;
}

export interface PromoBanner {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  category: CategoryName;
  bgClass: string;
  accentColor: string;
  badgeText: string;
}

export interface DeliveryLocation {
  id: string;
  label: string;
  area: string;
  pincode: string;
  eta: string;
}

export const CATEGORIES: { name: CategoryName; shortLabel: string; itemCount: number }[] = [
  { name: 'Fruits & Vegetables', shortLabel: 'Fruits & Veg', itemCount: 4 },
  { name: 'Dairy & Breakfast', shortLabel: 'Dairy & Eggs', itemCount: 4 },
  { name: 'Snacks & Munchies', shortLabel: 'Snacks', itemCount: 4 },
  { name: 'Cold Drinks & Juices', shortLabel: 'Drinks & Juices', itemCount: 4 },
  { name: 'Instant Food', shortLabel: 'Instant & Staples', itemCount: 6 },
  { name: 'Household & Cleaning', shortLabel: 'Household', itemCount: 4 },
  { name: 'Personal Care', shortLabel: 'Personal Care', itemCount: 3 },
  { name: 'Bakery', shortLabel: 'Bakery', itemCount: 3 },
];

export const DELIVERY_LOCATIONS: DeliveryLocation[] = [
  { id: 'del-110001', label: 'Delhi - 110001', area: 'Connaught Place, New Delhi', pincode: '110001', eta: '11 mins' },
  { id: 'del-110016', label: 'South Delhi - 110016', area: 'Hauz Khas & Green Park', pincode: '110016', eta: '12 mins' },
  { id: 'ggn-122002', label: 'Gurugram - 122002', area: 'DLF Phase IV & Galleria', pincode: '122002', eta: '10 mins' },
  { id: 'noi-201301', label: 'Noida - 201301', area: 'Sector 18 & Sector 15', pincode: '201301', eta: '14 mins' },
  { id: 'blr-560034', label: 'Bengaluru - 560034', area: 'Koramangala 4th Block', pincode: '560034', eta: '13 mins' },
  { id: 'mum-400050', label: 'Mumbai - 400050', area: 'Bandra West', pincode: '400050', eta: '15 mins' },
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: 'promo-fruits',
    kicker: 'FARM TO DOORSTEP',
    title: 'Flat 20% off on Fruits & Vegetables',
    subtitle: 'Handpicked morning harvest delivered chilled & crisp in 10 minutes.',
    category: 'Fruits & Vegetables',
    bgClass: 'from-emerald-950 via-emerald-900 to-[#0C831F]',
    accentColor: '#FACC15',
    badgeText: 'Up to 21% MRP Savings',
  },
  {
    id: 'promo-snacks',
    kicker: 'EVENING MUNCHIES',
    title: 'Buy 1 Get 1 Deals on Party Snacks',
    subtitle: 'Family pack potato chips, crispy bhujia, roasted almonds & chilled colas.',
    category: 'Snacks & Munchies',
    bgClass: 'from-amber-950 via-amber-900 to-yellow-700',
    accentColor: '#FEF08A',
    badgeText: 'Instant Party Pack Savings',
  },
  {
    id: 'promo-dairy',
    kicker: 'DAILY 7 AM ESSENTIALS',
    title: 'Fresh Dairy, Eggs & Morning Bakery',
    subtitle: 'Toned milk, table butter, cheese slices & brown bread at automatic MRP discounts.',
    category: 'Dairy & Breakfast',
    bgClass: 'from-slate-900 via-slate-800 to-emerald-950',
    accentColor: '#6EE7B7',
    badgeText: 'Everyday Lowest Prices',
  },
];

/**
 * Generates a high-craft 4:3 studio product illustration as an inline SVG data URI.
 * Ensures 100% instant, zero-broken-image rendering with distinct visual identity per product.
 */
function createProductStudioImage(
  bgStart: string,
  bgEnd: string,
  artworkSvg: string,
  badgeLabel: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgStart}" />
        <stop offset="100%" stop-color="${bgEnd}" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow" x="-15%" y="-15%" width="130%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.12" />
      </filter>
    </defs>
    <rect width="400" height="300" fill="url(#bg)" />
    <circle cx="200" cy="135" r="130" fill="url(#glow)" />
    <ellipse cx="200" cy="242" rx="95" ry="16" fill="#0f172a" opacity="0.08" />
    <g filter="url(#shadow)">
      ${artworkSvg}
    </g>
    <rect x="16" y="256" width="110" height="26" rx="6" fill="#ffffff" opacity="0.88" />
    <text x="71" y="273" font-family="sans-serif" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">${badgeLabel}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PRODUCTS: Product[] = [
  // ========================
  // 1. FRUITS & VEGETABLES
  // ========================
  {
    id: 'prod-bananas',
    name: 'Bananas (Robusta)',
    category: 'Fruits & Vegetables',
    weight: '1 dozen (12 pcs)',
    price: 60,
    mrp: 75,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 1420,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Naturally ripened, sweet and energy-rich Robusta bananas. Handpicked for uniform size and golden peel without blemishes.',
    highlights: ['Naturally ripened without carbide', 'Rich source of potassium & dietary fiber', 'Ideal for breakfast bowls & smoothies'],
    storageInfo: 'Store at room temperature away from direct sunlight.',
    image: createProductStudioImage(
      '#FEFCE8',
      '#FEF08A',
      `<path d="M125 185 C140 225, 235 230, 275 155 C285 135, 278 100, 265 90 C260 115, 240 175, 175 182 C145 185, 132 178, 125 185 Z" fill="#EAB308" stroke="#CA8A04" stroke-width="3"/>
       <path d="M135 162 C155 202, 245 205, 282 132 C290 112, 280 85, 268 78 C264 102, 242 155, 182 162 C152 165, 142 156, 135 162 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="3"/>
       <path d="M148 138 C170 178, 250 178, 285 108 C292 92, 282 72, 270 65 C265 88, 244 132, 190 140 C162 142, 154 132, 148 138 Z" fill="#FDE047" stroke="#EAB308" stroke-width="3"/>
       <path d="M258 60 L282 75 L275 92 L252 76 Z" fill="#65A30D" />`,
      'Fresh Harvest'
    ),
  },
  {
    id: 'prod-tomatoes',
    name: 'Tomatoes (Hybrid)',
    category: 'Fruits & Vegetables',
    weight: '1 kg',
    price: 38,
    mrp: 48,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 980,
    tag: 'Bestseller',
    deliveryTime: '11 mins',
    description: 'Firm, juicy red hybrid tomatoes sourced daily from local partner farms. Perfect for everyday Indian curries, dals, and fresh salads.',
    highlights: ['Farm-fresh daily morning harvest', 'Firm skin with rich tangy pulp', 'Hygienically cleaned and graded'],
    storageInfo: 'Keep in a cool dry place or refrigerate in vegetable crisper.',
    image: createProductStudioImage(
      '#FEF2F2',
      '#FECACA',
      `<circle cx="165" cy="165" r="52" fill="#DC2626" />
       <ellipse cx="148" cy="145" rx="14" ry="8" transform="rotate(-25 148 145)" fill="#FCA5A5" opacity="0.6" />
       <path d="M150 115 Q165 102 180 115 Q165 122 150 115 M165 103 L165 124 M145 120 L185 112" stroke="#15803D" stroke-width="5" stroke-linecap="round" fill="none"/>
       <circle cx="235" cy="175" r="48" fill="#EF4444" />
       <ellipse cx="220" cy="158" rx="12" ry="7" transform="rotate(-25 220 158)" fill="#FCA5A5" opacity="0.6" />
       <path d="M220 129 Q235 118 250 129 M235 118 L235 136 M218 133 L252 126" stroke="#16A34A" stroke-width="5" stroke-linecap="round" fill="none"/>`,
      '1 kg Pack'
    ),
  },
  {
    id: 'prod-potato',
    name: 'Potato (New Crop)',
    category: 'Fruits & Vegetables',
    weight: '1 kg',
    price: 32,
    mrp: 40,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 1650,
    deliveryTime: '10 mins',
    description: 'Clean, medium-sized new crop potatoes with thin skin and creamy texture. Versatile kitchen staple for parathas, sabzis, and fries.',
    highlights: ['Uniform medium-sized tubers', 'Low sugar content, great for frying & boiling', 'Zero mud, pre-brushed pack'],
    storageInfo: 'Store in a cool, dark, and well-ventilated basket.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FDE68A',
      `<ellipse cx="165" cy="170" rx="58" ry="42" transform="rotate(-12 165 170)" fill="#D97706" opacity="0.85" />
       <ellipse cx="163" cy="168" rx="55" ry="39" transform="rotate(-12 163 168)" fill="#F59E0B" />
       <circle cx="145" cy="160" r="2.5" fill="#92400E" />
       <circle cx="180" cy="178" r="2.5" fill="#92400E" />
       <ellipse cx="235" cy="182" rx="52" ry="38" transform="rotate(15 235 182)" fill="#D97706" />
       <ellipse cx="233" cy="180" rx="49" ry="35" transform="rotate(15 233 180)" fill="#FBBF24" />
       <circle cx="220" cy="172" r="2.5" fill="#92400E" />
       <circle cx="250" cy="188" r="2" fill="#92400E" />`,
      '1 kg Staples'
    ),
  },
  {
    id: 'prod-onions',
    name: 'Red Onions (Nashik)',
    category: 'Fruits & Vegetables',
    weight: '1 kg',
    price: 42,
    mrp: 55,
    discountPercent: 24,
    rating: 4.6,
    reviewCount: 890,
    deliveryTime: '11 mins',
    description: 'Pungent, firm Nashik red onions with dry papery outer skins. Essential base for Indian gravies, biryanis, and fresh kachumber salads.',
    highlights: ['Direct from Nashik mandis', 'Dry outer skin for longer shelf life', 'Rich aroma and crisp layers'],
    storageInfo: 'Store in an open mesh basket at room temperature.',
    image: createProductStudioImage(
      '#FAF5FF',
      '#E9D5FF',
      `<path d="M160 110 C160 110, 115 140, 115 180 C115 212, 138 228, 165 228 C192 228, 215 212, 215 180 C215 140, 170 110, 165 95 Z" fill="#9333EA" />
       <path d="M165 102 C145 135, 140 195, 165 226 C190 195, 185 135, 165 102 Z" fill="#A855F7" opacity="0.6" />
       <path d="M235 122 C235 122, 195 148, 195 185 C195 214, 215 228, 240 228 C265 228, 285 214, 285 185 C285 148, 245 122, 240 108 Z" fill="#7E22CE" />
       <path d="M240 115 C222 145, 218 195, 240 225 C262 195, 258 145, 240 115 Z" fill="#C084FC" opacity="0.5" />`,
      '1 kg Nashik'
    ),
  },

  // ========================
  // 2. DAIRY & BREAKFAST
  // ========================
  {
    id: 'prod-milk',
    name: 'Toned Milk',
    category: 'Dairy & Breakfast',
    weight: '500 ml',
    price: 27,
    mrp: 30,
    discountPercent: 10,
    rating: 4.9,
    reviewCount: 3420,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Pasteurized, homogenized fresh toned milk with 3% fat and 8.5% SNF. Delivered cold-chain fresh every morning for tea, coffee, and direct consumption.',
    highlights: ['Cold-chain maintained at 4°C', 'Fortified with Vitamins A & D', 'Zero preservatives or added powder'],
    storageInfo: 'Keep refrigerated below 4°C. Consume within 24 hours of opening.',
    image: createProductStudioImage(
      '#EFF6FF',
      '#DBEAFE',
      `<rect x="135" y="65" width="130" height="165" rx="18" fill="#FFFFFF" stroke="#BFDBFE" stroke-width="3" />
       <rect x="135" y="115" width="130" height="65" fill="#2563EB" />
       <text x="200" y="145" font-family="sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle">FRESH MILK</text>
       <text x="200" y="166" font-family="sans-serif" font-size="11" font-weight="600" fill="#DBEAFE" text-anchor="middle">TONED · 500 ml</text>
       <circle cx="200" cy="90" r="12" fill="#60A5FA" opacity="0.3" />
       <path d="M200 80 C193 90, 192 96, 200 98 C208 96, 207 90, 200 80 Z" fill="#2563EB" />`,
      '500 ml Pouch'
    ),
  },
  {
    id: 'prod-eggs',
    name: 'Eggs (6 pc)',
    category: 'Dairy & Breakfast',
    weight: '6 pcs',
    price: 55,
    mrp: 65,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 1280,
    tag: 'Bestseller',
    deliveryTime: '11 mins',
    description: 'UV-sanitized, farm-fresh white table eggs packed in a shock-proof molded pulp tray. High protein content with bright golden yolks.',
    highlights: ['6g natural protein per egg', 'UV-cleaned shells, crack-checked', 'Packed in recyclable protective carton'],
    storageInfo: 'Store in refrigerator egg tray for optimal freshness.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FEF3C7',
      `<rect x="105" y="150" width="190" height="70" rx="12" fill="#D97706" opacity="0.25" stroke="#B45309" stroke-width="2" />
       <ellipse cx="140" cy="145" rx="22" ry="30" fill="#FFFBEB" stroke="#E2E8F0" stroke-width="2" />
       <ellipse cx="200" cy="145" rx="22" ry="30" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="2" />
       <ellipse cx="260" cy="145" rx="22" ry="30" fill="#FFFBEB" stroke="#E2E8F0" stroke-width="2" />
       <rect x="112" y="165" width="176" height="45" rx="8" fill="#F59E0B" />
       <text x="200" y="193" font-family="sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">FARM FRESH · 6 EGGS</text>`,
      '6 pcs Carton'
    ),
  },
  {
    id: 'prod-butter',
    name: 'Butter (Pasteurized)',
    category: 'Dairy & Breakfast',
    weight: '100 g',
    price: 58,
    mrp: 62,
    discountPercent: 6,
    rating: 4.9,
    reviewCount: 2150,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Creamy, mildly salted pasteurized table butter churned from fresh sweet cream. Spreads effortlessly on warm toast and melts rich over parathas.',
    highlights: ['Made from 100% fresh dairy cream', 'Classic golden mildly salted taste', 'Rich source of Vitamin A'],
    storageInfo: 'Keep refrigerated below 4°C.',
    image: createProductStudioImage(
      '#FEFCE8',
      '#FEF08A',
      `<rect x="115" y="105" width="170" height="105" rx="10" fill="#FACC15" stroke="#CA8A04" stroke-width="3" />
       <rect x="125" y="115" width="150" height="85" rx="6" fill="#FEF9C3" />
       <text x="200" y="155" font-family="sans-serif" font-size="17" font-weight="800" fill="#854D0E" text-anchor="middle">TABLE BUTTER</text>
       <text x="200" y="177" font-family="sans-serif" font-size="12" font-weight="700" fill="#CA8A04" text-anchor="middle">CREAMY SALTED · 100g</text>`,
      '100 g Pack'
    ),
  },
  {
    id: 'prod-cheese',
    name: 'Cheese Slices',
    category: 'Dairy & Breakfast',
    weight: '200 g (10 slices)',
    price: 120,
    mrp: 140,
    discountPercent: 14,
    rating: 4.8,
    reviewCount: 940,
    deliveryTime: '12 mins',
    description: 'Individually wrapped, rich cow-milk cheese slices that melt evenly in grilled sandwiches, burgers, wraps, and maggi.',
    highlights: ['10 individually wrapped slices', 'Rich in calcium & milk protein', 'Melts smoothly in 30 seconds'],
    storageInfo: 'Keep refrigerated. Do not freeze.',
    image: createProductStudioImage(
      '#FFF7ED',
      '#FFEDD5',
      `<rect x="125" y="85" width="135" height="135" rx="12" transform="rotate(-6 192 152)" fill="#F59E0B" stroke="#D97706" stroke-width="2" />
       <rect x="135" y="90" width="135" height="135" rx="12" transform="rotate(4 202 157)" fill="#FBBF24" stroke="#D97706" stroke-width="2" />
       <rect x="145" y="125" width="115" height="65" rx="8" fill="#FFFFFF" opacity="0.92" />
       <text x="202" y="155" font-family="sans-serif" font-size="15" font-weight="800" fill="#9A3412" text-anchor="middle">CHEESE SLICES</text>
       <text x="202" y="175" font-family="sans-serif" font-size="11" font-weight="700" fill="#D97706" text-anchor="middle">10 SLICES · 200 g</text>`,
      '200 g Pack'
    ),
  },

  // ========================
  // 3. SNACKS & MUNCHIES
  // ========================
  {
    id: 'prod-chips',
    name: 'Chips (Family Pack)',
    category: 'Snacks & Munchies',
    weight: '150 g',
    price: 85,
    mrp: 100,
    discountPercent: 15,
    rating: 4.8,
    reviewCount: 1840,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Thinly sliced, crinkle-cut golden potato chips lightly seasoned with rock salt. Nitrogen-flushed family pack for extra crunch at house parties.',
    highlights: ['100% farm-grown potatoes', 'Zero trans-fat cooking oil', 'Stay-fresh nitrogen sealed family bag'],
    storageInfo: 'Store in a cool dry place. Seal clip after opening.',
    image: createProductStudioImage(
      '#FEF2F2',
      '#FDE68A',
      `<path d="M135 65 L265 65 L255 225 L145 225 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3" stroke-linejoin="round" />
       <path d="M132 65 L268 65 L262 78 L138 78 Z" fill="#FACC15" />
       <path d="M142 212 L258 212 L255 225 L145 225 Z" fill="#FACC15" />
       <circle cx="200" cy="142" r="42" fill="#FEF08A" />
       <ellipse cx="195" cy="140" rx="22" ry="15" transform="rotate(-15 195 140)" fill="#F59E0B" />
       <ellipse cx="210" cy="150" rx="20" ry="14" transform="rotate(20 210 150)" fill="#FBBF24" />
       <text x="200" y="110" font-family="sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">CLASSIC CHIPS</text>
       <text x="200" y="200" font-family="sans-serif" font-size="11" font-weight="700" fill="#FEF08A" text-anchor="middle">FAMILY PACK · 150g</text>`,
      '150 g Family Pack'
    ),
  },
  {
    id: 'prod-bhujia',
    name: 'Crispy Bikaneri Bhujia',
    category: 'Snacks & Munchies',
    weight: '400 g',
    price: 95,
    mrp: 115,
    discountPercent: 17,
    rating: 4.7,
    reviewCount: 760,
    deliveryTime: '11 mins',
    description: 'Authentic spicy moth bean and besan sev seasoned with black pepper, clove, and cardamom. The classic Indian tea-time companion.',
    highlights: ['Traditional Bikaneri recipe', 'Resealable stand-up zipper pouch', 'Crispy texture with bold spice kick'],
    storageInfo: 'Keep in an airtight container once opened.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FED7AA',
      `<rect x="135" y="65" width="130" height="160" rx="16" fill="#EA580C" stroke="#C2410C" stroke-width="3" />
       <rect x="148" y="95" width="104" height="90" rx="10" fill="#FFF7ED" />
       <text x="200" y="130" font-family="sans-serif" font-size="15" font-weight="800" fill="#9A3412" text-anchor="middle">BIKANERI</text>
       <text x="200" y="150" font-family="sans-serif" font-size="15" font-weight="800" fill="#EA580C" text-anchor="middle">BHUJIA SEV</text>
       <text x="200" y="172" font-family="sans-serif" font-size="11" font-weight="700" fill="#7C2D12" text-anchor="middle">SPICY & CRISPY · 400g</text>`,
      '400 g Value Pack'
    ),
  },
  {
    id: 'prod-almonds',
    name: 'Roasted Salted Almonds',
    category: 'Snacks & Munchies',
    weight: '200 g',
    price: 210,
    mrp: 260,
    discountPercent: 19,
    rating: 4.9,
    reviewCount: 530,
    tag: 'New',
    deliveryTime: '12 mins',
    description: 'Crunchy California almonds dry-roasted without oil and lightly dusted with Himalayan pink salt. High-protein guilt-free snacking.',
    highlights: ['100% oil-free dry roasted', 'Rich in Vitamin E & healthy fats', 'Vacuum-packed for maximum crunch'],
    storageInfo: 'Store in a cool, dry jar away from moisture.',
    image: createProductStudioImage(
      '#FDF4FF',
      '#F5D0FE',
      `<rect x="140" y="70" width="120" height="155" rx="18" fill="#701A75" stroke="#4A044E" stroke-width="3" />
       <circle cx="200" cy="145" r="38" fill="#FDF4FF" />
       <ellipse cx="192" cy="142" rx="16" ry="9" transform="rotate(-30 192 142)" fill="#B45309" />
       <ellipse cx="208" cy="150" rx="16" ry="9" transform="rotate(25 208 150)" fill="#92400E" />
       <text x="200" y="98" font-family="sans-serif" font-size="13" font-weight="800" fill="#F5D0FE" text-anchor="middle">ROASTED ALMONDS</text>
       <text x="200" y="206" font-family="sans-serif" font-size="11" font-weight="700" fill="#FFFFFF" text-anchor="middle">HIMALAYAN SALT · 200g</text>`,
      '200 g Premium'
    ),
  },
  {
    id: 'prod-popcorn',
    name: 'Caramel & Cheese Popcorn',
    category: 'Snacks & Munchies',
    weight: '120 g Tub',
    price: 99,
    mrp: 125,
    discountPercent: 21,
    rating: 4.7,
    reviewCount: 410,
    tag: 'New',
    deliveryTime: '11 mins',
    description: 'Gourmet mushroom-kernel popcorn combining rich golden butterscotch caramel and savory cheddar cheese in a movie-night sharing tub.',
    highlights: ['Air-popped jumbo mushroom kernels', 'Sweet & savory gourmet mix', 'Reusable airtight snack tub'],
    storageInfo: 'Keep tub lid tightly closed after opening.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FEF08A',
      `<circle cx="175" cy="88" r="16" fill="#FBBF24" />
       <circle cx="200" cy="82" r="18" fill="#F59E0B" />
       <circle cx="225" cy="88" r="16" fill="#FDE047" />
       <path d="M135 95 L265 95 L248 225 L152 225 Z" fill="#1E293B" stroke="#0F172A" stroke-width="3" />
       <rect x="148" y="125" width="104" height="65" rx="8" fill="#FACC15" />
       <text x="200" y="153" font-family="sans-serif" font-size="14" font-weight="800" fill="#0F172A" text-anchor="middle">GOURMET</text>
       <text x="200" y="173" font-family="sans-serif" font-size="13" font-weight="800" fill="#9A3412" text-anchor="middle">POPCORN TUB</text>`,
      '120 g Sharing Tub'
    ),
  },

  // ========================
  // 4. COLD DRINKS & JUICES
  // ========================
  {
    id: 'prod-cola',
    name: 'Cola 750ml',
    category: 'Cold Drinks & Juices',
    weight: '750 ml',
    price: 40,
    mrp: 45,
    discountPercent: 11,
    rating: 4.8,
    reviewCount: 2290,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Chilled, sparkling cola beverage in a convenient 750 ml party bottle. Delivered ice-cold for instant refreshment with meals and snacks.',
    highlights: ['Delivered chilled from cold storage', 'Strong fizz & classic caramel cola taste', 'Serves 3-4 glasses'],
    storageInfo: 'Serve chilled. Refrigerate after opening.',
    image: createProductStudioImage(
      '#FEF2F2',
      '#FECACA',
      `<rect x="186" y="45" width="28" height="16" rx="4" fill="#DC2626" />
       <path d="M186 61 L214 61 L228 105 L228 222 C228 230, 172 230, 172 222 L172 105 Z" fill="#292524" stroke="#1C1917" stroke-width="2" />
       <rect x="172" y="120" width="56" height="52" fill="#DC2626" />
       <text x="200" y="146" font-family="sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">SPARKLING</text>
       <text x="200" y="162" font-family="sans-serif" font-size="12" font-weight="700" fill="#FECACA" text-anchor="middle">COLA 750ml</text>`,
      '750 ml Chilled'
    ),
  },
  {
    id: 'prod-mango-drink',
    name: 'Alphonso Mango Fruit Drink',
    category: 'Cold Drinks & Juices',
    weight: '1 L',
    price: 65,
    mrp: 75,
    discountPercent: 13,
    rating: 4.8,
    reviewCount: 1120,
    deliveryTime: '11 mins',
    description: 'Thick, pulpy mango beverage crafted from ripe Ratnagiri & Alphonso mangoes. Loved by kids and families year-round.',
    highlights: ['Made with real Alphonso mango pulp', 'No synthetic colors or preservatives', '1 Litre family tetra pack'],
    storageInfo: 'Refrigerate after opening and consume within 3 days.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FDE68A',
      `<rect x="150" y="60" width="100" height="170" rx="10" fill="#F59E0B" stroke="#D97706" stroke-width="3" />
       <circle cx="200" cy="145" r="32" fill="#FEF08A" />
       <ellipse cx="200" cy="145" rx="22" ry="15" transform="rotate(-20 200 145)" fill="#EA580C" />
       <text x="200" y="95" font-family="sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle">MANGO PULP</text>
       <text x="200" y="208" font-family="sans-serif" font-size="12" font-weight="800" fill="#78350F" text-anchor="middle">1 LITRE PACK</text>`,
      '1 L Family Pack'
    ),
  },
  {
    id: 'prod-orange-juice',
    name: '100% Valencia Orange Juice',
    category: 'Cold Drinks & Juices',
    weight: '1 L',
    price: 110,
    mrp: 135,
    discountPercent: 19,
    rating: 4.7,
    reviewCount: 640,
    deliveryTime: '12 mins',
    description: 'Cold-pressed 100% Valencia orange juice with zero added sugar. Packed with natural Vitamin C for a refreshing morning boost.',
    highlights: ['0% added refined sugar', '100% pure squeezed orange juice', 'Rich in daily Vitamin C'],
    storageInfo: 'Shake well before serving. Keep refrigerated after opening.',
    image: createProductStudioImage(
      '#FFF7ED',
      '#FED7AA',
      `<rect x="150" y="60" width="100" height="170" rx="10" fill="#EA580C" stroke="#C2410C" stroke-width="3" />
       <circle cx="200" cy="145" r="30" fill="#FDBA74" stroke="#FFFFFF" stroke-width="3" />
       <circle cx="200" cy="145" r="22" fill="#F97316" />
       <text x="200" y="95" font-family="sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">100% ORANGE</text>
       <text x="200" y="208" font-family="sans-serif" font-size="11" font-weight="800" fill="#FFF7ED" text-anchor="middle">NO ADDED SUGAR</text>`,
      '1 L Pure Juice'
    ),
  },
  {
    id: 'prod-coconut-water',
    name: 'Tender Coconut Water',
    category: 'Cold Drinks & Juices',
    weight: '200 ml',
    price: 45,
    mrp: 55,
    discountPercent: 18,
    rating: 4.9,
    reviewCount: 820,
    tag: 'New',
    deliveryTime: '10 mins',
    description: 'Pure, naturally sweet Pollachi tender coconut water packed with natural electrolytes. Hydrating and refreshing with zero added sugar.',
    highlights: ['Sourced from Pollachi green coconuts', 'Natural potassium & electrolytes', 'Chilled & ready to drink'],
    storageInfo: 'Serve chilled.',
    image: createProductStudioImage(
      '#ECFDF5',
      '#A7F3D0',
      `<circle cx="200" cy="155" r="56" fill="#16A34A" stroke="#15803D" stroke-width="3" />
       <ellipse cx="200" cy="118" rx="36" ry="14" fill="#FEFCE8" stroke="#15803D" stroke-width="2" />
       <line x1="205" y1="115" x2="225" y2="62" stroke="#0EA5E9" stroke-width="6" stroke-linecap="round" />
       <text x="200" y="168" font-family="sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">COCONUT</text>
       <text x="200" y="185" font-family="sans-serif" font-size="11" font-weight="700" fill="#DCFCE7" text-anchor="middle">WATER · 200ml</text>`,
      '200 ml Natural'
    ),
  },

  // ========================
  // 5. INSTANT FOOD & STAPLES
  // ========================
  {
    id: 'prod-noodles',
    name: 'Instant Noodles (Pack of 4)',
    category: 'Instant Food',
    weight: '280 g (4 x 70 g)',
    price: 52,
    mrp: 60,
    discountPercent: 13,
    rating: 4.9,
    reviewCount: 4120,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Everyone’s favorite 2-minute masala instant noodles with signature roasted spice tastemaker sachets inside. Family pack of 4 cakes.',
    highlights: ['Ready in 2 minutes', 'Includes 4 signature masala sachets', 'Source of iron & fiber'],
    storageInfo: 'Store in a cool, dry place.',
    image: createProductStudioImage(
      '#FEFCE8',
      '#FDE047',
      `<rect x="115" y="80" width="170" height="140" rx="14" fill="#EAB308" stroke="#CA8A04" stroke-width="3" />
       <rect x="130" y="95" width="140" height="55" rx="8" fill="#DC2626" />
       <text x="200" y="122" font-family="sans-serif" font-size="16" font-weight="800" fill="#FFFFFF" text-anchor="middle">2-MIN NOODLES</text>
       <text x="200" y="140" font-family="sans-serif" font-size="11" font-weight="700" fill="#FEF08A" text-anchor="middle">MASALA · PACK OF 4</text>
       <path d="M150 185 Q175 168 200 185 T250 185" stroke="#9A3412" stroke-width="5" fill="none" stroke-linecap="round" />
       <path d="M150 198 Q175 181 200 198 T250 198" stroke="#9A3412" stroke-width="5" fill="none" stroke-linecap="round" />`,
      'Pack of 4 (280 g)'
    ),
  },
  {
    id: 'prod-atta',
    name: 'Atta 5 kg (Chakki Fresh)',
    category: 'Instant Food',
    weight: '5 kg',
    price: 285,
    mrp: 330,
    discountPercent: 14,
    rating: 4.9,
    reviewCount: 2890,
    tag: 'Bestseller',
    deliveryTime: '12 mins',
    description: '100% whole wheat chakki-ground atta made from premium MP Sharbati wheat grains. Absorbs more water so rotis remain soft for hours.',
    highlights: ['0% maida — 100% whole wheat', 'Traditional stone-chakki grinding', 'Makes soft, fluffy rotis & parathas'],
    storageInfo: 'Transfer to an airtight steel or food-grade container after opening.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FED7AA',
      `<path d="M125 65 L275 65 L285 225 L115 225 Z" fill="#D97706" stroke="#92400E" stroke-width="3" stroke-linejoin="round" />
       <rect x="135" y="95" width="130" height="95" rx="10" fill="#FFFBEB" />
       <text x="200" y="125" font-family="sans-serif" font-size="16" font-weight="800" fill="#92400E" text-anchor="middle">CHAKKI FRESH</text>
       <text x="200" y="150" font-family="sans-serif" font-size="22" font-weight="900" fill="#D97706" text-anchor="middle">ATTA</text>
       <text x="200" y="175" font-family="sans-serif" font-size="13" font-weight="800" fill="#15803D" text-anchor="middle">100% WHOLE WHEAT · 5 kg</text>`,
      '5 kg Chakki Pack'
    ),
  },
  {
    id: 'prod-rice',
    name: 'Rice 5 kg (Basmati)',
    category: 'Instant Food',
    weight: '5 kg',
    price: 340,
    mrp: 410,
    discountPercent: 17,
    rating: 4.8,
    reviewCount: 1930,
    tag: 'Bestseller',
    deliveryTime: '13 mins',
    description: 'Aged long-grain Indian Basmati rice with delicate aroma and non-sticky fluffy texture. Ideal for everyday steamed rice, jeera rice, and pulao.',
    highlights: ['Aged for 12+ months for rich aroma', 'Slender pearls that elongate 2x on cooking', 'Hygienically sortex-cleaned'],
    storageInfo: 'Store in a cool, dry place away from insects and moisture.',
    image: createProductStudioImage(
      '#ECFDF5',
      '#D1FAE5',
      `<path d="M125 65 L275 65 L285 225 L115 225 Z" fill="#047857" stroke="#065F46" stroke-width="3" stroke-linejoin="round" />
       <rect x="135" y="95" width="130" height="95" rx="10" fill="#FFFFFF" />
       <text x="200" y="125" font-family="sans-serif" font-size="15" font-weight="800" fill="#065F46" text-anchor="middle">ROYAL AGED</text>
       <text x="200" y="150" font-family="sans-serif" font-size="20" font-weight="900" fill="#047857" text-anchor="middle">BASMATI RICE</text>
       <text x="200" y="175" font-family="sans-serif" font-size="12" font-weight="800" fill="#D97706" text-anchor="middle">LONG GRAIN · 5 kg</text>`,
      '5 kg Family Bag'
    ),
  },
  {
    id: 'prod-poha',
    name: 'Instant Khatta Meetha Poha',
    category: 'Instant Food',
    weight: '200 g',
    price: 48,
    mrp: 60,
    discountPercent: 20,
    rating: 4.6,
    reviewCount: 490,
    deliveryTime: '11 mins',
    description: 'Traditional Indori-style flattened rice breakfast mix seasoned with mustard seeds, curry leaves, peanuts, and turmeric.',
    highlights: ['Ready in 3 minutes with hot water', 'Light, nutritious morning breakfast', 'No artificial preservatives'],
    storageInfo: 'Store in a cool dry pantry.',
    image: createProductStudioImage(
      '#FEFCE8',
      '#FEF08A',
      `<rect x="135" y="75" width="130" height="150" rx="14" fill="#CA8A04" stroke="#854D0E" stroke-width="3" />
       <circle cx="200" cy="150" r="40" fill="#FEF9C3" />
       <text x="200" y="148" font-family="sans-serif" font-size="15" font-weight="800" fill="#854D0E" text-anchor="middle">INDORI POHA</text>
       <text x="200" y="166" font-family="sans-serif" font-size="11" font-weight="700" fill="#CA8A04" text-anchor="middle">3-MIN BREAKFAST</text>`,
      '200 g Pack'
    ),
  },
  {
    id: 'prod-pasta',
    name: 'Durum Wheat Macaroni Pasta',
    category: 'Instant Food',
    weight: '500 g',
    price: 68,
    mrp: 85,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 620,
    deliveryTime: '11 mins',
    description: '100% durum wheat semolina elbow macaroni that holds its shape and pairs deliciously with red marinara, white cheese sauce, or Indian masala tadka.',
    highlights: ['100% suji / durum wheat — zero maida', 'High protein & non-sticky texture', 'Cooks al dente in 8 minutes'],
    storageInfo: 'Store in a cool, dry place.',
    image: createProductStudioImage(
      '#EFF6FF',
      '#BFDBFE',
      `<rect x="135" y="70" width="130" height="155" rx="14" fill="#1D4ED8" stroke="#1E40AF" stroke-width="3" />
       <rect x="148" y="110" width="104" height="75" rx="8" fill="#FEF08A" />
       <text x="200" y="142" font-family="sans-serif" font-size="15" font-weight="800" fill="#1E3A8A" text-anchor="middle">MACARONI</text>
       <text x="200" y="162" font-family="sans-serif" font-size="13" font-weight="800" fill="#B45309" text-anchor="middle">PASTA · 500 g</text>`,
      '500 g Durum Wheat'
    ),
  },
  {
    id: 'prod-oats',
    name: 'Rolled Breakfast Oats',
    category: 'Instant Food',
    weight: '1 kg',
    price: 165,
    mrp: 210,
    discountPercent: 21,
    rating: 4.8,
    reviewCount: 870,
    deliveryTime: '12 mins',
    description: '100% natural wholegrain rolled oats rich in soluble beta-glucan fiber. Cook in 3 minutes with milk or savory vegetables.',
    highlights: ['High soluble fiber for heart health', 'Keeps you full for longer', '1 kg value pouch'],
    storageInfo: 'Store in an airtight container.',
    image: createProductStudioImage(
      '#F0FDF4',
      '#BBF7D0',
      `<rect x="130" y="65" width="140" height="160" rx="16" fill="#15803D" stroke="#166534" stroke-width="3" />
       <rect x="145" y="100" width="110" height="90" rx="10" fill="#FFFBEB" />
       <text x="200" y="138" font-family="sans-serif" font-size="16" font-weight="800" fill="#166534" text-anchor="middle">100% ROLLED</text>
       <text x="200" y="162" font-family="sans-serif" font-size="18" font-weight="900" fill="#B45309" text-anchor="middle">OATS · 1 kg</text>`,
      '1 kg Value Pouch'
    ),
  },

  // ========================
  // 6. HOUSEHOLD & CLEANING
  // ========================
  {
    id: 'prod-dishwash',
    name: 'Dishwash Liquid',
    category: 'Household & Cleaning',
    weight: '750 ml',
    price: 145,
    mrp: 175,
    discountPercent: 17,
    rating: 4.9,
    reviewCount: 1580,
    tag: 'Bestseller',
    deliveryTime: '11 mins',
    description: 'Concentrated active lemon dishwash gel that cuts through tough burnt Indian oil and kadhai grease in a single drop while staying gentle on hands.',
    highlights: ['Power of 100 fresh lemons', 'Zero white residue on utensils', 'Removes tough curry & oil odor'],
    storageInfo: 'Keep upright at room temperature.',
    image: createProductStudioImage(
      '#FEFCE8',
      '#ECFCCB',
      `<rect x="184" y="45" width="32" height="18" rx="4" fill="#15803D" />
       <path d="M175 63 L225 63 L242 110 L242 222 C242 230, 158 230, 158 222 L158 110 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="3" />
       <rect x="168" y="118" width="64" height="72" rx="8" fill="#15803D" />
       <text x="200" y="148" font-family="sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">DISHWASH</text>
       <text x="200" y="165" font-family="sans-serif" font-size="11" font-weight="700" fill="#FEF08A" text-anchor="middle">LEMON GEL</text>
       <text x="200" y="182" font-family="sans-serif" font-size="10" font-weight="700" fill="#DCFCE7" text-anchor="middle">750 ml</text>`,
      '750 ml Bottle'
    ),
  },
  {
    id: 'prod-detergent',
    name: 'Front/Top Load Liquid Detergent',
    category: 'Household & Cleaning',
    weight: '1 L Pouch',
    price: 195,
    mrp: 240,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 740,
    deliveryTime: '12 mins',
    description: 'Fast-dissolving enzymatic liquid laundry detergent that removes collar grime and food stains while protecting fabric color and softness.',
    highlights: ['Zero powder residue in washing machines', 'Fresh floral breeze fragrance', 'Suitable for both top & front load'],
    storageInfo: 'Keep out of reach of children.',
    image: createProductStudioImage(
      '#EFF6FF',
      '#BFDBFE',
      `<path d="M135 70 L245 70 L265 110 L265 225 L135 225 Z" fill="#0284C7" stroke="#0369A1" stroke-width="3" stroke-linejoin="round" />
       <rect x="150" y="115" width="95" height="80" rx="10" fill="#FFFFFF" />
       <text x="197" y="148" font-family="sans-serif" font-size="13" font-weight="800" fill="#0369A1" text-anchor="middle">LIQUID</text>
       <text x="197" y="166" font-family="sans-serif" font-size="13" font-weight="800" fill="#0284C7" text-anchor="middle">DETERGENT</text>
       <text x="197" y="184" font-family="sans-serif" font-size="11" font-weight="700" fill="#0F172A" text-anchor="middle">1 LITRE</text>`,
      '1 L Smart Refill'
    ),
  },
  {
    id: 'prod-floor-cleaner',
    name: 'Citrus Disinfectant Floor Cleaner',
    category: 'Household & Cleaning',
    weight: '1 L',
    price: 165,
    mrp: 205,
    discountPercent: 20,
    rating: 4.8,
    reviewCount: 680,
    deliveryTime: '12 mins',
    description: '99.9% germ-protection surface and floor cleaner with uplifting Mediterranean citrus oil. Safe on marble, granite, vitrified tiles, and mosaic.',
    highlights: ['99.9% antibacterial surface protection', 'Sparkling streak-free shine', 'Long-lasting citrus fragrance'],
    storageInfo: 'Store upright in utility cabinet.',
    image: createProductStudioImage(
      '#F0FDFA',
      '#99F6E4',
      `<rect x="182" y="48" width="32" height="18" rx="4" fill="#DC2626" />
       <path d="M170 66 L226 66 L242 115 L242 225 L158 225 L158 115 Z" fill="#0D9488" stroke="#0F766E" stroke-width="3" />
       <rect x="168" y="120" width="64" height="75" rx="8" fill="#FFFFFF" />
       <text x="200" y="150" font-family="sans-serif" font-size="12" font-weight="800" fill="#0F766E" text-anchor="middle">FLOOR</text>
       <text x="200" y="166" font-family="sans-serif" font-size="12" font-weight="800" fill="#0D9488" text-anchor="middle">CLEANER</text>
       <text x="200" y="184" font-family="sans-serif" font-size="10" font-weight="700" fill="#EA580C" text-anchor="middle">CITRUS · 1L</text>`,
      '1 L Disinfectant'
    ),
  },
  {
    id: 'prod-tissues',
    name: '2-Ply Soft Kitchen Towel Rolls',
    category: 'Household & Cleaning',
    weight: 'Pack of 2 Rolls',
    price: 115,
    mrp: 150,
    discountPercent: 23,
    rating: 4.7,
    reviewCount: 510,
    deliveryTime: '11 mins',
    description: 'Highly absorbent 100% virgin pulp kitchen tissue rolls for draining fried snacks, wiping countertops, and wrapping fresh rotis.',
    highlights: ['Food-contact safe virgin paper', 'Extra-absorbent 2-ply embossing', '120 pulls per pack'],
    storageInfo: 'Keep dry.',
    image: createProductStudioImage(
      '#F8FAFC',
      '#E2E8F0',
      `<rect x="130" y="85" width="65" height="130" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3" />
       <ellipse cx="162" cy="88" rx="32" ry="10" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
       <rect x="205" y="85" width="65" height="130" rx="10" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="3" />
       <ellipse cx="237" cy="88" rx="32" ry="10" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="2" />
       <rect x="125" y="140" width="150" height="45" rx="6" fill="#0C831F" />
       <text x="200" y="167" font-family="sans-serif" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">KITCHEN TOWELS · 2 ROLLS</text>`,
      'Pack of 2 Rolls'
    ),
  },

  // ========================
  // 7. PERSONAL CARE
  // ========================
  {
    id: 'prod-soap',
    name: 'Moisturizing Cream Bath Soap',
    category: 'Personal Care',
    weight: 'Pack of 3 (3 x 100 g)',
    price: 135,
    mrp: 165,
    discountPercent: 18,
    rating: 4.8,
    reviewCount: 920,
    tag: 'Bestseller',
    deliveryTime: '11 mins',
    description: 'pH-balanced beauty bathing bar enriched with 1/4 moisturizing milk cream and almond oil for soft, hydrated skin.',
    highlights: ['Dermatologically tested gentle formula', 'Does not dry out skin like ordinary soap', 'Value pack of 3 bars'],
    storageInfo: 'Store in a cool dry place.',
    image: createProductStudioImage(
      '#F0F9FF',
      '#E0F2FE',
      `<rect x="115" y="95" width="170" height="105" rx="18" fill="#FFFFFF" stroke="#BAE6FD" stroke-width="3" />
       <rect x="130" y="110" width="140" height="75" rx="12" fill="#0284C7" />
       <text x="200" y="145" font-family="sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" text-anchor="middle">CREAM BATH BAR</text>
       <text x="200" y="167" font-family="sans-serif" font-size="11" font-weight="700" fill="#E0F2FE" text-anchor="middle">PACK OF 3 · 300 g</text>`,
      '3 x 100 g Bars'
    ),
  },
  {
    id: 'prod-handwash',
    name: 'Aloe & Neem Foaming Handwash',
    category: 'Personal Care',
    weight: '250 ml Pump',
    price: 89,
    mrp: 110,
    discountPercent: 19,
    rating: 4.8,
    reviewCount: 640,
    deliveryTime: '10 mins',
    description: 'Purifying liquid handwash pump infused with organic aloe vera and neem leaf extract. Tough on germs, soothing on skin.',
    highlights: ['Paraben & triclosan free', 'Includes convenient pump dispenser', 'Natural neem & aloe fragrance'],
    storageInfo: 'For external use only.',
    image: createProductStudioImage(
      '#ECFDF5',
      '#A7F3D0',
      `<rect x="188" y="55" width="24" height="22" rx="4" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2" />
       <path d="M188 60 L230 60" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" />
       <rect x="150" y="77" width="100" height="145" rx="24" fill="#10B981" stroke="#059669" stroke-width="3" />
       <rect x="162" y="115" width="76" height="75" rx="12" fill="#FFFFFF" />
       <text x="200" y="148" font-family="sans-serif" font-size="13" font-weight="800" fill="#065F46" text-anchor="middle">ALOE & NEEM</text>
       <text x="200" y="166" font-family="sans-serif" font-size="12" font-weight="700" fill="#10B981" text-anchor="middle">HANDWASH</text>`,
      '250 ml Pump'
    ),
  },
  {
    id: 'prod-shampoo',
    name: 'Herbal Silk & Shine Shampoo',
    category: 'Personal Care',
    weight: '340 ml',
    price: 225,
    mrp: 280,
    discountPercent: 20,
    rating: 4.7,
    reviewCount: 510,
    tag: 'New',
    deliveryTime: '13 mins',
    description: 'Nourishing daily care shampoo with hibiscus, shikakai, and argan oil proteins for smooth, frizz-free hair in humid weather.',
    highlights: ['Sulfate-gentle daily formula', 'Reduces hair fall & split ends', '340 ml family bottle'],
    storageInfo: 'Rinse thoroughly if contact with eyes occurs.',
    image: createProductStudioImage(
      '#FDF2F8',
      '#FCE7F3',
      `<rect x="182" y="52" width="36" height="20" rx="6" fill="#831843" />
       <path d="M162 72 L238 72 L245 222 C245 230, 155 230, 155 222 Z" fill="#DB2777" stroke="#9D174D" stroke-width="3" />
       <rect x="168" y="112" width="64" height="80" rx="10" fill="#FDF2F8" />
       <text x="200" y="145" font-family="sans-serif" font-size="13" font-weight="800" fill="#831843" text-anchor="middle">HERBAL SILK</text>
       <text x="200" y="163" font-family="sans-serif" font-size="12" font-weight="700" fill="#DB2777" text-anchor="middle">SHAMPOO</text>
       <text x="200" y="180" font-family="sans-serif" font-size="10" font-weight="700" fill="#9D174D" text-anchor="middle">340 ml</text>`,
      '340 ml Bottle'
    ),
  },

  // ========================
  // 8. BAKERY
  // ========================
  {
    id: 'prod-bread',
    name: 'Brown Bread 400g',
    category: 'Bakery',
    weight: '400 g',
    price: 45,
    mrp: 50,
    discountPercent: 10,
    rating: 4.8,
    reviewCount: 2680,
    tag: 'Bestseller',
    deliveryTime: '10 mins',
    description: 'Soft, freshly baked whole wheat brown bread loaf with high dietary fiber and zero bromates. Baked every night for morning delivery.',
    highlights: ['Freshly baked daily batch', 'Pre-sliced soft sandwich loaf', 'High fiber whole wheat recipe'],
    storageInfo: 'Store in a cool dry place. Consume within 3 days.',
    image: createProductStudioImage(
      '#FFFBEB',
      '#FDE68A',
      `<path d="M125 115 C120 85, 155 72, 200 72 C245 72, 280 85, 275 115 L270 215 C270 222, 130 222, 130 215 Z" fill="#B45309" stroke="#78350F" stroke-width="3" />
       <path d="M138 120 C135 95, 162 85, 200 85 C238 85, 265 95, 262 120 L258 205 L142 205 Z" fill="#FDE68A" />
       <rect x="130" y="135" width="140" height="52" fill="#15803D" />
       <text x="200" y="158" font-family="sans-serif" font-size="15" font-weight="800" fill="#FFFFFF" text-anchor="middle">BROWN BREAD</text>
       <text x="200" y="177" font-family="sans-serif" font-size="11" font-weight="700" fill="#FEF08A" text-anchor="middle">WHOLE WHEAT · 400g</text>`,
      '400 g Fresh Loaf'
    ),
  },
  {
    id: 'prod-croissant',
    name: 'All-Butter French Croissants',
    category: 'Bakery',
    weight: 'Pack of 2 (120 g)',
    price: 75,
    mrp: 95,
    discountPercent: 21,
    rating: 4.8,
    reviewCount: 430,
    tag: 'New',
    deliveryTime: '12 mins',
    description: 'Flaky, golden-baked laminated pastries made with pure dairy butter. Warm in an oven or air-fryer for 2 minutes for cafe-fresh aroma.',
    highlights: ['24 flaky laminated butter layers', 'Eggless bakery recipe', 'Ready to warm & serve'],
    storageInfo: 'Consume within 48 hours.',
    image: createProductStudioImage(
      '#FFF7ED',
      '#FED7AA',
      `<path d="M120 175 C115 115, 285 115, 280 175 C265 190, 240 165, 200 165 C160 165, 135 190, 120 175 Z" fill="#D97706" stroke="#92400E" stroke-width="3" />
       <path d="M145 162 C155 128, 245 128, 255 162" stroke="#FDE047" stroke-width="4" fill="none" />
       <path d="M168 158 C175 135, 225 135, 232 158" stroke="#FEF08A" stroke-width="4" fill="none" />`,
      'Pack of 2'
    ),
  },
  {
    id: 'prod-cookies',
    name: 'Belgian Choco Chip Cookies',
    category: 'Bakery',
    weight: '250 g Bakery Box',
    price: 90,
    mrp: 115,
    discountPercent: 22,
    rating: 4.9,
    reviewCount: 810,
    deliveryTime: '11 mins',
    description: 'Crunchy golden bakery cookies loaded with rich dark chocolate chunks and roasted cashew bits.',
    highlights: ['Generous dark choco chips in every bite', '100% vegetarian bakery batch', 'Packed in a stay-fresh tray box'],
    storageInfo: 'Store in an airtight jar after opening.',
    image: createProductStudioImage(
      '#FEF3C7',
      '#FDE68A',
      `<circle cx="170" cy="155" r="46" fill="#B45309" stroke="#78350F" stroke-width="3" />
       <circle cx="155" cy="142" r="5" fill="#292524" />
       <circle cx="182" cy="138" r="6" fill="#292524" />
       <circle cx="168" cy="168" r="5" fill="#292524" />
       <circle cx="230" cy="162" r="46" fill="#D97706" stroke="#92400E" stroke-width="3" />
       <circle cx="218" cy="148" r="6" fill="#292524" />
       <circle cx="245" cy="155" r="5" fill="#292524" />
       <circle cx="228" cy="178" r="6" fill="#292524" />
       <circle cx="208" cy="168" r="4" fill="#292524" />`,
      '250 g Bakery Box'
    ),
  },
];
