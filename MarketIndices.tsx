import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface IndexData {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  stocks: number;
}

const initialIndices: IndexData[] = [
  { name: "NIFTY 50", value: 22456.80, change: 145.30, changePercent: 0.65, stocks: 50 },
  { name: "SENSEX", value: 73892.45, change: 489.20, changePercent: 0.67, stocks: 30 },
  { name: "NIFTY 500", value: 19845.60, change: -89.40, changePercent: -0.45, stocks: 500 },
  { name: "NIFTY BANK", value: 47892.30, change: 312.50, changePercent: 0.66, stocks: 12 },
  { name: "NIFTY IT", value: 35678.90, change: -156.80, changePercent: -0.44, stocks: 10 },
  { name: "INDIA VIX", value: 13.45, change: 0.82, changePercent: 6.49, stocks: 0 },
];

export function MarketIndices() {
  const [indices, setIndices] = useState(initialIndices);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices(prev => prev.map(idx => ({
        ...idx,
        value: idx.value + (Math.random() - 0.5) * 20,
        change: idx.change + (Math.random() - 0.5) * 5,
        changePercent: ((idx.change + (Math.random() - 0.5) * 5) / idx.value) * 100
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 border-b border-slate-700 px-4 py-2">
      <div className="flex items-center gap-6 overflow-x-auto">
        {indices.map((index) => (
          <div key={index.name} className="flex items-center gap-3 shrink-0">
            <div className={`p-1.5 rounded ${index.change >= 0 ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
              {index.change >= 0 
                ? <TrendingUp className="w-4 h-4 text-green-400" />
                : <TrendingDown className="w-4 h-4 text-red-400" />
              }
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-slate-300">{index.name}</span>
                {index.stocks > 0 && (
                  <span className="text-[10px] text-slate-500">({index.stocks})</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {index.value.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-xs font-medium ${index.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)} ({index.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Market Mood */}
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <BarChart3 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs text-slate-400">Market Mood:</span>
          <span className="text-xs font-medium text-green-400">Bullish</span>
        </div>
      </div>
    </div>
  );
}