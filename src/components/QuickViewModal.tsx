import React from 'react';
import { X, Clock, Star, ShieldCheck, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { Product } from '../data/products';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  quantity: number;
  onAdd: (product: Product) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  relatedProducts: Product[];
  onSelectRelated: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  relatedProducts,
  onSelectRelated,
}) => {
  if (!product) return null;

  const savings = product.mrp - product.price;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 sm:px-5 py-3.5 bg-white/95 backdrop-blur-xs border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 min-w-0">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1 text-[#0C831F] font-semibold shrink-0">
              <Clock className="w-3.5 h-3.5" />
              {product.deliveryTime}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Split */}
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Left Column: Studio Image */}
          <div className="sm:col-span-5">
            <div className="aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)} ({product.reviewCount} ratings)
              </span>
              {product.tag && (
                <span className="font-semibold text-amber-700">{product.tag}</span>
              )}
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="sm:col-span-7 flex flex-col justify-between">
            <div>
              <h2 id="quickview-title" className="text-lg sm:text-2xl font-bold text-slate-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1">
                Pack Size: <span className="text-slate-800 font-semibold">{product.weight}</span>
              </p>

              {/* Pricing Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tabular-nums">
                      ₹{product.price}
                    </span>
                    {product.mrp > product.price && (
                      <span className="text-xs sm:text-sm text-slate-400 line-through tabular-nums">
                        MRP ₹{product.mrp}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#0C831F] font-semibold mt-0.5 tabular-nums">
                    Inclusive of all taxes · Save ₹{savings} ({product.discountPercent}% OFF)
                  </p>
                </div>

                {/* Add / Stepper CTA */}
                {quantity === 0 ? (
                  <button
                    type="button"
                    onClick={() => onAdd(product)}
                    className="px-5 py-2.5 rounded-xl bg-[#0C831F] hover:bg-[#096918] active:scale-95 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="h-10 rounded-xl bg-[#0C831F] text-white flex items-center gap-3 px-3 shadow-xs shrink-0">
                    <button
                      type="button"
                      onClick={() => onDecrement(product.id)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/15 transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                    <span className="text-sm font-bold tabular-nums min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onIncrement(product.id)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-black/15 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>
                )}
              </div>

              {/* Description & Highlights */}
              <div className="mt-4 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{product.description}</p>
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 tracking-wide">
                    Key Product Highlights
                  </h4>
                  <ul className="space-y-1">
                    {product.highlights.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0C831F] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-[#0C831F] shrink-0" />
                  <span>{product.storageInfo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products in same category (Responsive 1-col on mobile, 3-col on tablet/desktop) */}
        {relatedProducts.length > 0 && (
          <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-700 mb-3">
              More in {product.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {relatedProducts.slice(0, 3).map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onSelectRelated(rel)}
                  className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-slate-200/80 hover:border-[#0C831F] text-left transition-colors cursor-pointer"
                >
                  <img
                    src={rel.image}
                    alt={rel.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-lg object-cover shrink-0 bg-slate-50"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-slate-900 truncate">{rel.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{rel.weight}</p>
                    <p className="text-xs font-bold text-[#0C831F] tabular-nums mt-0.5">
                      ₹{rel.price}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
