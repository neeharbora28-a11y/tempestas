import React from 'react';
import { RotateCw } from 'lucide-react';
import { TemperatureUnit } from '../types/weather';

interface HeaderProps {
  unit: TemperatureUnit;
  onToggleUnit: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated: string;
}

export const Header: React.FC<HeaderProps> = ({
  unit,
  onToggleUnit,
  onRefresh,
  isLoading,
  lastUpdated
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 group"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
            मौ
          </span>
          <span>
            Mausam <span className="font-normal text-slate-500 text-sm">मौसम</span>
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <a
            href="#current-weather"
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Live Weather
          </a>
          <a
            href="#air-quality"
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Air Quality (NAQI)
          </a>
          <a
            href="#hourly-forecast"
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            Hourly Rain
          </a>
          <a
            href="#seven-day"
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            7-Day Outlook
          </a>
          <a
            href="#regional-matrix"
            className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0"
          >
            All-India Hubs
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            <button
              onClick={onToggleUnit}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                unit === 'celsius'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Show temperature in Celsius"
            >
              °C
            </button>
            <button
              onClick={onToggleUnit}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap ${
                unit === 'fahrenheit'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Show temperature in Fahrenheit"
            >
              °F
            </button>
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap border border-slate-200 disabled:opacity-60"
            title={`Last updated ${lastUpdated}`}
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>
    </header>
  );
};
