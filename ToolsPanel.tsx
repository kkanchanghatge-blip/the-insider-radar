import { useState } from "react";
import { 
  MousePointer2, Crosshair, Minus, TrendingUp, Square, Circle,
  Type, Pencil, Eraser, Undo2, Redo2, Trash2, Lock, Unlock,
  Settings, ChevronDown, Ruler, Magnet, ArrowRight,
  Triangle, Hexagon, Layers, Grid3X3
} from "lucide-react";
import type { ToolType, Drawing } from "../App";

interface ToolsPanelProps {
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
  drawings: Drawing[];
  setDrawings: (drawings: Drawing[]) => void;
}

const toolGroups = [
  {
    name: "Select",
    tools: [
      { id: "cursor" as ToolType, icon: MousePointer2, label: "Cursor" },
      { id: "crosshair" as ToolType, icon: Crosshair, label: "Crosshair" },
    ]
  },
  {
    name: "Lines",
    tools: [
      { id: "line" as ToolType, icon: Minus, label: "Line" },
      { id: "trendline" as ToolType, icon: TrendingUp, label: "Trend" },
      { id: "horizontal" as ToolType, icon: Minus, label: "Horiz" },
      { id: "vertical" as ToolType, icon: Minus, label: "Vert", rotate: true },
    ]
  },
  {
    name: "Shapes",
    tools: [
      { id: "rectangle" as ToolType, icon: Square, label: "Rect" },
      { id: "circle" as ToolType, icon: Circle, label: "Circle" },
      { id: "triangle" as ToolType, icon: Triangle, label: "Tri" },
      { id: "arrow" as ToolType, icon: ArrowRight, label: "Arrow" },
    ]
  },
  {
    name: "Advanced",
    tools: [
      { id: "fibonacci" as ToolType, icon: Layers, label: "Fib" },
      { id: "pitchfork" as ToolType, icon: TrendingUp, label: "Pitch" },
      { id: "gann" as ToolType, icon: Grid3X3, label: "Gann" },
      { id: "parallel" as ToolType, icon: Minus, label: "Para" },
    ]
  },
  {
    name: "Tools",
    tools: [
      { id: "text" as ToolType, icon: Type, label: "Text" },
      { id: "brush" as ToolType, icon: Pencil, label: "Brush" },
      { id: "measure" as ToolType, icon: Ruler, label: "Measure" },
      { id: "magnet" as ToolType, icon: Magnet, label: "Magnet" },
    ]
  },
];

const colors = [
  "#6366f1", "#ef4444", "#22c55e", "#f59e0b", "#3b82f6",
  "#a855f7", "#ec4899", "#06b6d4", "#ffffff", "#6b7280",
];

const lineWidths = [1, 2, 3, 4, 5];

export function ToolsPanel({ 
  activeTool, 
  setActiveTool, 
  activeColor, 
  setActiveColor,
  drawings,
  setDrawings
}: ToolsPanelProps) {
  const [isLocked, setIsLocked] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState<Drawing[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Select", "Lines", "Shapes"]);

  const toggleGroup = (name: string) => {
    setExpandedGroups(prev => 
      prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]
    );
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setDrawings(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setDrawings(history[historyIndex + 1]);
    }
  };

  const handleClear = () => {
    if (drawings.length > 0) {
      setHistory([...history.slice(0, historyIndex + 1), drawings]);
      setHistoryIndex(historyIndex + 1);
      setDrawings([]);
    }
  };

  return (
    <div className="h-full flex flex-col py-2">
      {/* Tool Groups */}
      <div className="flex-1 overflow-y-auto px-1">
        {toolGroups.map((group) => (
          <div key={group.name} className="mb-1">
            <button
              onClick={() => toggleGroup(group.name)}
              className="w-full px-2 py-1 flex items-center justify-between text-slate-400 hover:text-white text-[10px]"
            >
              <span className="font-medium">{group.name}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${expandedGroups.includes(group.name) ? 'rotate-180' : ''}`} />
            </button>
            
            {expandedGroups.includes(group.name) && (
              <div className="grid grid-cols-2 gap-0.5 mt-0.5">
                {group.tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`p-1.5 rounded flex flex-col items-center gap-0.5 transition-all ${
                      activeTool === tool.id
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:bg-slate-700 hover:text-white"
                    }`}
                    title={tool.label}
                  >
                    <tool.icon className={`w-4 h-4 ${tool.rotate ? 'rotate-90' : ''}`} />
                    <span className="text-[8px]">{tool.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Color Picker */}
      <div className="px-1 py-1 border-t border-slate-700">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="w-full p-1.5 rounded bg-slate-700 hover:bg-slate-600 flex items-center justify-center gap-1"
        >
          <div className="w-4 h-4 rounded-full border border-white/30" style={{ backgroundColor: activeColor }} />
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </button>
        
        {showColorPicker && (
          <div className="grid grid-cols-5 gap-0.5 mt-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setActiveColor(color)}
                className={`w-5 h-5 rounded-full border ${activeColor === color ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Line Width */}
      <div className="px-1 py-1 border-t border-slate-700">
        <div className="flex items-center gap-0.5">
          {lineWidths.map((width) => (
            <button
              key={width}
              onClick={() => setLineWidth(width)}
              className={`flex-1 h-4 rounded flex items-center justify-center ${
                lineWidth === width ? 'bg-indigo-600' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              <div className="bg-white rounded-full" style={{ width: width * 2, height: width }} />
            </button>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="px-1 py-1 border-t border-slate-700 space-y-0.5">
        <div className="flex gap-0.5">
          <button onClick={handleUndo} className="flex-1 p-1.5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600">
            <Undo2 className="w-3 h-3 mx-auto" />
          </button>
          <button onClick={handleRedo} className="flex-1 p-1.5 rounded bg-slate-700 text-slate-300 hover:bg-slate-600">
            <Redo2 className="w-3 h-3 mx-auto" />
          </button>
        </div>
        <button onClick={handleClear} className="w-full p-1.5 rounded bg-red-900/50 text-red-400 hover:bg-red-900 text-xs">
          Clear ({drawings.length})
        </button>
      </div>
      
      {/* Lock */}
      <div className="px-1 py-1 border-t border-slate-700">
        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`w-full p-1.5 rounded flex items-center justify-center gap-1 ${
            isLocked ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400'
          }`}
        >
          {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          <span className="text-[10px]">{isLocked ? 'Locked' : 'Unlock'}</span>
        </button>
      </div>
    </div>
  );
}