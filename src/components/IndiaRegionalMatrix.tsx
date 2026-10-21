import React, { useState } from 'react';
import { IndianCity, INDIAN_CITIES, REGIONS } from '../data/indianCities';
import { MapPin, ArrowRight } from 'lucide-react';

interface IndiaRegionalMatrixProps {
  currentCityId: string;
  onSelectCity: (city: IndianCity) => void;
}

export const IndiaRegionalMatrix: React.FC<IndiaRegionalMatrixProps> = ({
  currentCityId,
  onSelectCity
}) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const filteredCities =
    selectedRegion === 'All'
      ? INDIAN_CITIES
      : INDIAN_CITIES.filter((c) => c.region === selectedRegion);

  return (
    <div id="regional-matrix" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            All-India Regional Meteorological Network
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select any meteorological observatory or district across India's climate zones
          </p>
        </div>

        {/* Region Filter Segmented Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-100 rounded-xl max-w-full custom-scrollbar">
          <button
            onClick={() => setSelectedRegion('All')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
              selectedRegion === 'All'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All India ({INDIAN_CITIES.length})
          </button>
          {REGIONS.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                selectedRegion === region
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-5">
        {filteredCities.map((city) => {
          const isSelected = city.id === currentCityId;
          return (
            <button
              key={city.id}
              onClick={() => onSelectCity(city)}
              className={`text-left p-3 rounded-xl border transition-all flex flex-col justify-between group ${
                isSelected
                  ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/30'
                  : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {city.region}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                      ACTIVE
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-slate-900 mt-1 group-hover:text-amber-800 transition-colors">
                  {city.name}
                </div>
                <div className="text-xs text-slate-500">
                  {city.hindiName}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[85px]">{city.state}</span>
                <span className="font-mono tabular-nums">{city.elevationMeters}m</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
