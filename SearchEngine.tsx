import { useState } from "react";
import { Search, Star, Clock, TrendingUp, X } from "lucide-react";

interface SearchEngineProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (symbol: string) => void;
  selectedStock: string;
}

const nifty50Stocks = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy" },
  { symbol: "TATA", name: "Tata Motors", sector: "Auto" },
  { symbol: "INFY", name: "Infosys", sector: "IT" },
  { symbol: "HDFC", name: "HDFC Bank", sector: "Banking" },
  { symbol: "TCS", name: "TCS", sector: "IT" },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking" },
  { symbol: "ICICI", name: "ICICI Bank", sector: "Banking" },
  { symbol: "WIPRO", name: "Wipro", sector: "IT" },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom" },
  { symbol: "ITC", name: "ITC Ltd", sector: "FMCG" },
  { symbol: "KOTAKBANK", name: "Kotak Bank", sector: "Banking" },
  { symbol: "LT", name: "Larsen & Toubro", sector: "Infrastructure" },
  { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking" },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "Finance" },
  { symbol: "MARUTI", name: "Maruti Suzuki", sector: "Auto" },
];

const sensexStocks = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy" },
  { symbol: "HDFC", name: "HDFC Bank", sector: "Banking" },
  { symbol: "INFY", name: "Infosys", sector: "IT" },
  { symbol: "ICICI", name: "ICICI Bank", sector: "Banking" },
  { symbol: "TCS", name: "TCS", sector: "IT" },
  { symbol: "KOTAKBANK", name: "Kotak Bank", sector: "Banking" },
  { symbol: "LT", name: "L&T", sector: "Infra" },
  { symbol: "SBIN", name: "SBI", sector: "Banking" },
  { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking" },
  { symbol: "ITC", name: "ITC", sector: "FMCG" },
];

const nifty500Stocks = [
  { symbol: "ADANIENT", name: "Adani Enterprises", sector: "Conglomerate" },
  { symbol: "ADANIPORTS", name: "Adani Ports", sector: "Ports" },
  { symbol: "APOLLOHOSP", name: "Apollo Hospitals", sector: "Healthcare" },
  { symbol: "PIDILITE", name: "Pidilite Industries", sector: "Chemicals" },
  { symbol: "DABUR", name: "Dabur India", sector: "FMCG" },
  { symbol: "BRITANNIA", name: "Britannia Industries", sector: "FMCG" },
  { symbol: "NESTLEIND", name: "Nestle India", sector: "FMCG" },
  { symbol: "ASIANPAINT", name: "Asian Paints", sector: "Paints" },
  { symbol: "TITAN", name: "Titan Company", sector: "Jewellery" },
  { symbol: "SUNPHARMA", name: "Sun Pharma", sector: "Pharma" },
];

const recentSearches = ["RELIANCE", "TATA", "INFY", "HDFC"];

export function SearchEngine({ searchQuery, setSearchQuery, onSearch, selectedStock }: SearchEngineProps) {
  const [activeTab, setActiveTab] = useState<"popular" | "nifty50" | "sensex" | "nifty500">("popular");
  const [showDropdown, setShowDropdown] = useState(false);

  const getStocks = () => {
    switch (activeTab) {
      case "nifty50": return nifty50Stocks;
      case "sensex": return sensexStocks;
      case "nifty500": return nifty500Stocks;
      default: return nifty50Stocks.slice(0, 8);
    }
  };

  const filteredStocks = getStocks().filter(s => 
    s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search stocks, indices, ETFs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            onFocus={() => setShowDropdown(true)}
            className="w-full py-2 pl-10 pr-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          )}
        </div>
        
        {/* Quick Stock Select */}
        <div className="flex items-center gap-1">
          <span className="text-xs text-slate-400">Quick:</span>
          {["RELIANCE", "TATA", "INFY", "HDFC"].map((symbol) => (
            <button
              key={symbol}
              onClick={() => onSearch(symbol)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                selectedStock === symbol
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-700 rounded-lg shadow-xl border border-slate-600 z-50">
          {/* Tabs */}
          <div className="flex border-b border-slate-600">
            {["popular", "nifty50", "sensex", "nifty500"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`flex-1 py-2 text-xs font-medium capitalize ${
                  activeTab === tab
                    ? "bg-slate-600 text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab === "nifty50" ? "NIFTY 50" : tab === "nifty500" ? "NIFTY 500" : tab}
              </button>
            ))}
          </div>
          
          {/* Recent Searches */}
          {activeTab === "popular" && (
            <div className="p-2 border-b border-slate-600">
              <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                <Clock className="w-3 h-3" />
                Recent
              </div>
              <div className="flex flex-wrap gap-1">
                {recentSearches.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => {
                      onSearch(symbol);
                      setShowDropdown(false);
                    }}
                    className="px-2 py-0.5 bg-slate-600 text-slate-300 rounded text-xs hover:bg-slate-500"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Stock List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredStocks.map((stock) => (
              <button
                key={stock.symbol}
                onClick={() => {
                  onSearch(stock.symbol);
                  setShowDropdown(false);
                }}
                className="w-full px-3 py-2 flex items-center justify-between hover:bg-slate-600 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{stock.symbol}</p>
                    <p className="text-xs text-slate-400">{stock.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">{stock.sector}</span>
                  <Star className="w-3 h-3 text-slate-500 hover:text-amber-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}