import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface ProcessParametersProps {
  onNavigate: (screen: string) => void;
}

export default function ProcessParameters({ onNavigate }: ProcessParametersProps) {
  const [parameters, setParameters] = useState({
    blowerSpeed: { set: 1500, actual: 1485 },
    inletTemp: { set: 80, actual: 78.5 },
    exhaustTemp: { set: 65, actual: 64.2 },
    bedTemp: { set: 60, actual: 59.8 },
    dpFilter: { set: 50, actual: 48.3 },
  });

  const parametersList = [
    { key: 'blowerSpeed', label: 'Blower Speed', unit: 'RPM', address: 'AQW0' },
    { key: 'inletTemp', label: 'Inlet Air Temp', unit: 'DEG C', address: 'M20.0' },
    { key: 'exhaustTemp', label: 'Exhaust Air Temp', unit: 'DEG C', address: 'M24.0' },
    { key: 'bedTemp', label: 'Bed Temp', unit: 'DEG C', address: 'M28.0' },
    { key: 'dpFilter', label: 'Dp Across HEPA', unit: 'MMWC', address: 'M32.0' },
  ];

  const updateParameter = (key: string, field: 'set' | 'actual', value: number) => {
    setParameters(prev => ({
      ...prev,
      [key]: { ...prev[key as keyof typeof parameters], [field]: value }
    }));
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Process Parameters</h2>
        <p className="text-slate-600 text-sm">Real-time monitoring and setpoint adjustment</p>
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-300 border-b-2 border-slate-400">
              <th className="px-4 py-2 text-left font-bold text-slate-800">Parameter</th>
              <th className="px-4 py-2 text-center font-bold text-slate-800">Set Point</th>
              <th className="px-4 py-2 text-center font-bold text-slate-800">Actual</th>
              <th className="px-4 py-2 text-center font-bold text-slate-800">Unit</th>
              <th className="px-4 py-2 text-center font-bold text-slate-800">Address</th>
            </tr>
          </thead>
          <tbody>
            {parametersList.map((param) => {
              const data = parameters[param.key as keyof typeof parameters];
              const variance = Math.abs(data.set - data.actual);
              const isWarning = variance > 5;

              return (
                <tr
                  key={param.key}
                  className={`border-b border-slate-200 ${isWarning ? 'bg-yellow-50' : 'bg-white hover:bg-slate-50'}`}
                >
                  <td className="px-4 py-3 font-semibold text-slate-800">{param.label}</td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      value={data.set}
                      onChange={(e) => updateParameter(param.key, 'set', parseFloat(e.target.value))}
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-center font-mono"
                    />
                  </td>
                  <td className={`px-4 py-3 text-center font-mono font-bold ${isWarning ? 'text-orange-600' : 'text-green-600'}`}>
                    {data.actual}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-600 text-xs">{param.unit}</td>
                  <td className="px-4 py-3 text-center text-slate-500 text-xs font-mono">{param.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-blue-900 text-sm font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance Status
          </p>
          <p className="text-blue-700 text-xs mt-2">All parameters within acceptable range</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
          <p className="text-green-900 text-sm font-semibold">✓ System Healthy</p>
          <p className="text-green-700 text-xs mt-2">Last update: 00:00:00 | Cycle: 100ms</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onNavigate('main')} variant="outline" className="flex-1">
          Back to Menu
        </Button>
        <Button onClick={() => onNavigate('interlocks')} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Next Screen
        </Button>
      </div>
    </div>
  );
}
