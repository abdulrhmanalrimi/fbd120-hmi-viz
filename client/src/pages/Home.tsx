import { useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainMenu from '@/components/screens/MainMenu';
import ManualOperation from '@/components/screens/ManualOperation';
import ProcessParameters from '@/components/screens/ProcessParameters';
import Interlocks from '@/components/screens/Interlocks';
import AlarmScreen from '@/components/screens/AlarmScreen';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('main');

  const screens: Record<string, { component: React.ReactNode; title: string }> = {
    main: { component: <MainMenu onNavigate={setCurrentScreen} />, title: 'Main Menu' },
    manual: { component: <ManualOperation onNavigate={setCurrentScreen} />, title: 'Manual Operation' },
    parameters: { component: <ProcessParameters onNavigate={setCurrentScreen} />, title: 'Process Parameters' },
    interlocks: { component: <Interlocks onNavigate={setCurrentScreen} />, title: 'Interlocks Status' },
    alarms: { component: <AlarmScreen onNavigate={setCurrentScreen} />, title: 'Alarm History' },
  };

  const handlePrevious = () => {
    if (currentScreen !== 'main') {
      setCurrentScreen('main');
    }
  };

  const handleNext = () => {
    const screenOrder = ['main', 'manual', 'parameters', 'interlocks', 'alarms'];
    const currentIndex = screenOrder.indexOf(currentScreen);
    if (currentIndex < screenOrder.length - 1) {
      setCurrentScreen(screenOrder[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">FBD</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">FBD-120 HMI Dashboard</h1>
              <p className="text-slate-400 text-sm">Fluid Bed Dryer - Interactive Visualization</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-300 font-mono text-lg">WinCC flexible 2008</p>
            <p className="text-slate-500 text-sm">Interactive Preview</p>
          </div>
        </div>
      </div>

      {/* Main HMI Display */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-700 rounded-lg shadow-2xl overflow-hidden border-4 border-slate-600">
          {/* HMI Screen Header */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4 flex items-center justify-between border-b-2 border-slate-500">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-slate-300 font-mono text-sm">Manager | 00/00/00 | 00:00:00</span>
            </div>
            <span className="text-white font-semibold text-center flex-1">{screens[currentScreen].title}</span>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Screen Content */}
          <div className="bg-slate-100 p-8 min-h-96 flex items-center justify-center">
            {screens[currentScreen].component}
          </div>

          {/* HMI Screen Footer */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-6 py-4 flex items-center justify-between border-t-2 border-slate-500">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="sm"
              className="bg-slate-500 hover:bg-slate-400 text-white border-slate-400"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="flex gap-3">
              <Button
                onClick={() => alert('Alarm System Active')}
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Alarm
              </Button>
              <Button
                onClick={() => alert('Hooter Reset')}
                variant="secondary"
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                <Volume2 className="w-4 h-4 mr-2" />
                Hooter Reset
              </Button>
            </div>

            <Button
              onClick={handleNext}
              variant="outline"
              size="sm"
              className="bg-slate-500 hover:bg-slate-400 text-white border-slate-400"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Screen Navigation Info */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {Object.entries(screens).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setCurrentScreen(key)}
              className={`py-2 px-3 rounded text-sm font-medium transition-all ${
                currentScreen === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {value.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Information Panel */}
      <div className="max-w-4xl mx-auto mt-8 bg-slate-700 rounded-lg p-6 border border-slate-600">
        <h2 className="text-white font-bold mb-4">📋 HMI Design Information</h2>
        <div className="grid md:grid-cols-2 gap-4 text-slate-300 text-sm">
          <div>
            <p className="font-semibold text-blue-400 mb-2">🎯 Features</p>
            <ul className="space-y-1 text-slate-400">
              <li>✓ Manual Operation Control</li>
              <li>✓ Process Parameter Monitoring</li>
              <li>✓ Safety Interlocks Display</li>
              <li>✓ Real-time Alarm Tracking</li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-blue-400 mb-2">🔧 Technical Details</p>
            <ul className="space-y-1 text-slate-400">
              <li>• PLC Integration: S7-200 Compatible</li>
              <li>• Resolution: 800x600 / 640x480</li>
              <li>• Update Cycle: 100ms</li>
              <li>• Language: English/Arabic Ready</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
