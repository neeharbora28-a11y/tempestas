import React from 'react';
import {
  Footprints,
  Shirt,
  Wind,
  Umbrella,
  CloudRain,
  Compass,
  Calendar
} from 'lucide-react';
import { LifestyleIndex, CityWeatherData } from '../types/weather';

interface MonsoonAndLifestyleProps {
  monsoonStatus: CityWeatherData['monsoonStatus'];
  lifestyleIndices: LifestyleIndex[];
  cloudCover: number;
  humidity: number;
  cityName: string;
}

export const MonsoonAndLifestyle: React.FC<MonsoonAndLifestyleProps> = ({
  monsoonStatus,
  lifestyleIndices,
  cloudCover,
  humidity,
  cityName
}) => {
  const renderIndexIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className="w-5 h-5" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5" />;
      case 'Wind':
        return <Wind className="w-5 h-5" />;
      case 'Umbrella':
        return <Umbrella className="w-5 h-5" />;
      default:
        return <Wind className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left 4 Cols: India Monsoon Watch & Seasonal Tracker */}
      <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-xl">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Monsoon & Seasonal Watch
                </h3>
                <span className="text-xs text-slate-500 font-mono">
                  All-India Seasonal Tracker
                </span>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
              IMD Season
            </span>
          </div>

          <div className="mt-4">
            <div className="text-sm font-bold text-slate-900">
              {monsoonStatus.phase}
            </div>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {monsoonStatus.description}
            </p>
          </div>

          {/* Regional Indicator Pill Strip */}
          <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Cloud Cover</span>
              <span className="font-mono font-bold text-slate-800 tabular-nums">
                {cloudCover}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all"
                style={{ width: `${cloudCover}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-slate-500">Atmospheric Moisture</span>
              <span className="font-mono font-bold text-slate-800 tabular-nums">
                {humidity}% Humidity
              </span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-500 h-full rounded-full transition-all"
                style={{ width: `${humidity}%` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-100 text-xs text-slate-500 flex items-center gap-2">
          <Compass className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Status in {cityName}: {monsoonStatus.rainfallStatus}</span>
        </div>
      </div>

      {/* Right 7 Cols: 4 Practical Daily Life Indices */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Daily Living & Practical Advice
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Actionable guidance for daily commutes, fitness, drying clothes, and home comfort
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
          {lifestyleIndices.map((idx) => (
            <div
              key={idx.id}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col justify-between gap-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-white rounded-lg border border-slate-200 text-slate-700 shadow-2xs">
                    {renderIndexIcon(idx.iconName)}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {idx.title}
                    </div>
                    <div className="text-[11px] text-amber-700 font-medium">
                      {idx.hindiTitle}
                    </div>
                  </div>
                </div>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${idx.statusColor}`}
                >
                  {idx.scoreText}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                {idx.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
