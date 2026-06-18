import { useState } from "react";
import { Plus, Eye, EyeOff, Settings, ChevronDown } from "lucide-react";
import type { Indicator } from "../App";

interface IndicatorsPanelProps {
  indicators: Indicator[];
  setIndicators: (indicators: Indicator[]) => void;
}

const availableIndicators = [
  { id: "sma20", name: "SMA (20)", type: "overlay" as const },
  { id: "sma50", name: "SMA (50)", type: "overlay" as const },
  { id: "ema12", name: "EMA (12)", type: "overlay" as const },
  { id: "ema26", name: "EMA (26)", type: "overlay" as const },
  { id: "bb", name: "Bollinger Bands", type: "overlay" as const },
  { id: "vwap", name: "VWAP", type: "overlay" as const },
  { id: "supertrend", name: "Supertrend", type: "overlay" as const },
  { id: "ichimoku", name: "Ichimoku Cloud", type: "overlay" as const },
  { id: "rsi", name: "RSI (14)", type: "oscillator" as const },
  { id: "macd", name: "MACD", type: "oscillator" as const },
  { id: "stoch", name: "Stochastic", type: "oscillator" as const },
  { id: "atr", name: "ATR", type: "oscillator" as const },
  { id: "obv", name: "OBV", type: "oscillator" as const },
  { id: "adx", name: "ADX", type: "oscillator" as const },
];

export function IndicatorsPanel({ indicators, setIndicators }: IndicatorsPanelProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleIndicator = (id: string) => {
    setIndicators(indicators.map(ind => 
      ind.id === id ? { ...ind, visible: !ind.visible } : ind
    ));
  };

  const addIndicator = (ind: typeof availableIndicators[0]) => {
    const newIndicator: Indicator = {
      id: ind.id,
      name: ind.name,
      type: ind.type,
      visible: true,
      settings: {},
    };
    setIndicators([...indicators, newIndicator]);
    setShowAddModal(false);
  };

  const removeIndicator = (id: string) => {
    setIndicators(indicators.filter(ind => ind.id !== id));
  };

  return (
    <div className="bg-slate-800 border-t border-slate-700 p-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-300">Indicators ({indicators.length})</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-1 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-1">
        {indicators.map((ind) => (
          <div
            key={ind.id}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
              ind.visible ? 'bg-indigo-600/20 text-indigo-300' : 'bg-slate-700 text-slate-400'
            }`}
          >
            <button onClick={() => toggleIndicator(ind.id)}>
              {ind.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
            <span>{ind.name}</span>
            <button
              onClick={() => removeIndicator(ind.id)}
              className="ml-1 text-slate-500 hover:text-red-400"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-4 rounded-lg w-80 max-h-96 overflow-y-auto">
            <h4 className="text-sm font-semibold text-white mb-3">Add Indicator</h4>
            
            <div className="space-y-2">
              <div>
                <p className="text-xs text-slate-400 mb-1">Overlay</p>
                <div className="grid grid-cols-2 gap-1">
                  {availableIndicators.filter(i => i.type === 'overlay').map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => addIndicator(ind)}
                      disabled={indicators.some(i => i.id === ind.id)}
                      className="px-2 py-1.5 bg-slate-700 rounded text-xs text-slate-300 hover:bg-slate-600 disabled:opacity-50"
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs text-slate-400 mb-1">Oscillators</p>
                <div className="grid grid-cols-2 gap-1">
                  {availableIndicators.filter(i => i.type === 'oscillator').map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => addIndicator(ind)}
                      disabled={indicators.some(i => i.id === ind.id)}
                      className="px-2 py-1.5 bg-slate-700 rounded text-xs text-slate-300 hover:bg-slate-600 disabled:opacity-50"
                    >
                      {ind.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setShowAddModal(false)}
              className="w-full mt-3 py-2 bg-slate-700 text-slate-300 rounded text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}