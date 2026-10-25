import React, { useState } from 'react';
import { Plus, Minus, Clock, Star } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onAdd: (product: Product) => void;
  onIncrement: (productId: string) => void;
  onDecrement: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  onSelectProduct,
  compact = false,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className={`group bg-white rounded-xl border border-slate-200/90 hover:border-[#0C831F]/40 hover:shadow-sm transition-all duration-150 flex flex-col justify-between overflow-hidden ${
        compact ? 'w-44 sm:w-52 shrink-0 p-2.5 sm:p-3' : 'p-2.5 sm:p-4'
      }`}
    >
      {/* Top clickable area: opens Quick-View modal */}
      <div
        onClick={() => onSelectProduct(product)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelectProduct(product);
          }
        }}
        className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0C831F] rounded-lg"
      >
        {/* Top Metadata Row: Unboxed text discipline */}
        <div className="flex items-center justify-between gap-1 text-[10px] sm:text-[11px] font-medium text-slate-500 mb-2">
          <span className="inline-flex items-center gap-1 text-slate-600 whitespace-nowrap">
            <Clock className="w-3 h-3 text-[#0C831F] shrink-0" />
            {product.deliveryTime}
          </span>
          {product.tag ? (
            <span
              className={`font-semibold tracking-tight whitespace-nowrap ${
                product.tag === 'Bestseller' ? 'text-amber-700' : 'text-[#0C831F]'
              }`}
            >
              {product.tag}
            </span>
          ) : (
            <span className="text-[#0C831F] font-semibold tabular-nums whitespace-nowrap">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* 4:3 Product Image Container */}
        <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden bg-slate-50 mb-2.5 sm:mb-3 flex items-center justify-center">
          {!imgError ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-50/60 p-2 text-center">
              <span className="text-xs font-semibold text-[#0C831F] line-clamp-2">{product.name}</span>
              <span className="text-[10px] text-slate-500 mt-0.5">{product.weight}</span>
            </div>
          )}
        </div>

        {/* Category & Rating Metadata (unboxed with middle dot separator) */}
        <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-500 mb-1 truncate">
          <span className="truncate">{product.category.split(' ')[0]}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-0.5 text-slate-700 font-medium tabular-nums shrink-0">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
          <span className="text-slate-400 tabular-nums shrink-0 hidden xs:inline sm:inline">
            ({product.reviewCount})
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-[15px] font-semibold text-slate-900 leading-snug line-clamp-2 min-h-[2.1rem] sm:min-h-[2.5rem] group-hover:text-[#0C831F] transition-colors">
          {product.name}
        </h3>

        {/* Pack Weight / Size */}
        <p className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5 sm:mt-1 truncate">
          {product.weight}
        </p>
      </div>

      {/* Bottom Price & Add / Stepper Bar */}
      <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-slate-100 flex items-center justify-between gap-1.5 sm:gap-2">
        <div className="flex flex-col min-w-0">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
            <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-[11px] sm:text-xs text-slate-400 line-through tabular-nums">
                ₹{product.mrp}
              </span>
            )}
          </div>
          {product.mrp > product.price && (
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#0C831F] tabular-nums truncate">
              Save ₹{product.mrp - product.price}
            </span>
          )}
        </div>

        {/* Interactive ADD button or Quantity +/- Stepper */}
        {quantity === 0 ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            aria-label={`Add ${product.name} to cart`}
            className="px-3 sm:px-4 py-1.5 min-w-[64px] sm:min-w-[76px] h-8 sm:h-9 rounded-lg border border-[#0C831F] bg-[#ECFDF5]/70 hover:bg-[#0C831F] active:scale-95 text-[#0C831F] hover:text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center shadow-2xs"
          >
            ADD
          </button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="min-w-[72px] sm:min-w-[84px] h-8 sm:h-9 rounded-lg bg-[#0C831F] text-white flex items-center justify-between px-1 sm:px-1.5 shadow-xs shrink-0"
          >
            <button
              type="button"
              onClick={() => onDecrement(product.id)}
              aria-label={`Decrease quantity of ${product.name}`}
              className="w-6 h-6 sm:h-7 flex items-center justify-center rounded hover:bg-black/15 active:bg-black/25 transition-colors cursor-pointer"
            >
              <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
            <span className="text-xs sm:text-sm font-bold tabular-nums px-1 select-none">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onIncrement(product.id)}
              aria-label={`Increase quantity of ${product.name}`}
              className="w-6 h-6 sm:h-7 flex items-center justify-center rounded hover:bg-black/15 active:bg-black/25 transition-colors cursor-pointer"
            >
              <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </button>
          </div>
        )}
      </div>
    </article>
  );
};
