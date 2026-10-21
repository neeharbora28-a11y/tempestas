import React from 'react';
import {
  Sun,
  SunMedium,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Zap,
  Droplets
} from 'lucide-react';
import { DailyForecastItem, TemperatureUnit } from '../types/weather';
import { formatTemp } from './CurrentWeatherHero';

interface SevenDayForecastProps {
  items: DailyForecastItem[];
  unit: TemperatureUnit;
}

export const SevenDayForecast: React.FC<SevenDayForecastProps> = ({ items, unit }) => {
  // Find global min and max among the 7 days to calibrate horizontal bars
  const minTempAll = Math.min(...items.map((i) => i.tempMin));
  const maxTempAll = Math.max(...items.map((i) => i.tempMax));
  const rangeSpan = Math.max(1, maxTempAll - minTempAll);

  const renderWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-5 h-5 text-amber-500" />;
      case 'SunMedium':
        return <SunMedium className="w-5 h-5 text-amber-500" />;
      case 'CloudSun':
        return <CloudSun className="w-5 h-5 text-amber-500" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-slate-400" />;
      case 'CloudDrizzle':
        return <CloudDrizzle className="w-5 h-5 text-cyan-500" />;
      case 'CloudRain':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'CloudLightning':
        return <CloudLightning className="w-5 h-5 text-indigo-500" />;
      case 'CloudSnow':
        return <CloudSnow className="w-5 h-5 text-sky-400" />;
      case 'CloudFog':
        return <CloudFog className="w-5 h-5 text-slate-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      default:
        return <Sun className="w-5 h-5 text-amber-500" />;
    }
  };

  return (
    <div id="seven-day" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="pb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">
          7-Day Weather Outlook
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Weekly temperature ranges, rain probability, and anticipated meteorological shifts
        </p>
      </div>

      <div className="divide-y divide-slate-100 mt-2">
        {items.map((item, idx) => {
          // Relative position on bar
          const leftPercent = ((item.tempMin - minTempAll) / rangeSpan) * 100;
          const widthPercent = Math.max(8, ((item.tempMax - item.tempMin) / rangeSpan) * 100);

          return (
            <div
              key={item.date}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm hover:bg-slate-50/60 rounded-xl px-2 transition-colors"
            >
              {/* Day & Date */}
              <div className="w-32 flex flex-col">
                <span className="font-semibold text-slate-900">
                  {idx === 0 ? 'Today' : item.dayOfWeek}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {item.dateFormatted}
                </span>
              </div>

              {/* Weather Condition Icon & Label */}
              <div className="flex items-center gap-3 w-48 shrink-0">
                <div className="shrink-0">{renderWeatherIcon(item.condition.iconName)}</div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-slate-800">
                    {item.condition.label}
                  </span>
                  <span className="text-[11px] text-amber-700">
                    {item.condition.hindiLabel}
                  </span>
                </div>
              </div>

              {/* Rain Probability / Sum */}
              <div className="w-24 shrink-0 flex items-center gap-1.5 text-xs font-mono">
                {item.precipitationProbabilityMax > 20 || item.precipitationSum > 0 ? (
                  <span className="text-blue-600 font-semibold flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    {item.precipitationProbabilityMax}%
                  </span>
                ) : (
                  <span className="text-slate-400">0%</span>
                )}
                {item.precipitationSum > 0 && (
                  <span className="text-[11px] text-slate-500">
                    ({item.precipitationSum}mm)
                  </span>
                )}
              </div>

              {/* Min Temp, Temperature Bar, Max Temp */}
              <div className="flex-1 flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono text-slate-600 tabular-nums w-10 text-right">
                  {formatTemp(item.tempMin, unit)}
                </span>

                {/* Horizontal Min/Max Bar */}
                <div className="relative flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-400"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`
                    }}
                  />
                </div>

                <span className="text-xs font-mono font-bold text-slate-900 tabular-nums w-10">
                  {formatTemp(item.tempMax, unit)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
