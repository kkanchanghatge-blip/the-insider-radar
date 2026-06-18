import { useState } from "react";
import { Star, TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import type { WatchlistStock } from "../App";

interface WatchlistProps {
  watchlist: WatchlistStock[];
  setWatchlist: (list: WatchlistStock[]) => void;
  onSelectStock: (symbol: string) => void;
  selectedStock: string;
}

export function Watchlist({ watchlist, setWatchlist, onSelectStock, selectedStock }: WatchlistProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSymbol, setNewSymbol] = useState("");

  const handleAdd = () => {
    if (newSymbol) {
      const newStock: WatchlistStock = {
        symbol: newSymbol.toUpperCase(),
        name: newSymbol.toUpperCase(),
        price: Math.random() * 2000 + 500,
        change: (Math.random() - 0.5) * 100,
        changePercent: (Math.random() - 0.5) * 5,
        volume: Math.floor(Math.random() * 10000000),
      };
      setWatchlist([...watchlist, newStock]);
      setNewSymbol("");
      setShowAddModal(false);
    }
  };

  const handleRemove = (symbol: string) => {
    setWatchlist(watchlist.filter(s => s.symbol !== symbol));
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-300">My Watchlist</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-1 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      
      <div className="space-y-1">
        {watchlist.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className={`p-2 rounded cursor-pointer transition-colors ${
              selectedStock === stock.symbol
                ? 'bg-indigo-600/20 border border-indigo-500'
                : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <div>
                  <p className="text-sm font-medium text-white">{stock.symbol}</p>
                  <p className="text-[10px] text-slate-400">{stock.name}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(stock.symbol);
                }}
                className="p-1 text-slate-500 hover:text-red-400"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-sm font-bold text-white">₹{stock.price.toFixed(2)}</span>
              <div className={`flex items-center gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs">{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-4 rounded-lg w-64">
            <h4 className="text-sm font-semibold text-white mb-3">Add to Watchlist</h4>
            <input
              type="text"
              placeholder="Enter symbol..."
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-700 text-slate-300 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 bg-indigo-600 text-white rounded text-sm"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}