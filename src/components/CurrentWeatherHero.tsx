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
  Wind,
  Droplets,
  Gauge,
  Sunrise,
  Sunset,
  ShieldAlert,
  Info
} from 'lucide-react';
import { CityWeatherData, TemperatureUnit } from '../types/weather';
import monsoonSkyImg from '../assets/images/india_monsoon_sky_1792570803355.jpg';
import himalayanVistaImg from '../assets/images/himalayan_weather_vista_1792570803330.jpg';

interface CurrentWeatherHeroProps {
  data: CityWeatherData;
  unit: TemperatureUnit;
}

export function formatTemp(tempC: number, unit: TemperatureUnit): string {
  if (unit === 'fahrenheit') {
    return `${Math.round((tempC * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(tempC)}°C`;
}

export function getWindDirectionCardinal(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((deg % 360) / 22.5);
  return directions[index % 16];
}

export const CurrentWeatherHero: React.FC<CurrentWeatherHeroProps> = ({ data, unit }) => {
  const { city, current, daily, imdAlert } = data;
  const today = daily[0];

  const isHills = city.climateZone === 'Himalayan / Alpine';
  const heroImage = isHills ? himalayanVistaImg : monsoonSkyImg;

  // Icon mapping
  const renderWeatherIcon = (iconName: string, className = 'w-10 h-10') => {
    switch (iconName) {
      case 'Sun':
        return <Sun className={`${className} text-amber-400`} />;
      case 'SunMedium':
        return <SunMedium className={`${className} text-amber-300`} />;
      case 'CloudSun':
        return <CloudSun className={`${className} text-amber-300`} />;
      case 'Cloud':
        return <Cloud className={`${className} text-slate-300`} />;
      case 'CloudDrizzle':
        return <CloudDrizzle className={`${className} text-cyan-300`} />;
      case 'CloudRain':
        return <CloudRain className={`${className} text-blue-400`} />;
      case 'CloudLightning':
        return <CloudLightning className={`${className} text-indigo-400`} />;
      case 'CloudSnow':
        return <CloudSnow className={`${className} text-sky-200`} />;
      case 'CloudFog':
        return <CloudFog className={`${className} text-slate-300`} />;
      case 'Zap':
        return <Zap className={`${className} text-yellow-400`} />;
      default:
        return <Sun className={`${className} text-amber-400`} />;
    }
  };

  // IMD Alert color mapping
  const getAlertColors = (severity: string) => {
    switch (severity) {
      case 'red':
        return 'bg-red-500/20 border-red-500/40 text-red-200';
      case 'orange':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-200';
      case 'yellow':
        return 'bg-yellow-500/15 border-yellow-500/30 text-yellow-200';
      default:
        return 'bg-emerald-500/15 border-emerald-500/30 text-emerald-200';
    }
  };

  return (
    <div id="current-weather" className="relative rounded-2xl overflow-hidden shadow-md border border-slate-800/40 bg-slate-900 text-white">
      {/* Visual Asset Backdrop with Fail-Safe Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt={`${city.name} atmospheric scenery`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter blur-[0.5px]"
        />
        {/* Measured Contrast Scrim (ensuring WCAG AA 4.5:1 legibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between min-h-[420px]">
        {/* Top IMD Advisory Ribbon */}
        <div className="mb-6">
          <div
            className={`flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md transition-all ${getAlertColors(
              imdAlert.severity
            )}`}
          >
            <div className="p-1 rounded-md shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-mono font-semibold">
                  IMD Bulletin · {imdAlert.severity.toUpperCase()} ALERT
                </span>
                <span aria-hidden="true" className="text-white/40">
                  ·
                </span>
                <span className="text-xs text-white/70 font-mono">
                  {imdAlert.issuedAt}
                </span>
              </div>
              <h2 className="text-sm md:text-base font-semibold text-white mt-0.5">
                {imdAlert.headline}
              </h2>
              <p className="text-xs text-white/80 mt-1 line-clamp-2 md:line-clamp-none">
                {imdAlert.details}
              </p>
            </div>
          </div>
        </div>

        {/* Middle: Primary Weather Reading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-2">
          {/* Temperature & Condition (Left 7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-end">
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium mb-1">
              <span>{city.famousFor || city.state}</span>
              <span aria-hidden="true">·</span>
              <span>Observed Live</span>
            </div>

            <div className="flex items-baseline gap-4 flex-wrap">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold font-mono tabular-nums tracking-tight text-white drop-shadow-sm">
                {formatTemp(current.temperature, unit)}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xl font-semibold text-white">
                  {renderWeatherIcon(current.condition.iconName, 'w-6 h-6')}
                  <span>{current.condition.label}</span>
                </div>
                <div className="text-sm font-medium text-amber-300">
                  {current.condition.hindiLabel}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-mono">
                  Feels like {formatTemp(current.apparentTemperature, unit)}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 max-w-xl mt-3 text-balance leading-relaxed">
              {current.condition.description}
            </p>
          </div>

          {/* Day Extremes & Solar Cycle (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-md rounded-xl p-4 border border-white/10 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono text-slate-400">TODAY'S RANGE</span>
              <div className="flex items-center gap-3 font-mono text-sm">
                <span className="text-emerald-400">
                  L: {formatTemp(today?.tempMin ?? current.temperature - 5, unit)}
                </span>
                <span className="text-white/30">|</span>
                <span className="text-rose-400">
                  H: {formatTemp(today?.tempMax ?? current.temperature + 4, unit)}
                </span>
              </div>
            </div>

            {/* Sun times in IST */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-300">
                  <Sunrise className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-mono">SUNRISE (IST)</div>
                  <div className="text-sm font-semibold text-white font-mono tabular-nums">
                    {today?.sunrise || '06:15 AM'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                  <Sunset className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-slate-400 font-mono">SUNSET (IST)</div>
                  <div className="text-sm font-semibold text-white font-mono tabular-nums">
                    {today?.sunset || '06:10 PM'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4-Column Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10">
          {/* Humidity */}
          <div className="bg-slate-900/50 backdrop-blur-sm p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>HUMIDITY</span>
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-white">
              {current.humidity}
              <span className="text-xs font-normal text-slate-400 ml-1">%</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {current.humidity > 70 ? 'High / Tropical' : current.humidity < 30 ? 'Dry Continental' : 'Comfortable'}
            </div>
          </div>

          {/* Wind */}
          <div className="bg-slate-900/50 backdrop-blur-sm p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>WIND SPEED</span>
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-white">
              {current.windSpeed}
              <span className="text-xs font-normal text-slate-400 ml-1">km/h</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {getWindDirectionCardinal(current.windDirection)} ({current.windDirection}°)
            </div>
          </div>

          {/* Atmospheric Pressure */}
          <div className="bg-slate-900/50 backdrop-blur-sm p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>PRESSURE</span>
              <Gauge className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-white">
              {current.pressure}
              <span className="text-xs font-normal text-slate-400 ml-1">hPa</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {current.pressure < 1005 ? 'Low (Depression)' : 'Steady Barometer'}
            </div>
          </div>

          {/* UV Index */}
          <div className="bg-slate-900/50 backdrop-blur-sm p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>MAX UV INDEX</span>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono tabular-nums text-white">
              {today?.uvIndexMax ?? 6.5}
              <span className="text-xs font-normal text-slate-400 ml-1">/ 12</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {(today?.uvIndexMax ?? 6.5) >= 8 ? 'Very High (Sunscreen)' : 'Moderate Exposure'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
