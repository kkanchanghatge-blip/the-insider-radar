import { useState } from "react";
import { Bell, Plus, X, Check, AlertTriangle } from "lucide-react";
import type { Alert } from "../App";

interface AlertSystemProps {
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  selectedStock: string;
}

export function AlertSystem({ alerts, setAlerts, selectedStock }: AlertSystemProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAlert, setNewAlert] = useState({
    condition: "above" as Alert["condition"],
    price: 0,
  });

  const handleAdd = () => {
    const alert: Alert = {
      id: Date.now().toString(),
      symbol: selectedStock,
      condition: newAlert.condition,
      price: newAlert.price,
      active: true,
      triggered: false,
    };
    setAlerts([...alerts, alert]);
    setShowAddModal(false);
    setNewAlert({ condition: "above", price: 0 });
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  return (
    <div className="p-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-semibold text-slate-300">Price Alerts</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="p-1 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      
      {alerts.length === 0 ? (
        <p className="text-xs text-slate-500 text-center py-4">No alerts set</p>
      ) : (
        <div className="space-y-1">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-2 rounded ${alert.triggered ? 'bg-amber-900/30 border border-amber-600' : 'bg-slate-700'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {alert.triggered ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Bell className={`w-4 h-4 ${alert.active ? 'text-indigo-400' : 'text-slate-500'}`} />
                  )}
                  <div>
                    <p className="text-xs font-medium text-white">{alert.symbol}</p>
                    <p className="text-[10px] text-slate-400">
                      {alert.condition.replace('_', ' ')} ₹{alert.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className={`p-1 rounded ${alert.active ? 'bg-green-600' : 'bg-slate-600'}`}
                  >
                    <Check className="w-3 h-3 text-white" />
                  </button>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="p-1 text-slate-500 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-800 p-4 rounded-lg w-64">
            <h4 className="text-sm font-semibold text-white mb-3">Create Alert for {selectedStock}</h4>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400">Condition</label>
                <select
                  value={newAlert.condition}
                  onChange={(e) => setNewAlert({ ...newAlert, condition: e.target.value as Alert["condition"] })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                >
                  <option value="above">Price Above</option>
                  <option value="below">Price Below</option>
                  <option value="crosses_up">Crosses Above</option>
                  <option value="crosses_down">Crosses Below</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-slate-400">Price</label>
                <input
                  type="number"
                  value={newAlert.price}
                  onChange={(e) => setNewAlert({ ...newAlert, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
                  placeholder="Enter price..."
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2 bg-slate-700 text-slate-300 rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 bg-indigo-600 text-white rounded text-sm"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}