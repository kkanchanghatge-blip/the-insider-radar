import { useState } from "react";
import { ShoppingCart, TrendingUp, TrendingDown, Check } from "lucide-react";

export function OrderPanel() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(2400);
  const [orderMode, setOrderMode] = useState<"market" | "limit" | "stop">("market");
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePlaceOrder = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const totalValue = quantity * price;

  return (
    <div className="p-2">
      <h3 className="text-xs font-semibold text-slate-300 mb-2">Quick Order</h3>
      
      {/* Buy/Sell Toggle */}
      <div className="flex gap-1 mb-3">
        <button
          onClick={() => setOrderType("buy")}
          className={`flex-1 py-2 rounded text-xs font-medium flex items-center justify-center gap-1 ${
            orderType === "buy"
              ? "bg-green-600 text-white"
              : "bg-slate-700 text-slate-400"
          }`}
        >
          <TrendingUp className="w-3 h-3" />
          BUY
        </button>
        <button
          onClick={() => setOrderType("sell")}
          className={`flex-1 py-2 rounded text-xs font-medium flex items-center justify-center gap-1 ${
            orderType === "sell"
              ? "bg-red-600 text-white"
              : "bg-slate-700 text-slate-400"
          }`}
        >
          <TrendingDown className="w-3 h-3" />
          SELL
        </button>
      </div>

      {/* Order Mode */}
      <div className="flex gap-1 mb-3">
        {["market", "limit", "stop"].map((mode) => (
          <button
            key={mode}
            onClick={() => setOrderMode(mode as typeof orderMode)}
            className={`flex-1 py-1.5 rounded text-[10px] capitalize ${
              orderMode === mode
                ? "bg-indigo-600 text-white"
                : "bg-slate-700 text-slate-400"
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Price Input */}
      {orderMode !== "market" && (
        <div className="mb-2">
          <label className="text-[10px] text-slate-400">Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm"
          />
        </div>
      )}

      {/* Quantity */}
      <div className="mb-2">
        <label className="text-[10px] text-slate-400">Quantity</label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-2 py-1 bg-slate-700 rounded text-white"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="flex-1 px-2 py-1.5 bg-slate-700 border border-slate-600 rounded text-white text-sm text-center"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-2 py-1 bg-slate-700 rounded text-white"
          >
            +
          </button>
        </div>
      </div>

      {/* Quick Quantities */}
      <div className="flex gap-1 mb-3">
        {[10, 25, 50, 100].map((q) => (
          <button
            key={q}
            onClick={() => setQuantity(q)}
            className="flex-1 py-1 bg-slate-700 rounded text-[10px] text-slate-300 hover:bg-slate-600"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-slate-700 rounded p-2 mb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Total Value</span>
          <span className="text-white font-medium">₹{totalValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400">Brokerage</span>
          <span className="text-white">₹{(totalValue * 0.0003).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-slate-400">STT</span>
          <span className="text-white">₹{(totalValue * 0.00025).toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        onClick={handlePlaceOrder}
        className={`w-full py-2.5 rounded font-medium text-sm flex items-center justify-center gap-2 ${
          orderType === "buy"
            ? "bg-green-600 hover:bg-green-500 text-white"
            : "bg-red-600 hover:bg-red-500 text-white"
        }`}
      >
        {showSuccess ? (
          <>
            <Check className="w-4 h-4" />
            Order Placed!
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            Place {orderType.toUpperCase()} Order
          </>
        )}
      </button>
    </div>
  );
}