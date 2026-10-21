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
import { HourlyForecastItem, TemperatureUnit } from '../types/weather';
import { formatTemp } from './CurrentWeatherHero';

interface HourlyForecastProps {
  items: HourlyForecastItem[];
  unit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ items, unit }) => {
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
    <div id="hourly-forecast" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Hourly Rain & Temperature (Next 24 Hours)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Precipitation probabilities, rain volume (mm), and temperature progression in IST
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" /> Rain Chance (%)
          </span>
        </div>
      </div>

      {/* Horizontal Scroller */}
      <div className="mt-4 flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
        {items.map((item, idx) => {
          const hasRain = item.precipitationProbability > 20 || item.precipitation > 0;
          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-between p-3 rounded-xl border min-w-[84px] shrink-0 transition-colors ${
                idx === 0
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-800 hover:bg-slate-100'
              }`}
            >
              {/* Hour Label */}
              <span
                className={`text-xs font-semibold font-mono ${
                  idx === 0 ? 'text-amber-300' : 'text-slate-600'
                }`}
              >
                {item.hourFormatted}
              </span>

              {/* Weather Icon */}
              <div className="my-2.5">{renderWeatherIcon(item.condition.iconName)}</div>

              {/* Temperature */}
              <div
                className={`text-base font-bold font-mono tabular-nums ${
                  idx === 0 ? 'text-white' : 'text-slate-900'
                }`}
              >
                {formatTemp(item.temperature, unit)}
              </div>

              {/* Rain Probability & Amount */}
              <div className="mt-2 w-full flex flex-col items-center">
                {hasRain ? (
                  <div className="flex flex-col items-center">
                    <span className="text-[11px] font-mono font-bold text-blue-600 flex items-center gap-0.5">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      {item.precipitationProbability}%
                    </span>
                    {item.precipitation > 0 && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {item.precipitation}mm
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-[10px] font-mono text-slate-400">0%</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
