import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

interface PeerComparisonProps {
  stock: string;
}

const peerData: Record<string, { 
  peers: { symbol: string; name: string; price: number; change: number; similarity: number; pattern: string }[];
  sector: string;
}> = {
  RELIANCE: {
    sector: "Energy",
    peers: [
      { symbol: "ONGC", name: "ONGC", price: 245, change: 2.1, similarity: 85, pattern: "Similar breakout" },
      { symbol: "POWERGRID", name: "Power Grid", price: 280, change: 1.8, similarity: 72, pattern: "Cup formation" },
      { symbol: "NTPC", name: "NTPC", price: 320, change: -0.5, similarity: 68, pattern: "Consolidation" },
      { symbol: "BPCL", name: "BPCL", price: 380, change: 3.2, similarity: 65, pattern: "Bullish flag" },
    ]
  },
  TATA: {
    sector: "Automobile",
    peers: [
      { symbol: "MARUTI", name: "Maruti Suzuki", price: 10250, change: 1.2, similarity: 78, pattern: "Range bound" },
      { symbol: "M&M", name: "Mahindra", price: 1580, change: 2.5, similarity: 82, pattern: "Similar downtrend" },
      { symbol: "BAJAJ-AUTO", name: "Bajaj Auto", price: 4800, change: -1.1, similarity: 70, pattern: "Descending triangle" },
      { symbol: "HEROMOTOCO", name: "Hero MotoCorp", price: 4200, change: 0.8, similarity: 65, pattern: "Consolidation" },
    ]
  },
  INFY: {
    sector: "IT Services",
    peers: [
      { symbol: "TCS", name: "TCS", price: 3580, change: -0.7, similarity: 88, pattern: "Similar breakout" },
      { symbol: "WIPRO", name: "Wipro", price: 450, change: 1.5, similarity: 75, pattern: "Ascending triangle" },
      { symbol: "HCLTECH", name: "HCL Tech", price: 1350, change: 2.1, similarity: 80, pattern: "Bullish pattern" },
      { symbol: "TECHM", name: "Tech Mahindra", price: 1250, change: -0.3, similarity: 68, pattern: "Range bound" },
    ]
  },
  HDFC: {
    sector: "Banking",
    peers: [
      { symbol: "ICICI", name: "ICICI Bank", price: 1050, change: 0.5, similarity: 85, pattern: "Similar consolidation" },
      { symbol: "SBIN", name: "SBI", price: 620, change: 1.2, similarity: 78, pattern: "Range bound" },
      { symbol: "KOTAKBANK", name: "Kotak Bank", price: 1750, change: -0.8, similarity: 72, pattern: "Neutral zone" },
      { symbol: "AXISBANK", name: "Axis Bank", price: 1080, change: 1.8, similarity: 70, pattern: "Bullish bias" },
    ]
  },
  TCS: {
    sector: "IT Services",
    peers: [
      { symbol: "INFY", name: "Infosys", price: 1450, change: 1.5, similarity: 90, pattern: "Similar breakdown" },
      { symbol: "WIPRO", name: "Wipro", price: 450, change: -0.5, similarity: 75, pattern: "Weak trend" },
      { symbol: "HCLTECH", name: "HCL Tech", price: 1350, change: -1.2, similarity: 80, pattern: "Bearish pattern" },
      { symbol: "TECHM", name: "Tech Mahindra", price: 1250, change: -0.8, similarity: 72, pattern: "Downtrend" },
    ]
  },
};

export function PeerComparison({ stock }: PeerComparisonProps) {
  const data = peerData[stock] || peerData.RELIANCE;

  return (
    <div className="p-3">
      <h3 className="text-sm font-semibold text-white mb-1">Peer Comparison</h3>
      <p className="text-[10px] text-slate-400 mb-3">
        Stocks with similar chart patterns in {data.sector} sector
      </p>

      <div className="space-y-2">
        {data.peers.map((peer) => (
          <div
            key={peer.symbol}
            className="bg-slate-700 rounded p-2 hover:bg-slate-600 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <div>
                  <p className="text-sm font-medium text-white">{peer.symbol}</p>
                  <p className="text-[10px] text-slate-400">{peer.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">₹{peer.price}</p>
                <p className={`text-xs flex items-center gap-1 ${peer.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {peer.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {peer.change >= 0 ? '+' : ''}{peer.change}%
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400">Pattern Match:</span>
                <div className="flex items-center gap-1">
                  <div className="w-16 h-1.5 bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500"
                      style={{ width: `${peer.similarity}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-indigo-400">{peer.similarity}%</span>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-1">
              <span className="text-indigo-300">Pattern:</span> {peer.pattern}
            </p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 p-2 bg-slate-700/50 rounded">
        <p className="text-[10px] text-slate-400">
          <span className="text-indigo-400">Pattern Match</span> shows how similar the chart pattern is to {stock}. 
          Higher percentage = more similar price action.
        </p>
      </div>
    </div>
  );
}