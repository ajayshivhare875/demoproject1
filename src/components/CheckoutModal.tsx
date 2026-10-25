import React from 'react';
import {
  X,
  CheckCircle2,
  MapPin,
  Phone,
  User,
  Clock,
  ShieldAlert,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { BillSummary, CartItem } from './CartDrawer';

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    locationLabel: string;
  };
  deliverySlot: '10-15 min' | 'Scheduled';
  scheduledTime?: string;
  items: CartItem[];
  bill: BillSummary;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  bill: BillSummary;
  locationLabel: string;
  deliverySlot: '10-15 min' | 'Scheduled';
  scheduledTime: string;
  onPlaceOrder: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  bill,
  locationLabel,
  deliverySlot,
  scheduledTime,
  onPlaceOrder,
}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [error, setError] = React.useState('');
  const [confirmedOrder, setConfirmedOrder] = React.useState<OrderRecord | null>(null);

  // Reset error when modal opens/closes
  React.useEffect(() => {
    if (!isOpen) {
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFillSampleDetails = () => {
    setName('Aarav Sharma');
    setPhone('9876543210');
    setAddress('Flat 402, Green View Apartments, Main Market Road');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      setError('Your basket is empty. Please add items before placing an order.');
      return;
    }

    const trimmedName = name.trim();
    const cleanedPhone = phone.replace(/\D/g, '');
    const trimmedAddress = address.trim();

    if (!trimmedName) {
      setError('Please enter your full name.');
      return;
    }
    if (cleanedPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (trimmedAddress.length < 6) {
      setError('Please enter your complete house / flat number and street address.');
      return;
    }

    setError('');
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newOrder: OrderRecord = {
      orderId: `QB-${randomNum}`,
      createdAt: new Date().toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      customer: {
        name: trimmedName,
        phone: cleanedPhone.slice(-10),
        address: trimmedAddress,
        locationLabel,
      },
      deliverySlot,
      scheduledTime: deliverySlot === 'Scheduled' ? scheduledTime : undefined,
      items: [...items],
      bill: { ...bill },
    };

    setConfirmedOrder(newOrder);
    onPlaceOrder(newOrder);
  };

  const handleCloseModal = () => {
    setConfirmedOrder(null);
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
      onClick={handleCloseModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 max-w-lg w-full max-h-[92dvh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {!confirmedOrder ? (
          /* ============================
             STEP 1: CHECKOUT FORM
             ============================ */
          <div>
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs px-4 sm:px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 id="checkout-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
                  Delivery Details & Checkout
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Demo Checkout · No real payment or card required
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Close checkout modal"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
              {/* Demo Store Notice + Quick Auto-fill Helper */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex flex-col gap-2 text-xs text-amber-900">
                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Demo Store Notice:</strong> This is a sample quick-commerce showcase. No real payment or order is placed.
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleFillSampleDetails}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-200/70 hover:bg-amber-200 text-amber-950 font-bold text-[11px] transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" />
                    Auto-fill Demo Address
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* Name Input */}
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="checkout-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0C831F]"
                  />
                </div>
              </div>

              {/* Phone Input */}
              <div>
                <label htmlFor="checkout-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number (10 digits) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="checkout-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 9876543210"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0C831F] tabular-nums"
                  />
                </div>
              </div>

              {/* Delivery Area / Address Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5 gap-2">
                  <label htmlFor="checkout-address" className="block text-xs font-bold text-slate-700">
                    Complete Delivery Address *
                  </label>
                  <span className="text-[11px] font-medium text-[#0C831F] inline-flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{locationLabel}</span>
                  </span>
                </div>
                <textarea
                  id="checkout-address"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat / House No., Building, Block, Landmark"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#0C831F]"
                />
              </div>

              {/* Summary Strip */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs gap-2">
                  <span className="text-slate-500">Selected Delivery Slot</span>
                  <span className="font-bold text-slate-900 inline-flex items-center gap-1 text-right">
                    <Clock className="w-3.5 h-3.5 text-[#0C831F] shrink-0" />
                    {deliverySlot === '10-15 min' ? 'Instant (10-15 mins)' : scheduledTime}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Items ({bill.itemCount})</span>
                  <span className="font-semibold text-slate-800 tabular-nums">₹{bill.itemTotal}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className="font-semibold text-[#0C831F] tabular-nums">
                    {bill.deliveryFee === 0 ? 'FREE' : `₹${bill.deliveryFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Payable (Demo)</span>
                  <span className="text-base text-[#0C831F] tabular-nums">₹{bill.grandTotal}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-5 rounded-xl bg-[#0C831F] hover:bg-[#096918] active:scale-[0.99] text-white text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                Place Order · ₹{bill.grandTotal}
              </button>
            </form>
          </div>
        ) : (
          /* ============================
             STEP 2: ORDER SUCCESS SCREEN
             ============================ */
          <div className="p-5 sm:p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-[#ECFDF5] border border-emerald-200 text-[#0C831F] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0C831F]">
                Demo Order Confirmed
              </span>
              <h2 id="checkout-modal-title" className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                Thank you, {confirmedOrder.customer.name}!
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Simulated order placed successfully — no real payment or shipment was triggered.
              </p>
            </div>

            {/* Key Order Telemetry Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Order ID</span>
                <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {confirmedOrder.orderId}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="text-slate-500">Estimated Delivery</span>
                <span className="font-bold text-[#0C831F] text-right">
                  {confirmedOrder.deliverySlot === '10-15 min'
                    ? 'Arriving in 10–15 minutes'
                    : confirmedOrder.scheduledTime}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 text-xs">
                <span className="text-slate-500 shrink-0">Delivering To</span>
                <span className="font-medium text-slate-800 text-right break-words">
                  {confirmedOrder.customer.address}, {confirmedOrder.customer.locationLabel} (Ph: +91 {confirmedOrder.customer.phone})
                </span>
              </div>
            </div>

            {/* Itemized Order Summary */}
            <div className="text-left border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="inline-flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-[#0C831F]" />
                  Order Summary ({confirmedOrder.bill.itemCount} items)
                </span>
                <span className="tabular-nums">₹{confirmedOrder.bill.grandTotal}</span>
              </div>
              <div className="max-h-40 overflow-y-auto divide-y divide-slate-100 px-4">
                {confirmedOrder.items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-2.5 flex items-center justify-between text-xs gap-2">
                    <span className="text-slate-800 font-medium truncate">
                      {quantity} × {product.name} <span className="text-slate-400">({product.weight})</span>
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums shrink-0">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 space-y-1 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>MRP Discount Saved</span>
                  <span className="text-[#0C831F] font-semibold tabular-nums">
                    -₹{confirmedOrder.bill.discountTotal}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Partner Fee</span>
                  <span className="font-semibold tabular-nums">
                    {confirmedOrder.bill.deliveryFee === 0 ? 'FREE' : `₹${confirmedOrder.bill.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-extrabold text-slate-900 pt-1 border-t border-slate-200/80">
                  <span>Grand Total</span>
                  <span className="tabular-nums">₹{confirmedOrder.bill.grandTotal}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseModal}
              className="w-full py-3 px-5 rounded-xl bg-[#0C831F] hover:bg-[#096918] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
