import { Shield, Star, Bell, Settings, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-2 px-4 shadow-lg border-b border-indigo-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-1.5 rounded-lg shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
              Insider Radar
            </h1>
            <p className="text-[10px] text-indigo-300">Professional Trading Platform</p>
          </div>
          
          {/* Market Status */}
          <div className="flex items-center gap-2 ml-4 px-3 py-1 bg-slate-800 rounded-full">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs text-slate-300">
              {isOnline ? 'Market Open' : 'Market Closed'}
            </span>
            {isOnline ? <Wifi className="w-3 h-3 text-green-400" /> : <WifiOff className="w-3 h-3 text-red-400" />}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Time */}
          <div className="text-right">
            <p className="text-sm font-mono text-white">{currentTime.toLocaleTimeString('en-IN')}</p>
            <p className="text-[10px] text-slate-400">{currentTime.toLocaleDateString('en-IN')}</p>
          </div>
          
          <button className="relative p-2 text-indigo-200 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <button className="p-2 text-indigo-200 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 pl-3 border-l border-indigo-700">
            <div className="text-right">
              <p className="text-[10px] text-indigo-300">Welcome back,</p>
              <p className="text-sm font-semibold flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                Aapka Naam
              </p>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}