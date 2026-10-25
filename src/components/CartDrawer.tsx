import React from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Zap,
  CalendarClock,
  Receipt,
  ArrowRight,
  Truck,
} from 'lucide-react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BillSummary {
  itemCount: number;
  mrpTotal: number;
  itemTotal: number;
  discountTotal: number;
  deliveryFee: number;
  grandTotal: number;
  amountForFreeDelivery: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  bill: BillSummary;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onRemove: (productId: string) => void;
  onClearCart: () => void;
  deliverySlot: '10-15 min' | 'Scheduled';
  onChangeDeliverySlot: (slot: '10-15 min' | 'Scheduled') => void;
  scheduledTime: string;
  onChangeScheduledTime: (time: string) => void;
  onProceedToCheckout: () => void;
}

const SCHEDULED_SLOTS = [
  'Today, 5:00 PM - 6:00 PM',
  'Today, 7:00 PM - 8:00 PM',
  'Tomorrow, 8:00 AM - 9:00 AM',
  'Tomorrow, 11:00 AM - 12:00 PM',
];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  bill,
  onIncrement,
  onDecrement,
  onRemove,
  onClearCart,
  deliverySlot,
  onChangeDeliverySlot,
  scheduledTime,
  onChangeScheduledTime,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const freeDeliveryProgress = Math.min(100, Math.round((bill.itemTotal / 499) * 100));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      <aside
        className="w-full max-w-md bg-slate-50 h-dvh flex flex-col justify-between shadow-2xl border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="bg-white px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#0C831F]" />
            <h2 className="text-base font-bold text-slate-900">
              My Basket ({bill.itemCount} {bill.itemCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={onClearCart}
                className="text-xs font-medium text-slate-500 hover:text-red-600 px-2 py-1 rounded transition-colors cursor-pointer"
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart drawer"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0C831F] mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Your basket is empty</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">
              Add farm-fresh fruits, milk, bread, snacks, and daily essentials for 10–15 minute delivery.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#0C831F] hover:bg-[#096918] text-white text-sm font-bold transition-colors cursor-pointer"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Free Delivery Threshold Banner */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90">
              <div className="flex items-center justify-between text-xs font-semibold mb-2">
                <span className="inline-flex items-center gap-1.5 text-slate-800">
                  <Truck className="w-4 h-4 text-[#0C831F]" />
                  {bill.amountForFreeDelivery === 0 ? (
                    <span className="text-[#0C831F]">
                      FREE Delivery unlocked on your order!
                    </span>
                  ) : (
                    <span>
                      Add <strong className="text-[#0C831F] tabular-nums">₹{bill.amountForFreeDelivery}</strong> more for{' '}
                      <strong className="text-[#0C831F]">FREE Delivery</strong>
                    </span>
                  )}
                </span>
                <span className="text-slate-400 tabular-nums">{freeDeliveryProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0C831F] transition-all duration-300 rounded-full"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>

            {/* Delivery Slot Selector: "10-15 min" vs "Scheduled" */}
            <div className="bg-white rounded-xl p-3.5 border border-slate-200/90">
              <p className="text-xs font-bold text-slate-800 mb-2.5">
                Select Delivery Slot
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChangeDeliverySlot('10-15 min')}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    deliverySlot === '10-15 min'
                      ? 'border-[#0C831F] bg-[#ECFDF5]/60 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <Zap
                    className={`w-4 h-4 shrink-0 ${
                      deliverySlot === '10-15 min' ? 'text-[#0C831F] fill-[#FACC15]' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <p className="text-xs font-bold leading-none">10-15 min</p>
                    <p className="text-[10px] text-slate-500 mt-1">Instant Express</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onChangeDeliverySlot('Scheduled')}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer flex items-center gap-2 ${
                    deliverySlot === 'Scheduled'
                      ? 'border-[#0C831F] bg-[#ECFDF5]/60 text-slate-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <CalendarClock
                    className={`w-4 h-4 shrink-0 ${
                      deliverySlot === 'Scheduled' ? 'text-[#0C831F]' : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <p className="text-xs font-bold leading-none">Scheduled</p>
                    <p className="text-[10px] text-slate-500 mt-1">Choose time</p>
                  </div>
                </button>
              </div>

              {deliverySlot === 'Scheduled' && (
                <div className="mt-3 pt-2.5 border-t border-slate-100">
                  <label htmlFor="scheduled-slot-select" className="block text-[11px] font-medium text-slate-600 mb-1.5">
                    Preferred 1-hour slot:
                  </label>
                  <select
                    id="scheduled-slot-select"
                    value={scheduledTime}
                    onChange={(e) => onChangeScheduledTime(e.target.value)}
                    className="w-full text-xs font-medium text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-[#0C831F]"
                  >
                    {SCHEDULED_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-xl border border-slate-200/90 divide-y divide-slate-100">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-lg object-cover bg-slate-50 border border-slate-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{product.weight}</p>
                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          ₹{product.price * quantity}
                        </span>
                        {product.mrp > product.price && (
                          <span className="text-[11px] text-slate-400 line-through tabular-nums">
                            ₹{product.mrp * quantity}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Controls: +/- Stepper and Remove */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-8 rounded-lg bg-[#0C831F] text-white flex items-center px-1">
                      <button
                        type="button"
                        onClick={() => onDecrement(product.id)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/15 cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                      <span className="text-xs font-bold tabular-nums px-2">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onIncrement(product.id)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="w-6 h-6 flex items-center justify-center rounded hover:bg-black/15 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Details Section */}
            <div className="bg-white rounded-xl p-4 border border-slate-200/90 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 pb-1 border-b border-slate-100">
                <Receipt className="w-4 h-4 text-[#0C831F]" />
                <span>Bill Details</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Item Total (MRP)</span>
                <span className="tabular-nums font-medium text-slate-800">₹{bill.mrpTotal}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#0C831F] font-medium">
                <span>Product MRP Discount</span>
                <span className="tabular-nums">-₹{bill.discountTotal}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Item Subtotal</span>
                <span className="tabular-nums font-semibold text-slate-900">₹{bill.itemTotal}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Delivery Fee (Free above ₹499)</span>
                <span className="tabular-nums font-semibold">
                  {bill.deliveryFee === 0 ? (
                    <span className="text-[#0C831F]">
                      <span className="text-slate-400 line-through mr-1">₹25</span>
                      FREE
                    </span>
                  ) : (
                    <span className="text-slate-800">₹{bill.deliveryFee}</span>
                  )}
                </span>
              </div>

              <div className="pt-2.5 border-t border-slate-200 flex items-center justify-between text-sm font-extrabold text-slate-900">
                <span>Grand Total</span>
                <span className="text-base tabular-nums">₹{bill.grandTotal}</span>
              </div>

              {bill.discountTotal > 0 && (
                <div className="mt-2 py-1.5 px-3 rounded-lg bg-[#ECFDF5] text-[#0C831F] text-xs font-semibold text-center tabular-nums">
                  You are saving ₹{bill.discountTotal + (bill.deliveryFee === 0 ? 25 : 0)} on this order!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Sticky Drawer Footer CTA */}
        {items.length > 0 && (
          <div className="bg-white p-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-5 rounded-xl bg-[#0C831F] hover:bg-[#096918] text-white flex items-center justify-between font-bold transition-colors cursor-pointer shadow-sm"
            >
              <div className="text-left">
                <p className="text-sm font-extrabold tabular-nums">₹{bill.grandTotal}</p>
                <p className="text-[10px] font-medium text-emerald-100">TOTAL PAYABLE</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};
