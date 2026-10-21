import React from 'react';
import { Wind, ShieldCheck, AlertTriangle, ShieldAlert, Heart, Activity } from 'lucide-react';
import { AirQualityData } from '../types/weather';

interface AirQualityCardProps {
  data: AirQualityData;
  cityName: string;
}

const CPCB_BANDS = [
  { label: 'Good (0-50)', min: 0, max: 50, color: 'bg-emerald-500' },
  { label: 'Satisfactory (51-100)', min: 51, max: 100, color: 'bg-green-500' },
  { label: 'Moderate (101-200)', min: 101, max: 200, color: 'bg-amber-500' },
  { label: 'Poor (201-300)', min: 201, max: 300, color: 'bg-orange-500' },
  { label: 'Very Poor (301-400)', min: 301, max: 400, color: 'bg-rose-500' },
  { label: 'Severe (401-500)', min: 401, max: 500, color: 'bg-red-800' }
];

export const AirQualityCard: React.FC<AirQualityCardProps> = ({ data, cityName }) => {
  // Calculate marker percentage on 0-500 scale
  const progressPercent = Math.min(100, Math.max(0, (data.aqi / 500) * 100));

  return (
    <div id="air-quality" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      {/* Title & Metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              CPCB Air Quality Index (NAQI)
            </h2>
            <span className="text-xs text-slate-500 font-mono">
              Central Pollution Control Board
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time particulate and chemical air pollution readings for {cityName}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-mono">Prominent Pollutant:</span>
          <span className="text-xs font-bold text-slate-800 font-mono px-2 py-0.5 bg-slate-100 rounded">
            {data.prominentPollutant}
          </span>
        </div>
      </div>

      {/* Main AQI Gauge & Category Block */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
        {/* Left Column: Big AQI Number & Category */}
        <div className="md:col-span-5 flex items-center gap-5">
          <div
            className={`flex flex-col items-center justify-center w-28 h-28 rounded-2xl border ${data.borderClass} ${data.bgLightClass} shrink-0`}
          >
            <span className="text-xs font-mono font-medium text-slate-600">INDIA NAQI</span>
            <span className={`text-4xl font-extrabold font-mono tabular-nums ${data.colorClass}`}>
              {data.aqi}
            </span>
            <span className="text-[10px] font-mono text-slate-500">Scale: 0-500</span>
          </div>

          <div>
            <div className={`text-xl font-bold ${data.colorClass}`}>
              {data.category}
            </div>
            <div className="text-sm font-medium text-slate-600">
              {data.hindiCategory}
            </div>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              {data.healthAdvice}
            </p>
          </div>
        </div>

        {/* Right Column: Visual CPCB Rainbow Scale */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1.5">
            <span>0 Good</span>
            <span>100 Sat</span>
            <span>200 Mod</span>
            <span>300 Poor</span>
            <span>400 V.Poor</span>
            <span>500 Severe</span>
          </div>

          {/* Rainbow Track with Indicator */}
          <div className="relative w-full h-3.5 rounded-full overflow-hidden flex bg-slate-100">
            <div className="w-[10%] bg-emerald-500" title="Good (0-50)" />
            <div className="w-[10%] bg-green-500" title="Satisfactory (51-100)" />
            <div className="w-[20%] bg-amber-500" title="Moderate (101-200)" />
            <div className="w-[20%] bg-orange-500" title="Poor (201-300)" />
            <div className="w-[20%] bg-rose-500" title="Very Poor (301-400)" />
            <div className="w-[20%] bg-red-900" title="Severe (401-500)" />
          </div>

          {/* Needle Pointer */}
          <div className="relative w-full h-4">
            <div
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${progressPercent}%` }}
            >
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-slate-900" />
              <span className="text-[10px] font-mono font-bold text-slate-900 tabular-nums">
                {data.aqi}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pollutant Breakdown Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-4 border-t border-slate-100">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">PM2.5</div>
          <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {data.pm25}
          </div>
          <div className="text-[10px] text-slate-500">µg/m³ (Fine)</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">PM10</div>
          <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {data.pm10}
          </div>
          <div className="text-[10px] text-slate-500">µg/m³ (Coarse)</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">NO₂</div>
          <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {data.no2}
          </div>
          <div className="text-[10px] text-slate-500">µg/m³ (Traffic)</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">SO₂</div>
          <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {data.so2}
          </div>
          <div className="text-[10px] text-slate-500">µg/m³ (Industrial)</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">O₃</div>
          <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {data.o3}
          </div>
          <div className="text-[10px] text-slate-500">µg/m³ (Ozone)</div>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="text-[11px] font-mono text-slate-400">CO</div>
          <div className="text-lg font-bold font-mono tabular-nums text-slate-900">
            {data.co}
          </div>
          <div className="text-[10px] text-slate-500">µg/m³</div>
        </div>
      </div>

      {/* Practical Health Guidance strip */}
      <div className="mt-4 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-700">
          <Activity className="w-4 h-4 text-slate-500 shrink-0" />
          <span>{data.outdoorAdvisory}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-medium">
          {data.maskRecommended ? (
            <span className="text-rose-700 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> N95 Mask Advised
            </span>
          ) : (
            <span className="text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> No Mask Required
            </span>
          )}
          {data.airPurifierRecommended && (
            <span className="text-amber-700 hidden sm:inline">
              · Indoor HEPA Purifier Recommended
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
