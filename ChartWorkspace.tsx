import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, TrendingUp, TrendingDown, ZoomIn, ZoomOut, 
  BarChart3, LineChart, AreaChart, Grid, Move, Eye, EyeOff, Maximize2
} from "lucide-react";
import type { ToolType, Drawing, Indicator } from "../App";

interface ChartWorkspaceProps {
  selectedStock: string;
  promptText: string;
  setPromptText: (text: string) => void;
  activeTool: ToolType;
  activeColor: string;
  drawings: Drawing[];
  setDrawings: (drawings: Drawing[]) => void;
  chartRef: React.RefObject<HTMLDivElement>;
  indicators: Indicator[];
  timeframe: string;
  setTimeframe: (tf: string) => void;
  chartType: "candle" | "line" | "area" | "heikinashi" | "renko" | "kagi";
  setChartType: (type: "candle" | "line" | "area" | "heikinashi" | "renko" | "kagi") => void;
}

const stockInfo: Record<string, { name: string; sector: string; index: string }> = {
  RELIANCE: { name: "Reliance Industries Ltd.", sector: "Energy", index: "NIFTY 50" },
  TATA: { name: "Tata Motors Ltd.", sector: "Automobile", index: "NIFTY 50" },
  INFY: { name: "Infosys Ltd.", sector: "IT Services", index: "NIFTY 50" },
  HDFC: { name: "HDFC Bank Ltd.", sector: "Banking", index: "NIFTY 50" },
  TCS: { name: "Tata Consultancy Services", sector: "IT Services", index: "NIFTY 50" },
};

const timeframes = ["1m", "5m", "15m", "30m", "1H", "4H", "1D", "1W", "1M"];

const chartTypes = [
  { id: "candle" as const, label: "Candle", icon: BarChart3 },
  { id: "line" as const, label: "Line", icon: LineChart },
  { id: "area" as const, label: "Area", icon: AreaChart },
  { id: "heikinashi" as const, label: "Heikin", icon: BarChart3 },
  { id: "renko" as const, label: "Renko", icon: Grid },
  { id: "kagi" as const, label: "Kagi", icon: Move },
];

const generateOHLCData = (days: number = 100) => {
  const data = [];
  let open = 2400;
  const now = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * 2 * volatility * open;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * open;
    const low = Math.min(open, close) - Math.random() * volatility * open;
    
    data.push({
      time: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000 + 5000000),
    });
    
    open = close;
  }
  
  return data;
};

export function ChartWorkspace({ 
  selectedStock, 
  promptText, 
  setPromptText, 
  activeTool, 
  activeColor,
  drawings,
  setDrawings,
  chartRef,
  indicators,
  timeframe,
  setTimeframe,
  chartType,
  setChartType
}: ChartWorkspaceProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [ohlcData] = useState(generateOHLCData(200));
  const [showVolume, setShowVolume] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<{x: number, y: number}[]>([]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPrice = ohlcData[ohlcData.length - 1].close;
  const previousPrice = ohlcData[ohlcData.length - 2].close;
  const priceChange = currentPrice - previousPrice;
  const isPositive = priceChange >= 0;

  const info = stockInfo[selectedStock] || { name: "Stock", sector: "Unknown", index: "NIFTY 500" };

  // Draw candles
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, right: 60, bottom: 30, left: 10 };

    // Clear
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Grid
    if (showGrid) {
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      
      for (let i = 0; i <= 5; i++) {
        const y = padding.top + (height - padding.top - padding.bottom) * i / 5;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
      }
    }

    // Price range
    const prices = ohlcData.map(d => d.high).concat(ohlcData.map(d => d.low));
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const candleWidth = (chartWidth / ohlcData.length) * 0.8;

    // Draw candles
    ohlcData.forEach((candle, i) => {
      const x = padding.left + (i * chartWidth / ohlcData.length) + candleWidth / 2;
      const isGreen = candle.close >= candle.open;
      
      const yOpen = padding.top + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const yClose = padding.top + ((maxPrice - candle.close) / priceRange) * chartHeight;
      const yHigh = padding.top + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const yLow = padding.top + ((maxPrice - candle.low) / priceRange) * chartHeight;

      // Wick
      ctx.strokeStyle = isGreen ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, yHigh);
      ctx.lineTo(x, yLow);
      ctx.stroke();

      // Body
      ctx.fillStyle = isGreen ? '#22c55e' : '#ef4444';
      const bodyTop = Math.min(yOpen, yClose);
      const bodyHeight = Math.max(Math.abs(yClose - yOpen), 1);
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });

    // Draw volume bars
    if (showVolume) {
      const maxVolume = Math.max(...ohlcData.map(d => d.volume));
      const volumeHeight = 60;
      
      ohlcData.forEach((candle, i) => {
        const x = padding.left + (i * chartWidth / ohlcData.length) + candleWidth / 2;
        const volH = (candle.volume / maxVolume) * volumeHeight;
        const isGreen = candle.close >= candle.open;
        
        ctx.fillStyle = isGreen ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';
        ctx.fillRect(x - candleWidth / 2, height - padding.bottom - volH, candleWidth, volH);
      });
    }

    // Price labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (priceRange * i / 5);
      const y = padding.top + (chartHeight * i / 5);
      ctx.fillText(price.toFixed(2), width - 10, y + 4);
    }

    // Draw existing drawings
    drawings.forEach(drawing => {
      ctx.strokeStyle = drawing.color;
      ctx.lineWidth = drawing.lineWidth;
      ctx.beginPath();
      
      drawing.points.forEach((point, idx) => {
        if (idx === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      
      ctx.stroke();
    });

    // Current drawing
    if (currentPoints.length > 0 && isDrawing) {
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      currentPoints.forEach((point, idx) => {
        if (idx === 0) ctx.moveTo(point.x, point.y);
        else ctx.lineTo(point.x, point.y);
      });
      
      ctx.stroke();
    }

  }, [ohlcData, showGrid, showVolume, drawings, currentPoints, isDrawing, activeColor]);

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (activeTool === 'cursor') return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setCurrentPoints([{ x, y }]);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (activeTool === 'brush' || activeTool === 'freehand') {
      setCurrentPoints(prev => [...prev, { x, y }]);
    } else if (currentPoints.length === 1) {
      setCurrentPoints([currentPoints[0], { x, y }]);
    }
  };

  const handleCanvasMouseUp = () => {
    if (!isDrawing) return;
    
    if (currentPoints.length > 0) {
      const newDrawing: Drawing = {
        id: Date.now().toString(),
        type: activeTool,
        points: currentPoints,
        color: activeColor,
        lineWidth: 2,
      };
      setDrawings([...drawings, newDrawing]);
    }
    
    setIsDrawing(false);
    setCurrentPoints([]);
  };

  const handleGenerateFromPrompt = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">{selectedStock}</h2>
              <span className="text-xs text-slate-400 bg-slate-700 px-2 py-0.5 rounded">{info.index}</span>
            </div>
            <p className="text-xs text-slate-400">{info.name} • {info.sector}</p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-xl font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              ₹{currentPrice.toFixed(2)}
            </span>
            <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({((priceChange / previousPrice) * 100).toFixed(2)}%)
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Timeframes */}
          <div className="flex items-center bg-slate-700 rounded-lg p-0.5">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                  timeframe === tf ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
          
          {/* Chart Types */}
          <div className="flex items-center bg-slate-700 rounded-lg p-0.5">
            {chartTypes.map((ct) => (
              <button
                key={ct.id}
                onClick={() => setChartType(ct.id)}
                className={`p-1.5 rounded transition-colors ${
                  chartType === ct.id ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title={ct.label}
              >
                <ct.icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
          
          {/* View Options */}
          <button
            onClick={() => setShowVolume(!showVolume)}
            className={`p-1.5 rounded ${showVolume ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}
            title="Volume"
          >
            <BarChart3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1.5 rounded ${showGrid ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}
            title="Grid"
          >
            <Grid className="w-4 h-4" />
          </button>
          
          {/* Zoom */}
          <div className="flex items-center gap-1">
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-1.5 bg-slate-700 rounded text-slate-400 hover:text-white">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 w-12 text-center">{(zoom * 100).toFixed(0)}%</span>
            <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-1.5 bg-slate-700 rounded text-slate-400 hover:text-white">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Chart Canvas */}
      <div ref={containerRef} className="flex-1 relative" style={{ minHeight: '400px' }}>
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
        />
        
        {/* Active Tool Indicator */}
        {activeTool !== 'cursor' && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-indigo-600 rounded text-xs text-white flex items-center gap-1">
            <span className="capitalize">{activeTool}</span>
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          </div>
        )}
      </div>
      
      {/* Generate from Prompt */}
      <div className="p-3 bg-slate-800 border-t border-slate-700">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
            <input
              type="text"
              placeholder="Describe chart pattern... e.g., 'Show support at 2400 with resistance at 2500'"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleGenerateFromPrompt}
            disabled={isGenerating || !promptText}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}