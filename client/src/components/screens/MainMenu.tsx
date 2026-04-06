import { Button } from '@/components/ui/button';
import { Zap, Settings, AlertTriangle, BarChart3 } from 'lucide-react';

interface MainMenuProps {
  onNavigate: (screen: string) => void;
}

export default function MainMenu({ onNavigate }: MainMenuProps) {
  const menuItems = [
    { id: 'manual', label: 'Manual Mode', icon: Zap, color: 'bg-blue-500' },
    { id: 'parameters', label: 'Process Parameters', icon: BarChart3, color: 'bg-green-500' },
    { id: 'interlocks', label: 'Interlocks Status', icon: AlertTriangle, color: 'bg-yellow-500' },
    { id: 'alarms', label: 'Alarm History', icon: AlertTriangle, color: 'bg-red-500' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'bg-purple-500' },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Main Menu</h2>
        <p className="text-slate-600">Select an operation mode or function</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`${item.color} hover:opacity-90 transition-all p-6 rounded-lg text-white font-semibold flex flex-col items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              <Icon className="w-8 h-8" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <p className="text-slate-700 text-sm">
          <strong>Status:</strong> Machine Ready | All Systems OK | Last Update: 00:00:00
        </p>
      </div>
    </div>
  );
}
