import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw, Maximize2, Shield } from 'lucide-react';
import { DeviceMode } from '../types/ad';

interface DeviceSimulatorProps {
  children: React.ReactNode;
  activeDevice: DeviceMode;
  onDeviceChange: (device: DeviceMode) => void;
}

export const DeviceSimulator: React.FC<DeviceSimulatorProps> = ({
  children,
  activeDevice,
  onDeviceChange,
}) => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  return (
    <div className="flex flex-col items-center w-full">
      {/* Top Device Switcher Toolbar */}
      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 rounded-2xl p-2 mb-6 shadow-xl flex items-center justify-between gap-2 backdrop-blur-md">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-xs font-bold text-slate-400 pl-2 hidden sm:inline">
            Aperçu Appareil :
          </span>

          <button
            onClick={() => onDeviceChange('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeDevice === 'mobile'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile (390px)</span>
          </button>

          <button
            onClick={() => onDeviceChange('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeDevice === 'tablet'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span>Tablette (768px)</span>
          </button>

          <button
            onClick={() => onDeviceChange('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeDevice === 'desktop'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-900/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Desktop (100%)</span>
          </button>
        </div>

        <div className="flex items-center gap-2 pr-1">
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Test Responsive Actif</span>
          </div>
        </div>
      </div>

      {/* Frame Container */}
      <div className="w-full flex justify-center items-start overflow-x-auto pb-8">
        {activeDevice === 'mobile' ? (
          /* Phone Hardware Mockup */
          <div className="relative mx-auto border-[10px] border-slate-800 bg-slate-950 rounded-[48px] shadow-2xl shadow-rose-950/20 overflow-hidden w-[390px] h-[780px] flex flex-col ring-1 ring-white/10">
            {/* Dynamic Island / Speaker Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-28 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-950 mr-2 border border-slate-800"></div>
              <div className="w-2 h-2 rounded-full bg-blue-900/60"></div>
            </div>

            {/* Scrollable Device Screen */}
            <div className="w-full h-full overflow-y-auto overscroll-contain bg-slate-950 pt-6">
              {children}
            </div>

            {/* Home indicator bar at bottom */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-500/50 rounded-full z-50 pointer-events-none"></div>
          </div>
        ) : activeDevice === 'tablet' ? (
          /* Tablet Mockup */
          <div className="relative mx-auto border-[12px] border-slate-800 bg-slate-950 rounded-[36px] shadow-2xl overflow-hidden w-[768px] h-[820px] flex flex-col ring-1 ring-white/10">
            {/* Tablet Camera notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 border border-slate-700 z-50"></div>
            {/* Scrollable Tablet Screen */}
            <div className="w-full h-full overflow-y-auto overscroll-contain bg-slate-950 pt-5">
              {children}
            </div>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-36 h-1 bg-slate-500/50 rounded-full z-50 pointer-events-none"></div>
          </div>
        ) : (
          /* Full Desktop Fluid View */
          <div className="w-full bg-slate-950 rounded-2xl border border-slate-800/80 shadow-2xl overflow-hidden">
            {/* Browser top chrome */}
            <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="bg-slate-950 px-6 py-1 rounded-lg border border-slate-800 text-[11px] text-slate-400 font-mono">
                https://mon-site.com/barca/lamine-yamal-ad-pin
              </div>
              <div className="w-12"></div>
            </div>
            <div className="w-full overflow-y-auto max-h-[820px]">
              {children}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
