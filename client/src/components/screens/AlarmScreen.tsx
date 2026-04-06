import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock } from 'lucide-react';

interface AlarmScreenProps {
  onNavigate: (screen: string) => void;
}

export default function AlarmScreen({ onNavigate }: AlarmScreenProps) {
  const alarms = [
    { time: '14:35:22', code: 'E001', message: 'Inlet Temperature High', severity: 'high' },
    { time: '14:30:15', code: 'W002', message: 'Blower Speed Deviation', severity: 'medium' },
    { time: '14:25:48', code: 'I003', message: 'Filter Bag Shaking Completed', severity: 'info' },
    { time: '14:20:10', code: 'W001', message: 'System Air Pressure Low', severity: 'medium' },
    { time: '14:15:33', code: 'E002', message: 'Emergency Stop Activated', severity: 'high' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-500 text-red-900';
      case 'medium':
        return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      case 'info':
        return 'bg-blue-50 border-blue-500 text-blue-900';
      default:
        return 'bg-slate-50 border-slate-500 text-slate-900';
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Alarm History</h2>
        <p className="text-slate-600 text-sm">Recent system events and alerts</p>
      </div>

      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-6">
        <p className="text-red-900 font-semibold text-sm flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Active Alarms: 2
        </p>
      </div>

      <div className="space-y-2 mb-6 max-h-80 overflow-y-auto">
        {alarms.map((alarm, idx) => (
          <div
            key={idx}
            className={`border-l-4 p-3 rounded flex items-start gap-3 ${getSeverityColor(alarm.severity)}`}
          >
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm">{alarm.message}</span>
                <span className="text-xs font-mono bg-white bg-opacity-50 px-2 py-1 rounded">
                  {alarm.code}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs opacity-75">
                <Clock className="w-3 h-3" />
                {alarm.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-100 p-4 rounded-lg mb-6 border border-slate-300">
        <p className="text-slate-700 text-xs font-mono">
          <strong>Total Alarms:</strong> {alarms.length} | <strong>Active:</strong> 2 | <strong>Acknowledged:</strong> 3
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={() => onNavigate('main')} variant="outline" className="flex-1">
          Back to Menu
        </Button>
        <Button onClick={() => alert('Alarms Acknowledged')} className="flex-1 bg-red-600 hover:bg-red-700">
          Acknowledge All
        </Button>
      </div>
    </div>
  );
}
