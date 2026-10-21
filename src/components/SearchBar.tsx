import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Navigation, Star, X } from 'lucide-react';
import { IndianCity, INDIAN_CITIES } from '../data/indianCities';
import { searchIndianPlaces } from '../services/weatherService';

interface SearchBarProps {
  currentCity: IndianCity;
  onSelectCity: (city: IndianCity) => void;
  favorites: string[];
  onToggleFavorite: (cityId: string) => void;
  onDetectLocation: () => void;
  isDetectingLocation: boolean;
}

const POPULAR_CITIES = [
  'delhi',
  'mumbai',
  'bengaluru',
  'kolkata',
  'chennai',
  'hyderabad',
  'jaipur',
  'srinagar',
  'guwahati'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  currentCity,
  onSelectCity,
  favorites,
  onToggleFavorite,
  onDetectLocation,
  isDetectingLocation
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<IndianCity[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const isFavorited = favorites.includes(currentCity.id);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle typing search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const matches = await searchIndianPlaces(query);
        setResults(matches);
        setIsOpen(true);
      } catch (e) {
        console.error('Search error', e);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (city: IndianCity) => {
    onSelectCity(city);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        {/* Left: Active Location Title & Metadata */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-900 text-white rounded-xl shadow-xs">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {currentCity.name}
              </h1>
              <span className="text-lg font-medium text-slate-500">
                {currentCity.hindiName}
              </span>
              <button
                onClick={() => onToggleFavorite(currentCity.id)}
                className={`p-1.5 rounded-lg border transition-colors ${
                  isFavorited
                    ? 'text-amber-500 border-amber-200 bg-amber-50 hover:bg-amber-100'
                    : 'text-slate-400 border-slate-200 hover:text-amber-500 hover:bg-slate-50'
                }`}
                title={isFavorited ? 'Remove from favorites' : 'Add to favorite cities'}
              >
                <Star className={`w-4 h-4 ${isFavorited ? 'fill-amber-400' : ''}`} />
              </button>
            </div>
            {/* Clean unboxed metadata with subtle typographic separators */}
            <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
              <span>{currentCity.state}</span>
              <span aria-hidden="true">·</span>
              <span>{currentCity.region} India</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{currentCity.elevationMeters}m MSL</span>
              {currentCity.climateZone && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{currentCity.climateZone}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right: Search Input & Geolocation */}
        <div className="relative flex-1 max-w-md" ref={searchContainerRef}>
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query.trim() && setIsOpen(true)}
              placeholder="Search 50+ Indian cities, districts or states..."
              className="w-full pl-10 pr-24 py-2.5 bg-white border border-slate-300 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 shadow-xs"
            />
            {query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-12 text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            ) : null}
            <button
              onClick={onDetectLocation}
              disabled={isDetectingLocation}
              className="absolute right-2 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-colors border border-slate-200 disabled:opacity-60"
              title="Detect current location via GPS"
            >
              <Navigation className={`w-3 h-3 ${isDetectingLocation ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">GPS</span>
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden max-h-80 overflow-y-auto">
              {isSearching ? (
                <div className="p-4 text-xs text-slate-500 text-center">
                  Searching Indian Meteorological network...
                </div>
              ) : results.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {results.map((city) => (
                    <button
                      key={city.id}
                      onClick={() => handleSelect(city)}
                      className="w-full text-left px-4 py-2.5 hover:bg-amber-50/70 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-900">
                          {city.name}{' '}
                          <span className="font-normal text-slate-500">
                            ({city.hindiName})
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {city.state} · {city.region} India
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-400 tabular-nums">
                        {city.elevationMeters}m
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-xs text-slate-500 text-center">
                  No Indian city matching "{query}". Try Delhi, Mumbai, or Jaipur.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Access City Chips / Strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs custom-scrollbar">
        <span className="text-slate-400 font-medium whitespace-nowrap mr-1">
          Popular Hubs:
        </span>
        {POPULAR_CITIES.map((cityId) => {
          const cityObj = INDIAN_CITIES.find((c) => c.id === cityId);
          if (!cityObj) return null;
          const isActive = currentCity.id === cityObj.id;
          return (
            <button
              key={cityObj.id}
              onClick={() => onSelectCity(cityObj)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all font-medium border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cityObj.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
