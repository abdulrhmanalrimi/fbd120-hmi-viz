import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface InterlocksProps {
  onNavigate: (screen: string) => void;
}

export default function Interlocks({ onNavigate }: InterlocksProps) {
  const interlocks = [
    { label: 'Emergency Stop Released', address: 'I1.2', status: true },
    { label: 'System Air Pressure OK', address: 'I0.2', status: true },
    { label: 'Blower Motor Healthy', address: 'I0.1', status: true },
    { label: 'Filter Bag Sealed', address: 'I0.3', status: true },
    { label: 'Product Container Sealed', address: 'I0.4', status: true },
    { label: 'Product Container Present', address: 'I0.5', status: true },
    { label: 'AHU Door Closed', address: 'I1.3', status: true },
    { label: 'Inlet Damper Position OK', address: 'I1.0/I1.1', status: true },
    { label: 'Exhaust Damper Position OK', address: 'I1.4/I1.5', status: true },
    { label: 'Machine Ready', address: 'M0.2', status: true },
  ];

  const allOk = interlocks.every(i => i.status);

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Interlocks Status</h2>
        <p className="text-slate-600 text-sm">Safety monitoring</p>
      </div>

      <div className={`p-4 rounded-lg mb-6 ${allOk ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
        <p className={`font-bold text-sm ${allOk ? 'text-green-900' : 'text-red-900'}`}>
          {allOk ? 'All Interlocks OK' : 'Interlock Failure'}
        </p>
      </div>

      <div className="space-y-2 mb-6 max-h-96 overflow-y-auto">
        {interlocks.map((interlock, idx) => (
          <div
            key={idx}
            className={`flex items-center justify-between p-3 rounded border-l-4 ${
              interlock.status
                ? 'bg-green-50 border-green-500'
                : 'bg-red-50 border-red-500'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              {interlock.status ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <div>
                <p className={`font-semibold text-sm ${interlock.status ? 'text-green-900' : 'text-red-900'}`}>
                  {interlock.label}
                </p>
                <p className="text-xs text-slate-500 font-mono">{interlock.address}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded text-xs font-bold ${
              interlock.status
                ? 'bg-green-200 text-green-800'
                : 'bg-red-200 text-red-800'
            }`}>
              {interlock.status ? 'OK' : 'FAIL'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onNavigate('main')} variant="outline" className="flex-1">
          Back to Menu
        </Button>
        <Button onClick={() => onNavigate('alarms')} className="flex-1 bg-blue-600 hover:bg-blue-700">
          Next Screen
        </Button>
      </div>
    </div>
  );
}
