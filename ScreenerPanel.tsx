import { useState } from "react";
import { Filter, TrendingUp, TrendingDown, RefreshCw } from "lucide-react";

interface ScreenerPanelProps {
  onSelectStock: (symbol: string) => void;
}

const screenerStocks = [
  { symbol: "ADANIENT", name: "Adani Enterprises", price: 2450, change: 5.2, volume: "12.5M", pe: 85, rsi: 72 },
  { symbol: "TATASTEEL", name: "Tata Steel", price: 125, change: 3.8, volume: "25.2M", pe: 6.5, rsi: 45 },
  { symbol: "SBIN", name: "State Bank of India", price: 620, change: 2.1, volume: "18.3M", pe: 12, rsi: 58 },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", price: 7250, change: -1.5, volume: "2.1M", pe: 35, rsi: 32 },
  { symbol: "MARUTI", name: "Maruti Suzuki", price: 10250, change: 1.2, volume: "1.8M", pe: 28, rsi: 65 },
  { symbol: "SUNPHARMA", name: "Sun Pharma", price: 1450, change: 2.8, volume: "3.2M", pe: 22, rsi: 55 },
];

const filterOptions = [
  { id: "gainers", label: "Top Gainers" },
  { id: "losers", label: "Top Losers" },
  { id: "volume", label: "High Volume" },
  { id: "breakout", label: "Breakout" },
  { id: "rsi_oversold", label: "RSI Oversold" },
  { id: "rsi_overbought", label: "RSI Overbought" },
];

export function ScreenerPanel({ onSelectStock }: ScreenerPanelProps) {
  const [activeFilter, setActiveFilter] = useState("gainers");
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-300">Stock Screener</h3>
        <button
          onClick={handleRefresh}
          className={`p-1 bg-slate-700 rounded text-slate-400 hover:text-white ${refreshing ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-1 mb-2">
        {filterOptions.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-2 py-1 rounded text-[10px] ${
              activeFilter === filter.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      
      {/* Results */}
      <div className="space-y-1">
        {screenerStocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onSelectStock(stock.symbol)}
            className="p-2 bg-slate-700 rounded cursor-pointer hover:bg-slate-600 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">{stock.symbol}</p>
                <p className="text-[10px] text-slate-400">{stock.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">₹{stock.price}</p>
                <p className={`text-xs flex items-center gap-1 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
              <span>Vol: {stock.volume}</span>
              <span>P/E: {stock.pe}</span>
              <span>RSI: {stock.rsi}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}