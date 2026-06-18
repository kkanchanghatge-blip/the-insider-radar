import { TrendingUp, TrendingDown, Minus, Target, Shield, Clock } from "lucide-react";

interface VerdictCardProps {
  stock: string;
}

const verdicts: Record<string, { 
  action: "BUY" | "SELL" | "HOLD"; 
  confidence: number; 
  targetPrice: number; 
  stopLoss: number; 
  timeframe: string;
  risk: string;
  rationale: string[];
}> = {
  RELIANCE: {
    action: "BUY",
    confidence: 78,
    targetPrice: 2650,
    stopLoss: 2300,
    timeframe: "3-6 months",
    risk: "Moderate",
    rationale: ["Strong fundamentals", "Positive sector outlook", "Technical breakout"]
  },
  TATA: {
    action: "HOLD",
    confidence: 55,
    targetPrice: 750,
    stopLoss: 620,
    timeframe: "1-3 months",
    risk: "High",
    rationale: ["Mixed signals", "Wait for clarity", "Sector headwinds"]
  },
  INFY: {
    action: "BUY",
    confidence: 82,
    targetPrice: 1600,
    stopLoss: 1380,
    timeframe: "6-12 months",
    risk: "Low",
    rationale: ["IT sector recovery", "Strong order book", "USD tailwinds"]
  },
  HDFC: {
    action: "HOLD",
    confidence: 60,
    targetPrice: 1750,
    stopLoss: 1550,
    timeframe: "3-6 months",
    risk: "Moderate",
    rationale: ["Rate cycle peak", "NIM pressure", "Wait for clarity"]
  },
  TCS: {
    action: "SELL",
    confidence: 65,
    targetPrice: 3300,
    stopLoss: 3650,
    timeframe: "1-3 months",
    risk: "Moderate",
    rationale: ["Technical breakdown", "Sector rotation", "Valuation concerns"]
  },
};

export function VerdictCard({ stock }: VerdictCardProps) {
  const data = verdicts[stock] || verdicts.RELIANCE;

  const getActionColor = () => {
    switch (data.action) {
      case "BUY": return "text-green-400";
      case "SELL": return "text-red-400";
      case "HOLD": return "text-amber-400";
    }
  };

  const getActionBg = () => {
    switch (data.action) {
      case "BUY": return "bg-green-900/30 border-green-700";
      case "SELL": return "bg-red-900/30 border-red-700";
      case "HOLD": return "bg-amber-900/30 border-amber-700";
    }
  };

  return (
    <div className="p-3 border-b border-slate-700">
      <h3 className="text-sm font-semibold text-white mb-3">Stock Verdict</h3>

      {/* Main Verdict */}
      <div className={`rounded-lg p-3 border ${getActionBg()} mb-3`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {data.action === "BUY" ? (
              <TrendingUp className="w-6 h-6 text-green-400" />
            ) : data.action === "SELL" ? (
              <TrendingDown className="w-6 h-6 text-red-400" />
            ) : (
              <Minus className="w-6 h-6 text-amber-400" />
            )}
            <span className={`text-2xl font-bold ${getActionColor()}`}>
              {data.action}
            </span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400">Confidence</p>
            <p className="text-lg font-bold text-white">{data.confidence}%</p>
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              data.action === "BUY" ? "bg-green-500" : 
              data.action === "SELL" ? "bg-red-500" : "bg-amber-500"
            }`}
            style={{ width: `${data.confidence}%` }}
          />
        </div>
      </div>

      {/* Target & Stop Loss */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-slate-700 rounded p-2">
          <div className="flex items-center gap-1 mb-1">
            <Target className="w-3 h-3 text-green-400" />
            <span className="text-[10px] text-slate-400">Target Price</span>
          </div>
          <p className="text-lg font-bold text-green-400">₹{data.targetPrice}</p>
        </div>
        <div className="bg-slate-700 rounded p-2">
          <div className="flex items-center gap-1 mb-1">
            <Shield className="w-3 h-3 text-red-400" />
            <span className="text-[10px] text-slate-400">Stop Loss</span>
          </div>
          <p className="text-lg font-bold text-red-400">₹{data.stopLoss}</p>
        </div>
      </div>

      {/* Timeframe & Risk */}
      <div className="flex gap-2 mb-3">
        <div className="flex-1 bg-slate-700 rounded p-2 text-center">
          <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
          <p className="text-[10px] text-slate-400">Timeframe</p>
          <p className="text-xs font-medium text-white">{data.timeframe}</p>
        </div>
        <div className="flex-1 bg-slate-700 rounded p-2 text-center">
          <Shield className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-[10px] text-slate-400">Risk Level</p>
          <p className={`text-xs font-medium ${
            data.risk === "Low" ? "text-green-400" : 
            data.risk === "High" ? "text-red-400" : "text-amber-400"
          }`}>
            {data.risk}
          </p>
        </div>
      </div>

      {/* Rationale */}
      <div>
        <p className="text-[10px] text-slate-400 mb-1">Key Reasons</p>
        <ul className="space-y-1">
          {data.rationale.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full shrink-0 mt-1.5" />
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}