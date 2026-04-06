import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ManualOperationProps {
  onNavigate: (screen: string) => void;
}

export default function ManualOperation({ onNavigate }: ManualOperationProps) {
  const [controls, setControls] = useState({
    inletDamper: false,
    shaking: false,
    bagLock: false,
    filterSeal: false,
    containerSeal: false,
    purging: false,
  });

  const toggleControl = (key: keyof typeof controls) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const controlItems = [
    { key: 'inletDamper', label: 'Inlet Damper', address: 'I1.0/I1.1' },
    { key: 'shaking', label: 'Filter Shaking', address: 'M_Shaking' },
    { key: 'bagLock', label: 'Bag Lock', address: 'I0.3' },
    { key: 'filterSeal', label: 'Filter Seal', address: 'DI_FILTER_BAG' },
    { key: 'containerSeal', label: 'Container Seal', address: 'DI_CONTAINER' },
    { key: 'purging', label: 'Purging Valve', address: 'M_Purging' },
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Manual Operation 1/2</h2>
        <p className="text-slate-600 text-sm">Direct control of machine components</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {controlItems.map((item) => (
          <button
            key={item.key}
            onClick={() => toggleControl(item.key as keyof typeof controls)}
            className={`p-4 rounded-lg border-2 transition-all ${
              controls[item.key as keyof typeof controls]
                ? 'bg-green-100 border-green-500 shadow-md'
                : 'bg-slate-100 border-slate-300 hover:border-slate-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-slate-800 text-sm">{item.label}</span>
              {controls[item.key as keyof typeof controls] ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-slate-400" />
              )}
            </div>
            <div className="text-xs text-slate-500 font-mono">{item.address}</div>
            <div className={`mt-2 px-2 py-1 rounded text-xs font-bold ${
              controls[item.key as keyof typeof controls]
                ? 'bg-green-500 text-white'
                : 'bg-slate-300 text-slate-700'
            }`}>
              {controls[item.key as keyof typeof controls] ? 'ON' : 'OFF'}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-6">
        <p className="text-yellow-800 text-sm font-semibold">⚠️ Interlock Status</p>
        <div className="text-xs text-yellow-700 mt-2 space-y-1">
          <p>✓ Emergency Stop: Released</p>
          <p>✓ System Air Pressure: OK</p>
          <p>✓ Blower Motor: Healthy</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onNavigate('main')} variant="outline" className="flex-1">
          Back to Menu
        </Button>
        <Button onClick={() => onNavigate('parameters')} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Next Screen
        </Button>
      </div>
    </div>
  );
}
