import { TrendingUp, TrendingDown, Target, BarChart3, Activity } from "lucide-react";

interface InsightsPanelProps {
  stock: string;
}

const insights: Record<string, { trend: string; strength: string; signal: string; keyLevels: string[]; patterns: string[]; volume: string }> = {
  RELIANCE: {
    trend: "Bullish",
    strength: "Strong",
    signal: "Buy on dips near ₹2380-2400 support zone",
    keyLevels: ["Support: ₹2380", "Resistance: ₹2480", "Pivot: ₹2420"],
    patterns: ["Cup and Handle forming", "Bullish flag breakout"],
    volume: "Above average - 15.2M vs 10M avg"
  },
  TATA: {
    trend: "Bearish",
    strength: "Moderate",
    signal: "Wait for reversal confirmation below ₹650",
    keyLevels: ["Support: ₹650", "Resistance: ₹720", "Pivot: ₹680"],
    patterns: ["Descending triangle", "Potential double bottom"],
    volume: "Below average - 8.5M vs 12M avg"
  },
  INFY: {
    trend: "Bullish",
    strength: "Strong",
    signal: "Breakout above ₹1450, target ₹1520",
    keyLevels: ["Support: ₹1420", "Resistance: ₹1500", "Pivot: ₹1450"],
    patterns: ["Ascending triangle breakout", "Higher highs formation"],
    volume: "Above average - 7.8M vs 6M avg"
  },
  HDFC: {
    trend: "Neutral",
    strength: "Weak",
    signal: "Consolidation phase, wait for direction",
    keyLevels: ["Support: ₹1580", "Resistance: ₹1660", "Pivot: ₹1620"],
    patterns: ["Symmetrical triangle", "Range bound"],
    volume: "Average - 4.2M vs 4.5M avg"
  },
  TCS: {
    trend: "Bearish",
    strength: "Moderate",
    signal: "Sell on rallies towards ₹3600",
    keyLevels: ["Support: ₹3500", "Resistance: ₹3650", "Pivot: ₹3580"],
    patterns: ["Head and shoulders", "Lower highs"],
    volume: "Below average - 2.8M vs 3.5M avg"
  },
};

export function InsightsPanel({ stock }: InsightsPanelProps) {
  const data = insights[stock] || insights.RELIANCE;

  return (
    <div className="p-3 border-b border-slate-700">
      <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <Activity className="w-4 h-4 text-indigo-400" />
        Insights
      </h3>

      {/* Trend & Strength */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-700 rounded p-2">
          <p className="text-[10px] text-slate-400 mb-1">Trend</p>
          <div className="flex items-center gap-1">
            {data.trend === "Bullish" ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : data.trend === "Bearish" ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : (
              <BarChart3 className="w-4 h-4 text-amber-400" />
            )}
            <span className={`text-sm font-medium ${
              data.trend === "Bullish" ? "text-green-400" : 
              data.trend === "Bearish" ? "text-red-400" : "text-amber-400"
            }`}>
              {data.trend}
            </span>
          </div>
        </div>
        <div className="bg-slate-700 rounded p-2">
          <p className="text-[10px] text-slate-400 mb-1">Strength</p>
          <span className={`text-sm font-medium ${
            data.strength === "Strong" ? "text-green-400" : 
            data.strength === "Weak" ? "text-red-400" : "text-amber-400"
          }`}>
            {data.strength}
          </span>
        </div>
      </div>

      {/* Signal */}
      <div className="bg-indigo-900/30 border border-indigo-700 rounded p-2 mb-3">
        <div className="flex items-start gap-2">
          <Target className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-[10px] text-indigo-300 mb-1">Trading Signal</p>
            <p className="text-xs text-white">{data.signal}</p>
          </div>
        </div>
      </div>

      {/* Key Levels */}
      <div className="mb-3">
        <p className="text-[10px] text-slate-400 mb-1">Key Levels</p>
        <div className="space-y-1">
          {data.keyLevels.map((level, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-slate-300">{level.split(":")[0]}</span>
              <span className="text-white font-medium">₹{level.split("₹")[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Patterns */}
      <div className="mb-3">
        <p className="text-[10px] text-slate-400 mb-1">Chart Patterns</p>
        <div className="flex flex-wrap gap-1">
          {data.patterns.map((pattern, i) => (
            <span key={i} className="px-2 py-0.5 bg-slate-700 rounded text-[10px] text-slate-300">
              {pattern}
            </span>
          ))}
        </div>
      </div>

      {/* Volume Analysis */}
      <div className="bg-slate-700 rounded p-2">
        <p className="text-[10px] text-slate-400 mb-1">Volume Analysis</p>
        <p className="text-xs text-white">{data.volume}</p>
      </div>
    </div>
  );
}