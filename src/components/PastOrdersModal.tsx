import React from 'react';
import { X, Package, Clock, RotateCcw, Trash2 } from 'lucide-react';
import { OrderRecord } from './CheckoutModal';

interface PastOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  onReorder: (order: OrderRecord) => void;
  onClearHistory: () => void;
}

export const PastOrdersModal: React.FC<PastOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
  onReorder,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="past-orders-title"
    >
      <div
        className="bg-white rounded-2xl border border-slate-200 max-w-xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#0C831F]" />
            <h2 id="past-orders-title" className="text-base font-bold text-slate-900">
              Past Demo Orders ({orders.length})
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {orders.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="text-xs font-medium text-slate-500 hover:text-red-600 inline-flex items-center gap-1 px-2 py-1 rounded cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close past orders modal"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-5 overflow-y-auto space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-10">
              <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-800">No demo orders yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Place a sample order from your basket to see it saved here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {order.orderId}
                      </span>
                      <span className="text-xs text-slate-500">{order.createdAt}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      {order.customer.name} · {order.customer.locationLabel}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-slate-900 tabular-nums">
                      ₹{order.bill.grandTotal}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0C831F]">
                      <Clock className="w-3 h-3" />
                      {order.deliverySlot}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  {order.items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex justify-between">
                      <span>
                        {quantity} × {product.name} ({product.weight})
                      </span>
                      <span className="font-medium tabular-nums">
                        ₹{product.price * quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      onReorder(order);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#0C831F] hover:bg-[#096918] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Add Items to Basket Again
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
