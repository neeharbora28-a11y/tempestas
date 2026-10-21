import { IndianCity } from '../data/indianCities';

export type TemperatureUnit = 'celsius' | 'fahrenheit';

export interface WeatherCondition {
  code: number;
  label: string;
  hindiLabel: string;
  iconName: string;
  description: string;
}

export interface CurrentWeather {
  temperature: number; // in °C
  apparentTemperature: number; // Feels like
  humidity: number; // %
  pressure: number; // hPa
  surfacePressure: number;
  windSpeed: number; // km/h
  windDirection: number; // degrees
  windGusts: number; // km/h
  weatherCode: number;
  condition: WeatherCondition;
  isDay: boolean;
  precipitation: number; // mm
  cloudCover: number; // %
  timestamp: string;
}

export interface HourlyForecastItem {
  time: string; // ISO string
  hourFormatted: string; // "2 PM" or "14:00"
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number; // %
  precipitation: number; // mm
  weatherCode: number;
  condition: WeatherCondition;
  windSpeed: number;
}

export interface DailyForecastItem {
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Mon, Tue, etc.
  dateFormatted: string; // 21 Oct
  weatherCode: number;
  condition: WeatherCondition;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  precipitationSum: number; // mm
  precipitationProbabilityMax: number; // %
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
}

export type NaqiCategory = 'Good' | 'Satisfactory' | 'Moderate' | 'Poor' | 'Very Poor' | 'Severe';

export interface AirQualityData {
  aqi: number; // Indian NAQI score
  category: NaqiCategory;
  hindiCategory: string;
  colorClass: string;
  bgLightClass: string;
  borderClass: string;
  pm25: number; // µg/m³
  pm10: number; // µg/m³
  co: number; // µg/m³
  no2: number; // µg/m³
  so2: number; // µg/m³
  o3: number; // µg/m³
  prominentPollutant: string;
  healthAdvice: string;
  outdoorAdvisory: string;
  maskRecommended: boolean;
  airPurifierRecommended: boolean;
}

export type ImdAlertSeverity = 'green' | 'yellow' | 'orange' | 'red';

export interface ImdAlert {
  severity: ImdAlertSeverity;
  headline: string;
  hindiHeadline: string;
  details: string;
  issuedAt: string;
  source: string;
}

export interface LifestyleIndex {
  id: string;
  title: string;
  hindiTitle: string;
  scoreText: string;
  status: 'Optimal' | 'Fair' | 'Caution' | 'Adverse';
  statusColor: string;
  description: string;
  iconName: string;
}

export interface CityWeatherData {
  city: IndianCity;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality: AirQualityData;
  imdAlert: ImdAlert;
  lifestyleIndices: LifestyleIndex[];
  monsoonStatus: {
    phase: string;
    description: string;
    rainfallStatus: string;
  };
  fetchedAt: string;
}
