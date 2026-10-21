/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { IndianCity, INDIAN_CITIES } from './data/indianCities';
import { CityWeatherData, TemperatureUnit } from './types/weather';
import { fetchCityWeather } from './services/weatherService';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherHero } from './components/CurrentWeatherHero';
import { AirQualityCard } from './components/AirQualityCard';
import { HourlyForecast } from './components/HourlyForecast';
import { SevenDayForecast } from './components/SevenDayForecast';
import { MonsoonAndLifestyle } from './components/MonsoonAndLifestyle';
import { IndiaRegionalMatrix } from './components/IndiaRegionalMatrix';
import { Footer } from './components/Footer';
import { AlertCircle, RotateCw } from 'lucide-react';

const STORAGE_FAVORITES_KEY = 'mausam_favorite_cities';
const STORAGE_LAST_CITY_KEY = 'mausam_last_selected_city';
const STORAGE_UNIT_KEY = 'mausam_temp_unit';

export default function App() {
  // Saved state
  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem(STORAGE_UNIT_KEY) as TemperatureUnit) || 'celsius';
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : ['delhi', 'mumbai', 'bengaluru'];
    } catch {
      return ['delhi', 'mumbai', 'bengaluru'];
    }
  });

  const [currentCity, setCurrentCity] = useState<IndianCity>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LAST_CITY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.id) return parsed;
      }
    } catch (e) {
      console.warn('Could not read saved city', e);
    }
    // Default to New Delhi (National Capital)
    return INDIAN_CITIES[0];
  });

  const [weatherData, setWeatherData] = useState<CityWeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  // Load weather when currentCity changes
  const loadWeather = useCallback(async (city: IndianCity) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCityWeather(city);
      setWeatherData(data);
      localStorage.setItem(STORAGE_LAST_CITY_KEY, JSON.stringify(city));
    } catch (err: any) {
      console.error('Failed to load weather:', err);
      setError('Unable to fetch live meteorological data. Showing latest cached indicators.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(currentCity);
  }, [currentCity, loadWeather]);

  // Unit toggle handler
  const handleToggleUnit = () => {
    const nextUnit: TemperatureUnit = unit === 'celsius' ? 'fahrenheit' : 'celsius';
    setUnit(nextUnit);
    localStorage.setItem(STORAGE_UNIT_KEY, nextUnit);
  };

  // Toggle favorite city
  const handleToggleFavorite = (cityId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId];
      localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(next));
      return next;
    });
  };

  // Select new city
  const handleSelectCity = (city: IndianCity) => {
    setCurrentCity(city);
  };

  // Manual refresh
  const handleRefresh = () => {
    loadWeather(currentCity);
  };

  // Geolocation detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Find closest city from our curated Indian cities list
        let closest = INDIAN_CITIES[0];
        let minDistance = Number.MAX_VALUE;

        for (const city of INDIAN_CITIES) {
          const dLat = city.lat - latitude;
          const dLon = city.lon - longitude;
          const dist = dLat * dLat + dLon * dLon;
          if (dist < minDistance) {
            minDistance = dist;
            closest = city;
          }
        }

        // If reasonably close to India (within ~15 degrees lat/lon)
        if (minDistance < 225) {
          setCurrentCity(closest);
        } else {
          // If user coordinates outside or custom, create customized pin
          const detectedCity: IndianCity = {
            id: `gps-${latitude.toFixed(2)}-${longitude.toFixed(2)}`,
            name: closest.name,
            hindiName: closest.hindiName,
            state: closest.state,
            region: closest.region,
            lat: latitude,
            lon: longitude,
            elevationMeters: 200,
            climateZone: closest.climateZone,
            famousFor: 'Current GPS Location'
          };
          setCurrentCity(detectedCity);
        }
        setIsDetectingLocation(false);
      },
      (geoErr) => {
        console.warn('Geolocation failed or denied:', geoErr);
        setIsDetectingLocation(false);
        alert('Could not detect location. Please search for your Indian city above.');
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Top Bar Navigation */}
      <Header
        unit={unit}
        onToggleUnit={handleToggleUnit}
        onRefresh={handleRefresh}
        isLoading={isLoading}
        lastUpdated={weatherData?.fetchedAt || 'Just now'}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Search Bar & City Selector */}
        <SearchBar
          currentCity={currentCity}
          onSelectCity={handleSelectCity}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onDetectLocation={handleDetectLocation}
          isDetectingLocation={isDetectingLocation}
        />

        {/* Error Notification (if any) */}
        {error && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={handleRefresh}
              className="font-semibold underline hover:text-amber-950 shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State or Weather Dashboard */}
        {isLoading && !weatherData ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-96 bg-slate-200 rounded-2xl w-full" />
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
            <div className="h-48 bg-slate-200 rounded-2xl w-full" />
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            {/* 1. Hero: Current Weather, IMD Alert, High/Low, Sun times, 4 key metrics */}
            <CurrentWeatherHero data={weatherData} unit={unit} />

            {/* 2. CPCB India National Air Quality Index (NAQI) */}
            <AirQualityCard
              data={weatherData.airQuality}
              cityName={weatherData.city.name}
            />

            {/* 3. Hourly Rain & Temperature (Next 24 Hours) */}
            <HourlyForecast items={weatherData.hourly} unit={unit} />

            {/* 4. Monsoon Watch & 4 Practical Daily Life Indices */}
            <MonsoonAndLifestyle
              monsoonStatus={weatherData.monsoonStatus}
              lifestyleIndices={weatherData.lifestyleIndices}
              cloudCover={weatherData.current.cloudCover}
              humidity={weatherData.current.humidity}
              cityName={weatherData.city.name}
            />

            {/* 5. 7-Day Weather Forecast */}
            <SevenDayForecast items={weatherData.daily} unit={unit} />

            {/* 6. All-India Regional Meteorological Network Matrix */}
            <IndiaRegionalMatrix
              currentCityId={currentCity.id}
              onSelectCity={handleSelectCity}
            />
          </div>
        ) : null}
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
