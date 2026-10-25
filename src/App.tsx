/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Search,
  MapPin,
  ShoppingBag,
  Zap,
  ChevronDown,
  ArrowUpDown,
  X,
  Clock,
  Sparkles,
  History,
  Check,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
} from 'lucide-react';
import {
  PRODUCTS,
  CATEGORIES,
  DELIVERY_LOCATIONS,
  PROMO_BANNERS,
  Product,
  CategoryName,
  DeliveryLocation,
} from './data/products';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer, CartItem, BillSummary } from './components/CartDrawer';
import { CheckoutModal, OrderRecord } from './components/CheckoutModal';
import { PastOrdersModal } from './components/PastOrdersModal';

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating';

const STORAGE_KEYS = {
  CART: 'quickbasket_cart_v1',
  RECENT: 'quickbasket_recent_v1',
  ORDERS: 'quickbasket_orders_v1',
  LOCATION: 'quickbasket_location_v1',
};

const QUICK_SEARCH_TERMS = ['Milk', 'Bread', 'Eggs', 'Bananas', 'Tomatoes', 'Atta', 'Chips', 'Cola'];

export default function App() {
  // 1. Persisted Location State (Default: Delhi - 110001)
  const [selectedLocation, setSelectedLocation] = useState<DeliveryLocation>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOCATION);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.label) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return DELIVERY_LOCATIONS[0];
  });
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [customPincode, setCustomPincode] = useState('');
  const [customArea, setCustomArea] = useState('');

  // 2. Persisted Cart State ({ [productId]: quantity })
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 3. Persisted Recently Viewed Product IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Persisted Past Demo Orders
  const [pastOrders, setPastOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 5. Catalog Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryName | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [shelfTab, setShelfTab] = useState<'bestsellers' | 'recent'>('bestsellers');

  // 6. Modals, Drawers & Toast Feedback State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPastOrdersOpen, setIsPastOrdersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 7. Delivery Slot State
  const [deliverySlot, setDeliverySlot] = useState<'10-15 min' | 'Scheduled'>('10-15 min');
  const [scheduledTime, setScheduledTime] = useState('Today, 5:00 PM - 6:00 PM');

  const catalogRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) {
      window.clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartQuantities));
    } catch {
      // ignore
    }
  }, [cartQuantities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recentlyViewedIds));
    } catch {
      // ignore
    }
  }, [recentlyViewedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(pastOrders));
    } catch {
      // ignore
    }
  }, [pastOrders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LOCATION, JSON.stringify(selectedLocation));
    } catch {
      // ignore
    }
  }, [selectedLocation]);

  // Lock body scroll when any modal or drawer is open & handle Escape key
  useEffect(() => {
    const anyOverlayOpen =
      Boolean(quickViewProduct) || isCartOpen || isCheckoutOpen || isPastOrdersOpen;
    if (anyOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct, isCartOpen, isCheckoutOpen, isPastOrdersOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (quickViewProduct) setQuickViewProduct(null);
        else if (isCheckoutOpen) setIsCheckoutOpen(false);
        else if (isCartOpen) setIsCartOpen(false);
        else if (isPastOrdersOpen) setIsPastOrdersOpen(false);
        else if (isLocationMenuOpen) setIsLocationMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, isCheckoutOpen, isCartOpen, isPastOrdersOpen, isLocationMenuOpen]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCartQuantities((prev) => ({
      ...prev,
      [product.id]: (prev[product.id] || 0) + 1,
    }));
    showToast(`Added ${product.name} to basket`);
  };

  const handleIncrement = (productId: string) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId: string) => {
    setCartQuantities((prev) => {
      const current = prev[productId] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: current - 1 };
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    const prod = PRODUCTS.find((p) => p.id === productId);
    setCartQuantities((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
    if (prod) {
      showToast(`Removed ${prod.name} from basket`);
    }
  };

  const handleClearCart = () => {
    setCartQuantities({});
    showToast('Cleared all items from basket');
  };

  // Live Search Input Handler:
  // Automatically switches category filter to 'All' when user types a search query
  // so products across all categories are immediately found without getting stuck in a single tab.
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim().length > 0 && selectedCategory !== 'All') {
      setSelectedCategory('All');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleQuickSearchTag = (term: string) => {
    if (searchQuery.toLowerCase() === term.toLowerCase()) {
      setSearchQuery('');
    } else {
      setSearchQuery(term);
      setSelectedCategory('All');
      if (catalogRef.current) {
        catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Custom Location Pincode Handler
  const handleCustomLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pin = customPincode.replace(/\D/g, '').slice(0, 6);
    if (pin.length < 6) {
      showToast('Please enter a valid 6-digit pincode');
      return;
    }
    const cityLabel = customArea.trim() ? customArea.trim() : 'Custom Location';
    const newLoc: DeliveryLocation = {
      id: `custom-${pin}`,
      label: `${cityLabel} - ${pin}`,
      area: `Pincode ${pin} Express Zone`,
      pincode: pin,
      eta: '12 mins',
    };
    setSelectedLocation(newLoc);
    setCustomPincode('');
    setCustomArea('');
    setIsLocationMenuOpen(false);
    showToast(`Delivery location set to ${newLoc.label}`);
  };

  // Product Selection (Quick-View + Recently Viewed tracking)
  const handleSelectProduct = (product: Product) => {
    setQuickViewProduct(product);
    setRecentlyViewedIds((prev) => {
      const filtered = prev.filter((id) => id !== product.id);
      return [product.id, ...filtered].slice(0, 10);
    });
  };

  // Computed Cart Items & Bill Summary
  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(cartQuantities)
      .map(([id, quantity]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        return product && quantity > 0 ? { product, quantity } : null;
      })
      .filter((item): item is CartItem => item !== null);
  }, [cartQuantities]);

  const billSummary: BillSummary = useMemo(() => {
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const mrpTotal = cartItems.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
    const itemTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountTotal = mrpTotal - itemTotal;
    const deliveryFee = itemTotal === 0 ? 0 : itemTotal >= 499 ? 0 : 25;
    const grandTotal = itemTotal + deliveryFee;
    const amountForFreeDelivery = Math.max(0, 499 - itemTotal);

    return {
      itemCount,
      mrpTotal,
      itemTotal,
      discountTotal,
      deliveryFee,
      grandTotal,
      amountForFreeDelivery,
    };
  }, [cartItems]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.weight.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.price - a.price);
    }
    if (sortBy === 'rating') {
      return [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  // Horizontal Shelf Products (Bestsellers or Recently Viewed)
  const shelfProducts = useMemo(() => {
    if (shelfTab === 'recent' && recentlyViewedIds.length > 0) {
      return recentlyViewedIds
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter((p): p is Product => Boolean(p));
    }
    return PRODUCTS.filter((p) => p.tag === 'Bestseller');
  }, [shelfTab, recentlyViewedIds]);

  const handleCategorySelect = (category: CategoryName | 'All', shouldScroll = false) => {
    setSelectedCategory(category);
    if (category !== 'All' && searchQuery.trim().length > 0) {
      // Clear search query when user explicitly clicks a category or offer banner
      setSearchQuery('');
    }
    if (shouldScroll && catalogRef.current) {
      catalogRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePlaceOrder = (order: OrderRecord) => {
    setPastOrders((prev) => [order, ...prev]);
    setCartQuantities({});
    showToast(`Order ${order.orderId} confirmed!`);
  };

  const handleReorder = (order: OrderRecord) => {
    const nextCart: Record<string, number> = { ...cartQuantities };
    order.items.forEach(({ product, quantity }) => {
      nextCart[product.id] = (nextCart[product.id] || 0) + quantity;
    });
    setCartQuantities(nextCart);
    setIsCartOpen(true);
    showToast(`Added ${order.items.length} items from ${order.orderId} to basket`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden">
      {/* =========================================================
          TOP DEMO NOTICE BAR (Clearly visible per specification)
          ========================================================= */}
      <div className="bg-slate-900 text-white px-3 sm:px-4 py-1.5 text-center border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium tracking-wide">
          <span className="px-1.5 py-0.5 rounded bg-[#FACC15] text-slate-950 font-extrabold uppercase text-[10px] tracking-wider shrink-0">
            DEMO STORE
          </span>
          <span>
            Sample products only, no real orders or payments are processed.
          </span>
        </div>
      </div>

      {/* =========================================================
          STICKY HEADER: Logo | Location | Live Search | Cart
          ========================================================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          {/* Primary Header Row */}
          <div className="h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-5">
            {/* Left: Brand Wordmark + Location Selector */}
            <div className="flex items-center gap-2 sm:gap-5 min-w-0">
              <a
                href="#top"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSortBy('relevance');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-1 text-base sm:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
              >
                <span className="text-[#0C831F]">Quick</span>
                <span className="bg-[#FACC15] text-slate-950 px-1.5 py-0.5 rounded-lg">
                  Basket
                </span>
              </a>

              <div className="hidden md:block h-7 w-px bg-slate-200 shrink-0" />

              {/* Location Picker Dropdown Trigger */}
              <div className="relative min-w-0">
                <button
                  type="button"
                  onClick={() => setIsLocationMenuOpen((prev) => !prev)}
                  className="text-left group flex flex-col justify-center px-1.5 sm:px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer max-w-[145px] xs:max-w-[170px] sm:max-w-none"
                  aria-expanded={isLocationMenuOpen}
                  aria-label="Select delivery location"
                >
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-900 flex items-center gap-1 leading-tight whitespace-nowrap">
                    <Zap className="w-3 h-3 text-[#0C831F] fill-[#FACC15] shrink-0" />
                    Delivery in {selectedLocation.eta}
                  </span>
                  <span className="text-[11px] sm:text-xs font-medium text-slate-600 flex items-center gap-1 leading-tight truncate">
                    <MapPin className="w-3 h-3 text-[#0C831F] shrink-0" />
                    <span className="truncate">{selectedLocation.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-transform shrink-0" />
                  </span>
                </button>

                {isLocationMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-20 bg-slate-900/20 sm:bg-transparent"
                      onClick={() => setIsLocationMenuOpen(false)}
                    />
                    <div className="fixed inset-x-3 top-24 sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-80 bg-white rounded-2xl border border-slate-200 shadow-2xl p-3.5 z-30 space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div>
                          <p className="text-xs font-bold text-slate-900">
                            Select Delivery Location
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Instant 10–15 minute dark-store coverage
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsLocationMenuOpen(false)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Custom Pincode Input Form */}
                      <form onSubmit={handleCustomLocationSubmit} className="space-y-1.5">
                        <p className="text-[11px] font-semibold text-slate-700">
                          Enter Custom City & 6-Digit Pincode:
                        </p>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={customArea}
                            onChange={(e) => setCustomArea(e.target.value)}
                            placeholder="City (e.g. Delhi)"
                            className="w-28 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C831F]"
                          />
                          <input
                            type="text"
                            maxLength={6}
                            value={customPincode}
                            onChange={(e) => setCustomPincode(e.target.value.replace(/\D/g, ''))}
                            placeholder="Pincode (110001)"
                            className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#0C831F] tabular-nums"
                          />
                          <button
                            type="submit"
                            className="px-2.5 py-1.5 rounded-lg bg-[#0C831F] hover:bg-[#096918] text-white text-xs font-bold cursor-pointer shrink-0"
                          >
                            Apply
                          </button>
                        </div>
                      </form>

                      <div className="border-t border-slate-100 pt-2">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1 mb-1">
                          Popular Dark-Store Zones
                        </p>
                        <div className="max-h-52 overflow-y-auto space-y-1">
                          {DELIVERY_LOCATIONS.map((loc) => {
                            const isSelected = loc.label === selectedLocation.label;
                            return (
                              <button
                                key={loc.id}
                                type="button"
                                onClick={() => {
                                  setSelectedLocation(loc);
                                  setIsLocationMenuOpen(false);
                                  showToast(`Location switched to ${loc.label}`);
                                }}
                                className={`w-full px-3 py-2 rounded-xl text-left flex items-center justify-between text-xs transition-colors cursor-pointer ${
                                  isSelected
                                    ? 'bg-[#ECFDF5] text-[#0C831F] font-bold'
                                    : 'text-slate-700 hover:bg-slate-50'
                                }`}
                              >
                                <div>
                                  <p className="font-bold">{loc.label}</p>
                                  <p className="text-[11px] text-slate-500">{loc.area}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] font-semibold text-slate-500">
                                    {loc.eta}
                                  </span>
                                  {isSelected && <Check className="w-4 h-4 text-[#0C831F]" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Center: Live Search Input Form (Desktop & Tablet) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex flex-1 max-w-xl relative items-center"
            >
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder='Search "milk", "brown bread", "atta", "bananas"...'
                aria-label="Search grocery products"
                className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-slate-200/80 focus:border-[#0C831F] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-16 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 px-3 py-1.5 rounded-lg bg-[#0C831F] hover:bg-[#096918] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Search
              </button>
            </form>

            {/* Right: Past Orders & Cart Button */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsPastOrdersOpen(true)}
                className="px-2.5 sm:px-3 py-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:text-slate-900 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                title="View past demo orders"
              >
                <History className="w-4 h-4 text-[#0C831F]" />
                <span className="hidden lg:inline">Orders</span>
                {pastOrders.length > 0 && (
                  <span className="text-[11px] font-bold text-[#0C831F] tabular-nums">
                    ({pastOrders.length})
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="Open shopping cart"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0C831F] hover:bg-[#096918] text-white flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {billSummary.itemCount === 0 ? (
                  <span className="text-xs sm:text-sm font-bold">My Cart</span>
                ) : (
                  <div className="text-left leading-tight">
                    <p className="text-[10px] sm:text-[11px] font-bold text-emerald-100 tabular-nums">
                      {billSummary.itemCount} {billSummary.itemCount === 1 ? 'item' : 'items'}
                    </p>
                    <p className="text-xs sm:text-sm font-extrabold tabular-nums">
                      ₹{billSummary.grandTotal}
                    </p>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Sticky Search Bar Row (Visible on screens < 640px) */}
          <form
            onSubmit={handleSearchSubmit}
            className="sm:hidden pb-2.5 flex items-center relative"
          >
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder='Search "milk", "bread", "eggs", "atta"...'
              aria-label="Mobile search grocery products"
              className="w-full pl-9 pr-20 py-2 text-xs bg-slate-100 focus:bg-white border border-slate-200 focus:border-[#0C831F] rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear mobile search"
                className="absolute right-14 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 px-2.5 py-1 rounded-lg bg-[#0C831F] text-white text-[11px] font-bold cursor-pointer"
            >
              Go
            </button>
          </form>
        </div>
      </header>

      {/* =========================================================
          MAIN STOREFRONT CONTENT
          ========================================================= */}
      <main id="top" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-8">
        {/* ---------------------------------------------------------
            1. HERO BANNER: 10-15 Min Delivery + Search + Quick Chips
            --------------------------------------------------------- */}
        <section className="rounded-2xl bg-gradient-to-br from-[#0C831F] via-[#096918] to-emerald-950 text-white p-5 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-[#FACC15]">
                <Zap className="w-4 h-4 fill-[#FACC15] text-[#FACC15]" />
                <span>SUPERFAST DARK-STORE DELIVERY · {selectedLocation.label.toUpperCase()}</span>
              </div>

              <h1
                className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Groceries delivered in{' '}
                <span className="text-[#FACC15] underline decoration-[#FACC15]/40 decoration-wavy underline-offset-4">
                  10–15 minutes
                </span>
              </h1>

              <p className="text-sm sm:text-base text-emerald-100 max-w-xl leading-relaxed">
                From farm-fresh vegetables and morning toned milk to 5 kg chakki atta and evening munchies—packed & dispatched within 120 seconds.
              </p>

              {/* Hero Search Input Form */}
              <form onSubmit={handleSearchSubmit} className="max-w-lg relative pt-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 mt-0.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Type to filter products instantly (e.g. Milk, Eggs, Potato, Atta)..."
                  aria-label="Hero search input"
                  className="w-full pl-11 pr-28 py-3 text-sm bg-white text-slate-900 rounded-xl shadow-md placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FACC15]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear hero search"
                    className="absolute right-20 top-1/2 -translate-y-1/2 mt-0.5 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 mt-0.5 px-3.5 py-1.5 rounded-lg bg-[#0C831F] hover:bg-[#096918] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>

              {/* Popular One-Tap Search Tags */}
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[11px] font-semibold text-emerald-200 mr-1">
                  Popular:
                </span>
                {QUICK_SEARCH_TERMS.map((term) => {
                  const isTermActive = searchQuery.trim().toLowerCase() === term.toLowerCase();
                  return (
                    <button
                      key={term}
                      type="button"
                      onClick={() => handleQuickSearchTag(term)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isTermActive
                          ? 'bg-[#FACC15] text-slate-950 shadow-2xs'
                          : 'bg-black/20 hover:bg-black/30 text-emerald-50'
                      }`}
                    >
                      {term}
                    </button>
                  );
                })}
              </div>

              {/* Quick Category Jump Buttons inside Hero */}
              <div className="pt-1 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                <span className="text-xs font-semibold text-emerald-200 shrink-0">
                  Categories:
                </span>
                {CATEGORIES.map((cat) => {
                  const active = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      type="button"
                      onClick={() => handleCategorySelect(cat.name, true)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#FACC15] text-slate-950 shadow-xs'
                          : 'bg-white/12 hover:bg-white/20 text-white'
                      }`}
                    >
                      {cat.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Hero Visual Highlights Card with working ADD / +/- controls */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRODUCTS.slice(0, 4).map((heroItem) => {
                const qty = cartQuantities[heroItem.id] || 0;
                return (
                  <div
                    key={heroItem.id}
                    onClick={() => handleSelectProduct(heroItem)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectProduct(heroItem);
                      }
                    }}
                    className="bg-white/95 hover:bg-white text-slate-900 rounded-xl p-3 flex flex-col justify-between gap-2.5 cursor-pointer transition-transform hover:-translate-y-0.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={heroItem.image}
                        alt={heroItem.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover shrink-0 bg-slate-50 border border-slate-100"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">{heroItem.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{heroItem.weight}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs font-extrabold text-slate-900 tabular-nums">
                          ₹{heroItem.price}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through tabular-nums">
                          ₹{heroItem.mrp}
                        </span>
                      </div>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(heroItem);
                          }}
                          className="px-3 py-1 rounded-lg border border-[#0C831F] bg-[#ECFDF5] hover:bg-[#0C831F] text-[#0C831F] hover:text-white text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          ADD
                        </button>
                      ) : (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="h-7 rounded-lg bg-[#0C831F] text-white flex items-center gap-1.5 px-1.5"
                        >
                          <button
                            type="button"
                            onClick={() => handleDecrement(heroItem.id)}
                            aria-label={`Decrease ${heroItem.name}`}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/15 cursor-pointer"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                          <span className="text-xs font-bold tabular-nums">{qty}</span>
                          <button
                            type="button"
                            onClick={() => handleIncrement(heroItem.id)}
                            aria-label={`Increase ${heroItem.name}`}
                            className="w-5 h-5 flex items-center justify-center rounded hover:bg-black/15 cursor-pointer"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------
            2. OFFERS SECTION: 3 Curated Static Promotional Banners
            --------------------------------------------------------- */}
        <section aria-label="Promotional Offers">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Today's Spotlight Offers
              </h2>
              <p className="text-xs text-slate-500">
                Automatic MRP savings applied directly to every item in your basket
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROMO_BANNERS.map((banner) => (
              <div
                key={banner.id}
                onClick={() => handleCategorySelect(banner.category, true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCategorySelect(banner.category, true);
                  }
                }}
                className={`group rounded-2xl bg-gradient-to-br ${banner.bgClass} text-white p-5 flex flex-col justify-between min-h-[168px] cursor-pointer hover:shadow-md transition-all`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px] font-bold tracking-wider uppercase text-white/80">
                    <span>{banner.kicker}</span>
                    <span className="text-[#FACC15]">{banner.badgeText}</span>
                  </div>
                  <h3
                    className="text-lg sm:text-xl font-extrabold mt-2 leading-snug group-hover:text-[#FACC15] transition-colors"
                    style={{ textWrap: 'balance' }}
                  >
                    {banner.title}
                  </h3>
                  <p className="text-xs text-white/80 mt-1.5 leading-relaxed">
                    {banner.subtitle}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-bold">
                  <span className="inline-flex items-center gap-1.5 bg-white/15 group-hover:bg-[#FACC15] group-hover:text-slate-950 px-3 py-1.5 rounded-lg transition-colors">
                    Shop {banner.category} →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------------
            3. BESTSELLERS / RECENTLY VIEWED HORIZONTAL ROW
            --------------------------------------------------------- */}
        <section aria-label="Bestsellers and Recently Viewed">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0C831F]" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {shelfTab === 'bestsellers'
                  ? 'Most Ordered in Your Area'
                  : 'Recently Viewed Products'}
              </h2>
            </div>

            {/* Interactive Segmented Tab Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-200/75 rounded-xl">
              <button
                type="button"
                onClick={() => setShelfTab('bestsellers')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  shelfTab === 'bestsellers'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bestsellers ({PRODUCTS.filter((p) => p.tag === 'Bestseller').length})
              </button>
              <button
                type="button"
                onClick={() => setShelfTab('recent')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  shelfTab === 'recent'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Recently Viewed ({recentlyViewedIds.length})
              </button>
            </div>
          </div>

          {shelfTab === 'recent' && recentlyViewedIds.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200/80 p-6 text-center">
              <Clock className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
              <p className="text-sm font-semibold text-slate-800">
                No recently viewed items yet
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Click on any product card to open its quick-view details and it will appear here.
              </p>
            </div>
          ) : (
            <div className="flex items-stretch gap-3.5 overflow-x-auto no-scrollbar pb-2">
              {shelfProducts.map((product) => (
                <ProductCard
                  key={`shelf-${product.id}`}
                  product={product}
                  quantity={cartQuantities[product.id] || 0}
                  onAdd={handleAddToCart}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onSelectProduct={handleSelectProduct}
                  compact
                />
              ))}
            </div>
          )}
        </section>

        {/* ---------------------------------------------------------
            4. MAIN CATALOG: Category Filter Bar + Sort + Product Grid
            --------------------------------------------------------- */}
        <section ref={catalogRef} className="scroll-mt-24 space-y-5">
          {/* Category Filter + Sort Toolbar */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 space-y-3.5 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <div>
                  <h2 className="text-base sm:text-xl font-extrabold text-slate-900">
                    {selectedCategory === 'All' ? 'All Grocery Categories' : selectedCategory}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    Showing {filteredProducts.length} of {PRODUCTS.length} sample products
                    {searchQuery ? ` matching "${searchQuery}"` : ''}
                  </p>
                </div>

                {(selectedCategory !== 'All' || searchQuery.trim() !== '' || sortBy !== 'relevance') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                      setSortBy('relevance');
                    }}
                    className="ml-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
                <label htmlFor="sort-select" className="text-xs font-semibold text-slate-600 whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#0C831F] cursor-pointer"
                >
                  <option value="relevance">Relevance (Default)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Horizontal Scrollable Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
              <button
                type="button"
                onClick={() => handleCategorySelect('All')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === 'All'
                    ? 'bg-[#0C831F] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                All Products ({PRODUCTS.length})
              </button>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => handleCategorySelect(cat.name)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-[#0C831F] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                    }`}
                  >
                    {cat.name} ({cat.itemCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Empty Search / Filter State */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
              <p className="text-base font-bold text-slate-900">
                No products matched "{searchQuery}"
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Try searching for Milk, Bread, Bananas, Tomatoes, Potato, Eggs, Butter, Cheese, Chips, Cola, Noodles, Atta, Rice, or Dishwash.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSortBy('relevance');
                }}
                className="px-4 py-2 rounded-xl bg-[#0C831F] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Show All 32 Products
              </button>
            </div>
          ) : (
            /* Responsive Product Grid: 2-col on mobile, 4-5 cols on desktop */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  quantity={cartQuantities[product.id] || 0}
                  onAdd={handleAddToCart}
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  onSelectProduct={handleSelectProduct}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* =========================================================
          TOAST FEEDBACK NOTIFICATION (Bottom Left on Desktop)
          ========================================================= */}
      {toastMessage && (
        <div className="fixed bottom-16 sm:bottom-5 left-1/2 sm:left-6 -translate-x-1/2 sm:translate-x-0 z-40 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#FACC15] shrink-0" />
          <span>{toastMessage}</span>
          {billSummary.itemCount > 0 && (
            <button
              type="button"
              onClick={() => {
                setToastMessage(null);
                setIsCartOpen(true);
              }}
              className="text-[#FACC15] hover:underline font-bold ml-1 cursor-pointer"
            >
              View Cart
            </button>
          )}
        </div>
      )}

      {/* =========================================================
          MOBILE FLOATING CART SUMMARY BAR (when items in basket)
          ========================================================= */}
      {billSummary.itemCount > 0 && !isCartOpen && (
        <div className="sm:hidden sticky bottom-3 z-30 px-4 pointer-events-none">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#0C831F] text-white shadow-xl flex items-center justify-between pointer-events-auto cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center font-extrabold text-xs tabular-nums">
                {billSummary.itemCount}
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold tabular-nums">₹{billSummary.grandTotal}</p>
                <p className="text-[10px] text-emerald-100">
                  {billSummary.deliveryFee === 0
                    ? 'FREE Delivery Unlocked'
                    : `Add ₹${billSummary.amountForFreeDelivery} for FREE delivery`}
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold bg-[#FACC15] text-slate-950 px-3 py-1.5 rounded-xl">
              View Basket →
            </span>
          </button>
        </div>
      )}

      {/* =========================================================
          FOOTER (Required attribution + sample disclaimer)
          ========================================================= */}
      <footer className="bg-white border-t border-slate-200/90 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-1.5 text-lg font-extrabold tracking-tight text-slate-900">
                <span className="text-[#0C831F]">Quick</span>
                <span className="bg-[#FACC15] text-slate-950 px-1.5 py-0.5 rounded-md text-base">
                  Basket
                </span>
                <span className="text-xs font-semibold text-slate-500 ml-2">
                  10–15 Min Quick-Commerce Demo
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 max-w-xl">
                Note: All products, pack sizes, ratings, and INR (₹) prices shown in this store are sample demonstrations only. No real orders, deliveries, or payments take place.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
              {CATEGORIES.map((cat) => (
                <button
                  key={`footer-${cat.name}`}
                  type="button"
                  onClick={() => handleCategorySelect(cat.name, true)}
                  className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-[#ECFDF5] hover:text-[#0C831F] font-medium transition-colors cursor-pointer"
                >
                  {cat.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p className="font-semibold text-slate-800">
              Demo project built by{' '}
              <a
                href="https://senthesisdev.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0C831F] hover:underline font-bold"
              >
                Senthesis Dev - senthesisdev.me
              </a>
            </p>
            <p className="text-slate-400">
              DEMO STORE · Sample Indian grocery catalog · Frontend-only React + Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* =========================================================
          CONTEXTUAL MODALS & SLIDE-IN DRAWER
          ========================================================= */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        quantity={quickViewProduct ? cartQuantities[quickViewProduct.id] || 0 : 0}
        onAdd={handleAddToCart}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        relatedProducts={
          quickViewProduct
            ? PRODUCTS.filter(
                (p) =>
                  p.category === quickViewProduct.category && p.id !== quickViewProduct.id
              )
            : []
        }
        onSelectRelated={handleSelectProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        bill={billSummary}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onRemove={handleRemoveFromCart}
        onClearCart={handleClearCart}
        deliverySlot={deliverySlot}
        onChangeDeliverySlot={setDeliverySlot}
        scheduledTime={scheduledTime}
        onChangeScheduledTime={setScheduledTime}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        bill={billSummary}
        locationLabel={selectedLocation.label}
        deliverySlot={deliverySlot}
        scheduledTime={scheduledTime}
        onPlaceOrder={handlePlaceOrder}
      />

      <PastOrdersModal
        isOpen={isPastOrdersOpen}
        onClose={() => setIsPastOrdersOpen(false)}
        orders={pastOrders}
        onReorder={handleReorder}
        onClearHistory={() => {
          setPastOrders([]);
          showToast('Cleared past demo order history');
        }}
      />
    </div>
  );
}
