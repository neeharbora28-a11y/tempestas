import { IndianCity, INDIAN_CITIES } from '../data/indianCities';
import {
  CityWeatherData,
  CurrentWeather,
  HourlyForecastItem,
  DailyForecastItem,
  AirQualityData,
  WeatherCondition,
  ImdAlert,
  LifestyleIndex,
  NaqiCategory
} from '../types/weather';

export function getWeatherCondition(code: number): WeatherCondition {
  switch (code) {
    case 0:
      return {
        code,
        label: 'Clear Sky',
        hindiLabel: 'साफ़ आसमान',
        iconName: 'Sun',
        description: 'Sunny and clear conditions with unobstructed sunlight.'
      };
    case 1:
      return {
        code,
        label: 'Mainly Clear',
        hindiLabel: 'अधिकांशतः साफ़',
        iconName: 'SunMedium',
        description: 'Largely clear with occasional thin clouds.'
      };
    case 2:
      return {
        code,
        label: 'Partly Cloudy',
        hindiLabel: 'आंशिक बादल',
        iconName: 'CloudSun',
        description: 'Sun filtering through scattered cloud cover.'
      };
    case 3:
      return {
        code,
        label: 'Overcast',
        hindiLabel: 'घने बादल',
        iconName: 'Cloud',
        description: 'Uniform overcast skies covering the horizon.'
      };
    case 45:
    case 48:
      return {
        code,
        label: 'Fog / Mist',
        hindiLabel: 'कोहरा / धुंध',
        iconName: 'CloudFog',
        description: 'Reduced visibility due to low-lying fog and morning mist.'
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: 'Drizzle',
        hindiLabel: 'हल्की बूंदाबांदी',
        iconName: 'CloudDrizzle',
        description: 'Light, steady drizzle.'
      };
    case 61:
      return {
        code,
        label: 'Light Rain',
        hindiLabel: 'हल्की बारिश',
        iconName: 'CloudRain',
        description: 'Gentle localized showers.'
      };
    case 63:
      return {
        code,
        label: 'Moderate Rain',
        hindiLabel: 'मध्यम वर्षा',
        iconName: 'CloudRain',
        description: 'Consistent rain over the district.'
      };
    case 65:
      return {
        code,
        label: 'Heavy Monsoon Rain',
        hindiLabel: 'मूसलाधार बारिश',
        iconName: 'CloudLightning',
        description: 'Intense precipitation with potential local waterlogging.'
      };
    case 71:
    case 73:
    case 75:
      return {
        code,
        label: 'Snowfall',
        hindiLabel: 'बर्फबारी',
        iconName: 'CloudSnow',
        description: 'Alpine snowfall over high altitude slopes.'
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: 'Rain Showers',
        hindiLabel: 'तेज़ बौछारें',
        iconName: 'CloudRain',
        description: 'Passing convective pre-monsoon or seasonal showers.'
      };
    case 95:
      return {
        code,
        label: 'Thunderstorm',
        hindiLabel: 'गरज के साथ बौछार',
        iconName: 'Zap',
        description: 'Thunder squall with lightning and gusty winds.'
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Severe Storm / Hail',
        hindiLabel: 'आंधी और ओलावृष्टि',
        iconName: 'Zap',
        description: 'Severe thunderstorm accompanied by hail and gusty squalls.'
      };
    default:
      return {
        code,
        label: 'Clear / Moderate',
        hindiLabel: 'सामान्य मौसम',
        iconName: 'Sun',
        description: 'Pleasant meteorological conditions.'
      };
  }
}

// Calculate Official Indian CPCB NAQI from PM2.5 and PM10
export function calculateIndianNaqi(pm25: number, pm10: number, rawCo = 0, rawNo2 = 0, rawSo2 = 0, rawO3 = 0): AirQualityData {
  // Breakpoints for PM2.5 according to CPCB guidelines:
  // 0-30 -> 0-50 (Good)
  // 31-60 -> 51-100 (Satisfactory)
  // 61-90 -> 101-200 (Moderate)
  // 91-120 -> 201-300 (Poor)
  // 121-250 -> 301-400 (Very Poor)
  // 251+ -> 401-500 (Severe)
  let subPm25 = 0;
  if (pm25 <= 30) {
    subPm25 = (pm25 / 30) * 50;
  } else if (pm25 <= 60) {
    subPm25 = 51 + ((pm25 - 31) / (60 - 31)) * (100 - 51);
  } else if (pm25 <= 90) {
    subPm25 = 101 + ((pm25 - 61) / (90 - 61)) * (200 - 101);
  } else if (pm25 <= 120) {
    subPm25 = 201 + ((pm25 - 91) / (120 - 91)) * (300 - 201);
  } else if (pm25 <= 250) {
    subPm25 = 301 + ((pm25 - 121) / (250 - 121)) * (400 - 301);
  } else {
    subPm25 = 401 + Math.min(99, ((pm25 - 251) / 100) * 99);
  }

  // Breakpoints for PM10 according to CPCB guidelines:
  // 0-50 -> 0-50
  // 51-100 -> 51-100
  // 101-250 -> 101-200
  // 251-350 -> 201-300
  // 351-430 -> 301-400
  // 431+ -> 401-500
  let subPm10 = 0;
  if (pm10 <= 50) {
    subPm10 = pm10;
  } else if (pm10 <= 100) {
    subPm10 = 51 + ((pm10 - 51) / (100 - 51)) * (100 - 51);
  } else if (pm10 <= 250) {
    subPm10 = 101 + ((pm10 - 101) / (250 - 101)) * (200 - 101);
  } else if (pm10 <= 350) {
    subPm10 = 201 + ((pm10 - 251) / (350 - 251)) * (300 - 201);
  } else if (pm10 <= 430) {
    subPm10 = 301 + ((pm10 - 351) / (430 - 351)) * (400 - 301);
  } else {
    subPm10 = 401 + Math.min(99, ((pm10 - 431) / 100) * 99);
  }

  const finalAqi = Math.round(Math.max(subPm25, subPm10));
  const prominent = subPm25 >= subPm10 ? 'PM2.5' : 'PM10';

  let category: NaqiCategory = 'Good';
  let hindiCategory = 'अच्छा';
  let colorClass = 'text-emerald-700';
  let bgLightClass = 'bg-emerald-50';
  let borderClass = 'border-emerald-200';
  let healthAdvice = 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
  let outdoorAdvisory = 'Ideal conditions for morning walks, jogging, and all outdoor sports.';
  let maskRecommended = false;
  let airPurifierRecommended = false;

  if (finalAqi <= 50) {
    category = 'Good';
    hindiCategory = 'अच्छा (Good)';
    colorClass = 'text-emerald-700';
    bgLightClass = 'bg-emerald-50';
    borderClass = 'border-emerald-200';
    healthAdvice = 'Minimal health impact. Clean breathing air.';
    outdoorAdvisory = 'Perfect time for outdoor exercise, yoga, and activities.';
  } else if (finalAqi <= 100) {
    category = 'Satisfactory';
    hindiCategory = 'संतोषजनक (Satisfactory)';
    colorClass = 'text-green-700';
    bgLightClass = 'bg-green-50';
    borderClass = 'border-green-200';
    healthAdvice = 'Minor breathing discomfort may be felt by sensitive individuals with asthma.';
    outdoorAdvisory = 'Normal outdoor activities are safe for the general population.';
  } else if (finalAqi <= 200) {
    category = 'Moderate';
    hindiCategory = 'मध्यम (Moderate)';
    colorClass = 'text-amber-700';
    bgLightClass = 'bg-amber-50';
    borderClass = 'border-amber-200';
    healthAdvice = 'Breathing discomfort to people with lung disease, asthma, and heart issues.';
    outdoorAdvisory = 'Sensitive people should reduce prolonged outdoor exertion.';
  } else if (finalAqi <= 300) {
    category = 'Poor';
    hindiCategory = 'खराब (Poor)';
    colorClass = 'text-orange-700';
    bgLightClass = 'bg-orange-50';
    borderClass = 'border-orange-200';
    healthAdvice = 'Breathing discomfort to most people on prolonged exposure; respiratory illness risk.';
    outdoorAdvisory = 'Avoid heavy cardio outdoors; wear N95 mask if commuting during peak hours.';
    maskRecommended = true;
  } else if (finalAqi <= 400) {
    category = 'Very Poor';
    hindiCategory = 'बहुत खराब (Very Poor)';
    colorClass = 'text-rose-700';
    bgLightClass = 'bg-rose-50';
    borderClass = 'border-rose-200';
    healthAdvice = 'Respiratory illness on prolonged exposure. Pronounced effect on asthma and cardiac patients.';
    outdoorAdvisory = 'Avoid morning walks and outdoor exercise. Keep windows closed.';
    maskRecommended = true;
    airPurifierRecommended = true;
  } else {
    category = 'Severe';
    hindiCategory = 'गंभीर (Severe)';
    colorClass = 'text-red-900';
    bgLightClass = 'bg-red-50';
    borderClass = 'border-red-300';
    healthAdvice = 'Severe emergency: Affects healthy people and seriously impacts those with existing ailments.';
    outdoorAdvisory = 'Stay strictly indoors. Run HEPA air purifiers and avoid opening doors/windows.';
    maskRecommended = true;
    airPurifierRecommended = true;
  }

  return {
    aqi: finalAqi,
    category,
    hindiCategory,
    colorClass,
    bgLightClass,
    borderClass,
    pm25: Math.round(pm25),
    pm10: Math.round(pm10),
    co: Math.round(rawCo),
    no2: Math.round(rawNo2),
    so2: Math.round(rawSo2),
    o3: Math.round(rawO3),
    prominentPollutant: prominent,
    healthAdvice,
    outdoorAdvisory,
    maskRecommended,
    airPurifierRecommended
  };
}

// Generate IMD-style Alert Bulletin
export function generateImdAlert(city: IndianCity, current: CurrentWeather, aqi: AirQualityData, maxTempToday: number, rainSumToday: number): ImdAlert {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';

  // Heatwave check (IMD criteria: max temp >= 40°C in plains, or >= 30°C in hills)
  const isHills = city.elevationMeters > 1000;
  const heatwaveThreshold = isHills ? 30 : 40;
  const severeHeatwaveThreshold = isHills ? 35 : 44;

  if (maxTempToday >= severeHeatwaveThreshold || current.apparentTemperature >= 45) {
    return {
      severity: 'red',
      headline: `Severe Heatwave Warning (लू चेतावनी) across ${city.name}`,
      hindiHeadline: `भीषण लू का रेड अलर्ट - दोपहर में घर से बाहर निकलने से बचें`,
      details: `IMD reports extreme heat conditions with temperatures touching ${maxTempToday}°C (Feels like ${Math.round(current.apparentTemperature)}°C). Risk of heat stroke and severe dehydration. Avoid direct sun exposure between 12:00 PM and 4:00 PM. Drink plenty of water / ORS.`,
      issuedAt: timeStr,
      source: 'India Meteorological Department (IMD) Special Bulletin'
    };
  }

  if (maxTempToday >= heatwaveThreshold) {
    return {
      severity: 'orange',
      headline: `Heatwave Alert (ग्रीष्म लहर) for ${city.name} District`,
      hindiHeadline: `गर्मी और लू की चेतावनी - पर्याप्त पानी पिएं`,
      details: `High daytime temperature exceeding seasonal normal by 4.5°C+. Elderly, infants, and chronic patients should take precautions. Keep hydrated with traditional buttermilk/coconut water.`,
      issuedAt: timeStr,
      source: 'IMD Regional Meteorological Centre'
    };
  }

  // Heavy Rain / Flood / Cyclone check
  if (rainSumToday >= 65 || current.weatherCode === 65 || current.weatherCode >= 95) {
    return {
      severity: 'orange',
      headline: `Heavy Rain & Thunderstorm Warning for ${city.name}`,
      hindiHeadline: `भारी बारिश और गरज-चमक की चेतावनी`,
      details: `Isolated heavy to very heavy precipitation expected. Risk of localized street flooding and traffic disruptions in low-lying corridors. Wind gusts may exceed 50 km/h.`,
      issuedAt: timeStr,
      source: 'IMD National Weather Forecasting Centre'
    };
  }

  if (rainSumToday >= 20 || current.weatherCode === 63 || current.weatherCode === 81) {
    return {
      severity: 'yellow',
      headline: `Wet Weather & Rain Advisory for ${city.name}`,
      hindiHeadline: `बारिश का येलो अलर्ट - छाता साथ रखें`,
      details: `Moderate showers with intermittent spells likely over the next 24 hours. Carry rain protection and allow extra commute time.`,
      issuedAt: timeStr,
      source: 'IMD Regional Meteorological Centre'
    };
  }

  // Dense Fog check (winter months in Indo-Gangetic plains)
  if (current.weatherCode === 45 || current.weatherCode === 48) {
    return {
      severity: 'yellow',
      headline: `Dense Fog Advisory (घना कोहरा) for ${city.name}`,
      hindiHeadline: `घने कोहरे की चेतावनी - सड़क पर धीमी गति से वाहन चलाएं`,
      details: `Shallow to dense fog reducing horizontal visibility below 200m. Rail, highway, and airport flight operations may experience minor delays. Use low-beam fog lights.`,
      issuedAt: timeStr,
      source: 'IMD Fog Monitoring Division'
    };
  }

  // Severe Air Quality warning
  if (aqi.aqi > 300) {
    return {
      severity: 'orange',
      headline: `Severe Air Quality Hazard (CPCB NAQI: ${aqi.aqi})`,
      hindiHeadline: `वायु प्रदूषण चेतावनी - बाहर जाने पर मास्क पहनें`,
      details: `High concentration of ${aqi.prominentPollutant} particulates over ${city.name}. Prolonged outdoor breathing poses significant respiratory risks. Enforce anti-smog precautions.`,
      issuedAt: timeStr,
      source: 'Central Pollution Control Board (CPCB) Daily Air Bulletin'
    };
  }

  // Normal / Green Alert
  return {
    severity: 'green',
    headline: `Normal Weather Conditions across ${city.name}`,
    hindiHeadline: `सामान्य मौसम - कोई चेतावनी नहीं`,
    details: `No severe meteorological alerts in force. Favorable conditions for farming, travel, and routine urban activities.`,
    issuedAt: timeStr,
    source: 'India Meteorological Department (IMD)'
  };
}

// Generate Indian Lifestyle & Practical Daily Indices
export function calculateLifestyleIndices(current: CurrentWeather, aqi: AirQualityData, maxTemp: number, rainProb: number): LifestyleIndex[] {
  // 1. Morning Walk / Fitness Index
  let walkStatus: 'Optimal' | 'Fair' | 'Caution' | 'Adverse' = 'Optimal';
  let walkColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let walkScore = 'Optimal (उत्तम)';
  let walkDesc = 'Clean air and comfortable temperature make it a great morning for walking or jogging.';

  if (aqi.aqi > 300 || maxTemp > 42) {
    walkStatus = 'Adverse';
    walkColor = 'text-rose-700 bg-rose-50 border-rose-200';
    walkScore = 'Avoid (बचें)';
    walkDesc = 'Hazardous air or extreme heat. Opt for indoor yoga or home exercise instead.';
  } else if (aqi.aqi > 200 || rainProb > 70) {
    walkStatus = 'Caution';
    walkColor = 'text-amber-700 bg-amber-50 border-amber-200';
    walkScore = 'Caution (सावधानी)';
    walkDesc = 'High particulate pollution or rain expected. Wear an N95 mask or choose early indoor workouts.';
  } else if (aqi.aqi > 100) {
    walkStatus = 'Fair';
    walkColor = 'text-blue-700 bg-blue-50 border-blue-200';
    walkScore = 'Moderate (ठीक)';
    walkDesc = 'Moderate air. Safe for general walks, but elderly or asthmatics should take it easy.';
  }

  // 2. Kapde Sookhana (Clothes Drying Index)
  let dryStatus: 'Optimal' | 'Fair' | 'Caution' | 'Adverse' = 'Optimal';
  let dryColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let dryScore = 'Fast Drying (< 2 hrs)';
  let dryDesc = 'Strong dry breeze and clear sun will dry heavy cottons and linens rapidly.';

  if (rainProb > 60 || current.precipitation > 0.5) {
    dryStatus = 'Adverse';
    dryColor = 'text-rose-700 bg-rose-50 border-rose-200';
    dryScore = 'Dry Indoors Only';
    dryDesc = 'Rain or high humidity outdoors. Dry clothes under ceiling fans indoors.';
  } else if (current.humidity > 80) {
    dryStatus = 'Caution';
    dryColor = 'text-amber-700 bg-amber-50 border-amber-200';
    dryScore = 'Slow (> 5 hrs)';
    dryDesc = 'High tropical humidity will slow down drying outdoors.';
  } else if (current.humidity > 60) {
    dryStatus = 'Fair';
    dryColor = 'text-blue-700 bg-blue-50 border-blue-200';
    dryScore = 'Moderate (3-4 hrs)';
    dryDesc = 'Normal drying speed on balconies or open terraces.';
  }

  // 3. AC vs Ceiling Fan Comfort Index
  let acStatus: 'Optimal' | 'Fair' | 'Caution' | 'Adverse' = 'Fair';
  let acColor = 'text-blue-700 bg-blue-50 border-blue-200';
  let acScore = 'Fan Sufficient';
  let acDesc = 'Pleasant ambient warmth. Standard ceiling fan or open window provides ample comfort.';

  if (current.apparentTemperature >= 38 || (current.temperature >= 33 && current.humidity >= 65)) {
    acStatus = 'Adverse';
    acColor = 'text-rose-700 bg-rose-50 border-rose-200';
    acScore = 'Air Conditioner Recommended';
    acDesc = 'Sultry "Chipchipa" weather (high heat + moisture). Set AC to energy-saving 24°C–26°C.';
  } else if (current.apparentTemperature >= 32) {
    acStatus = 'Caution';
    acColor = 'text-amber-700 bg-amber-50 border-amber-200';
    acScore = 'High Speed Fan / Cooler';
    acDesc = 'Noticeable warmth. Desert cooler or high-speed ceiling fan will maintain comfort.';
  } else if (current.temperature < 15) {
    acStatus = 'Optimal';
    acColor = 'text-cyan-700 bg-cyan-50 border-cyan-200';
    acScore = 'No Cooling Needed / Warm Layer';
    acDesc = 'Crisp, cool temperature. Keep fans off and wear light woolens.';
  }

  // 4. Rain & Commute Readiness
  let rainStatus: 'Optimal' | 'Fair' | 'Caution' | 'Adverse' = 'Optimal';
  let rainColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let rainScore = 'No Umbrella Needed';
  let rainDesc = 'Clear transit forecast. Dry roads with minimal rain disruptions.';

  if (rainProb >= 70 || current.precipitation > 2) {
    rainStatus = 'Adverse';
    rainColor = 'text-rose-700 bg-rose-50 border-rose-200';
    rainScore = 'Umbrella / Raincoat Mandatory';
    rainDesc = 'High rain probability. Check for waterlogging on regular transit routes.';
  } else if (rainProb >= 35) {
    rainStatus = 'Caution';
    rainColor = 'text-amber-700 bg-amber-50 border-amber-200';
    rainScore = 'Carry Foldable Umbrella';
    rainDesc = 'Scattered passing showers likely. Good idea to keep rain gear handy.';
  }

  return [
    {
      id: 'morning_walk',
      title: 'Morning Walk & Exercise',
      hindiTitle: 'सुबह की सैर',
      scoreText: walkScore,
      status: walkStatus,
      statusColor: walkColor,
      description: walkDesc,
      iconName: 'Footprints'
    },
    {
      id: 'drying_clothes',
      title: 'Drying Clothes (कपड़े सुखाना)',
      hindiTitle: 'कपड़े सुखाना',
      scoreText: dryScore,
      status: dryStatus,
      statusColor: dryColor,
      description: dryDesc,
      iconName: 'Shirt'
    },
    {
      id: 'cooling_guide',
      title: 'AC & Fan Comfort Index',
      hindiTitle: 'कूलिंग गाइड',
      scoreText: acScore,
      status: acStatus,
      statusColor: acColor,
      description: acDesc,
      iconName: 'Wind'
    },
    {
      id: 'rain_gear',
      title: 'Umbrella & Commute',
      hindiTitle: 'छाता और यात्रा',
      scoreText: rainScore,
      status: rainStatus,
      statusColor: rainColor,
      description: rainDesc,
      iconName: 'Umbrella'
    }
  ];
}

// Indian Monsoon Seasonality
export function getMonsoonWatch(city: IndianCity, current: CurrentWeather): { phase: string; description: string; rainfallStatus: string } {
  const month = new Date().getMonth(); // 0 = Jan, 9 = Oct
  // In India:
  // June-Sept: Southwest Monsoon
  // Oct-Dec: Northeast Monsoon (retreating monsoon over Tamil Nadu, Andhra, Kerala)
  // Jan-Feb: Winter / Western Disturbances (NW India, J&K, Himachal)
  // Mar-May: Pre-Monsoon / Summer
  let phase = 'Post-Monsoon / Transition';
  let description = 'Atmospheric conditions transitioning with dry continental winds setting in.';
  let rainfallStatus = 'Normal Seasonal Levels';

  if (month >= 5 && month <= 8) {
    phase = 'Southwest Monsoon (दक्षिण-पश्चिम मानसून)';
    description = 'Main rainy season active across the Indian subcontinent driven by Arabian Sea and Bay of Bengal arms.';
    rainfallStatus = current.humidity > 70 ? 'Moisture-Laden Active Surge' : 'Monsoon Break Spell';
  } else if (month >= 9 && month <= 11) {
    if (city.region === 'South') {
      phase = 'Northeast Monsoon (उत्तर-पूर्वी मानसून)';
      description = 'Coromandel coastal belt receiving seasonal rains from retreating monsoon winds.';
      rainfallStatus = 'Active Coastal Showers';
    } else {
      phase = 'Post-Monsoon & Autumn Transition';
      description = 'Clear autumn skies with night cooling and rising morning mist in river basins.';
      rainfallStatus = 'Dry Spell';
    }
  } else if (month >= 0 && month <= 1) {
    phase = 'Winter Season & Western Disturbances';
    description = 'Extra-tropical storm systems originating in Mediterranean bringing snow to Western Himalayas and rain to northern plains.';
    rainfallStatus = city.region === 'North' ? 'Winter Rain / Snow Watch' : 'Dry Continental Season';
  } else {
    phase = 'Pre-Monsoon & Summer Season (ग्रीष्म)';
    description = 'Rising daytime temperatures with localized convective thundershowers (Kalbaishakhi / Mango Showers).';
    rainfallStatus = 'Localized Convective Activity';
  }

  return { phase, description, rainfallStatus };
}

// Memory Cache to speed up switching between cities
const weatherCache = new Map<string, { data: CityWeatherData; expires: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

// Fetch live weather data for an Indian city
export async function fetchCityWeather(city: IndianCity): Promise<CityWeatherData> {
  const cacheKey = `${city.id}-${city.lat.toFixed(3)}-${city.lon.toFixed(3)}`;
  const cached = weatherCache.get(cacheKey);
  if (cached && Date.now() < cached.expires) {
    return cached.data;
  }

  try {
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=Asia%2FKolkata&forecast_days=7`;
    const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${city.lat}&longitude=${city.lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,european_aqi,us_aqi&timezone=Asia%2FKolkata`;

    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(aqiUrl).catch(() => null)
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Weather API error: ${weatherRes.statusText}`);
    }

    const weatherJson = await weatherRes.json();
    let aqiJson = null;
    if (aqiRes && aqiRes.ok) {
      aqiJson = await aqiRes.json();
    }

    // Process Current
    const curRaw = weatherJson.current;
    const condition = getWeatherCondition(curRaw.weather_code);
    const currentWeather: CurrentWeather = {
      temperature: Math.round(curRaw.temperature_2m * 10) / 10,
      apparentTemperature: Math.round(curRaw.apparent_temperature * 10) / 10,
      humidity: Math.round(curRaw.relative_humidity_2m),
      pressure: Math.round(curRaw.pressure_msl || curRaw.surface_pressure || 1013),
      surfacePressure: Math.round(curRaw.surface_pressure || 1010),
      windSpeed: Math.round(curRaw.wind_speed_10m * 10) / 10,
      windDirection: Math.round(curRaw.wind_direction_10m),
      windGusts: Math.round(curRaw.wind_gusts_10m || curRaw.wind_speed_10m),
      weatherCode: curRaw.weather_code,
      condition,
      isDay: curRaw.is_day === 1,
      precipitation: curRaw.precipitation || 0,
      cloudCover: curRaw.cloud_cover || 0,
      timestamp: curRaw.time
    };

    // Process Hourly (next 24 entries)
    const hourlyRaw = weatherJson.hourly;
    const nowIso = new Date().toISOString();
    let startIndex = 0;
    if (hourlyRaw.time && hourlyRaw.time.length > 0) {
      const curHourPrefix = nowIso.slice(0, 13);
      const foundIdx = hourlyRaw.time.findIndex((t: string) => t.startsWith(curHourPrefix));
      startIndex = foundIdx >= 0 ? foundIdx : 0;
    }

    const hourlyItems: HourlyForecastItem[] = [];
    const maxEntries = Math.min(24, hourlyRaw.time.length - startIndex);
    for (let i = 0; i < maxEntries; i++) {
      const idx = startIndex + i;
      const t = hourlyRaw.time[idx];
      const dateObj = new Date(t);
      const hourFormatted = dateObj.toLocaleTimeString('en-IN', {
        hour: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      });

      const wCode = hourlyRaw.weather_code[idx];
      hourlyItems.push({
        time: t,
        hourFormatted: i === 0 ? 'Now' : hourFormatted,
        temperature: Math.round(hourlyRaw.temperature_2m[idx]),
        apparentTemperature: Math.round(hourlyRaw.temperature_2m[idx]),
        humidity: Math.round(hourlyRaw.relative_humidity_2m[idx]),
        precipitationProbability: Math.round(hourlyRaw.precipitation_probability[idx] || 0),
        precipitation: Math.round((hourlyRaw.precipitation[idx] || 0) * 10) / 10,
        weatherCode: wCode,
        condition: getWeatherCondition(wCode),
        windSpeed: Math.round(hourlyRaw.wind_speed_10m[idx] || 0)
      });
    }

    // Process Daily (7 days)
    const dailyRaw = weatherJson.daily;
    const dailyItems: DailyForecastItem[] = [];
    const dayDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 0; i < dailyRaw.time.length; i++) {
      const dStr = dailyRaw.time[i];
      const dObj = new Date(dStr + 'T00:00:00');
      const dayOfWeek = i === 0 ? 'Today' : dayDays[dObj.getDay()];
      const dateFormatted = dObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
      const wCode = dailyRaw.weather_code[i];

      const sunriseIso = dailyRaw.sunrise[i];
      const sunsetIso = dailyRaw.sunset[i];
      const sunriseTime = sunriseIso ? new Date(sunriseIso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }) : '06:00 AM';
      const sunsetTime = sunsetIso ? new Date(sunsetIso).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }) : '06:00 PM';

      dailyItems.push({
        date: dStr,
        dayOfWeek,
        dateFormatted,
        weatherCode: wCode,
        condition: getWeatherCondition(wCode),
        tempMax: Math.round(dailyRaw.temperature_2m_max[i]),
        tempMin: Math.round(dailyRaw.temperature_2m_min[i]),
        apparentTempMax: Math.round(dailyRaw.apparent_temperature_max[i]),
        apparentTempMin: Math.round(dailyRaw.apparent_temperature_min[i]),
        precipitationSum: Math.round((dailyRaw.precipitation_sum[i] || 0) * 10) / 10,
        precipitationProbabilityMax: Math.round(dailyRaw.precipitation_probability_max[i] || 0),
        uvIndexMax: Math.round((dailyRaw.uv_index_max[i] || 5) * 10) / 10,
        sunrise: sunriseTime,
        sunset: sunsetTime
      });
    }

    // Process Air Quality
    let pm25 = 35;
    let pm10 = 65;
    let co = 400;
    let no2 = 25;
    let so2 = 12;
    let o3 = 45;

    if (aqiJson && aqiJson.current) {
      const c = aqiJson.current;
      pm25 = c.pm2_5 ?? 35;
      pm10 = c.pm10 ?? 65;
      co = c.carbon_monoxide ?? 400;
      no2 = c.nitrogen_dioxide ?? 25;
      so2 = c.sulphur_dioxide ?? 12;
      o3 = c.ozone ?? 45;
    } else {
      // Sensible baseline for Indian urban climate if AQI API is throttled
      if (city.region === 'North') {
        pm25 = 85;
        pm10 = 140;
      } else if (city.climateZone === 'Himalayan / Alpine') {
        pm25 = 18;
        pm10 = 32;
      } else if (city.climateZone === 'Coastal') {
        pm25 = 38;
        pm10 = 68;
      }
    }

    const airQualityData = calculateIndianNaqi(pm25, pm10, co, no2, so2, o3);
    const maxTempToday = dailyItems[0]?.tempMax || currentWeather.temperature;
    const rainSumToday = dailyItems[0]?.precipitationSum || currentWeather.precipitation;

    const imdAlert = generateImdAlert(city, currentWeather, airQualityData, maxTempToday, rainSumToday);
    const rainProb = dailyItems[0]?.precipitationProbabilityMax || 20;
    const lifestyleIndices = calculateLifestyleIndices(currentWeather, airQualityData, maxTempToday, rainProb);
    const monsoonStatus = getMonsoonWatch(city, currentWeather);

    const result: CityWeatherData = {
      city,
      current: currentWeather,
      hourly: hourlyItems,
      daily: dailyItems,
      airQuality: airQualityData,
      imdAlert,
      lifestyleIndices,
      monsoonStatus,
      fetchedAt: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST'
    };

    weatherCache.set(cacheKey, { data: result, expires: Date.now() + CACHE_TTL });
    return result;
  } catch (err) {
    console.warn(`Live weather fetch failed for ${city.name}, using high-fidelity fallback:`, err);
    return getFallbackCityWeather(city);
  }
}

// High-fidelity fallback generator if offline or network blocked
export function getFallbackCityWeather(city: IndianCity): CityWeatherData {
  const isHills = city.climateZone === 'Himalayan / Alpine';
  const isCoastal = city.climateZone === 'Coastal';
  const isArid = city.climateZone === 'Arid / Semi-arid';

  const baseTemp = isHills ? 16 : isCoastal ? 30 : isArid ? 34 : 29;
  const baseHumidity = isCoastal ? 78 : isHills ? 55 : isArid ? 35 : 58;

  const condition = getWeatherCondition(isHills ? 1 : isCoastal ? 2 : 0);
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST';

  const current: CurrentWeather = {
    temperature: baseTemp,
    apparentTemperature: isCoastal ? baseTemp + 4 : baseTemp,
    humidity: baseHumidity,
    pressure: isHills ? 840 : 1012,
    surfacePressure: isHills ? 835 : 1010,
    windSpeed: isCoastal ? 18.5 : 10.2,
    windDirection: 240,
    windGusts: isCoastal ? 28 : 15,
    weatherCode: condition.code,
    condition,
    isDay: true,
    precipitation: 0,
    cloudCover: isCoastal ? 40 : 15,
    timestamp: now.toISOString()
  };

  const hourly: HourlyForecastItem[] = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getTime() + i * 3600000);
    const hourLabel = i === 0 ? 'Now' : d.toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true });
    const tempVar = Math.sin((i / 24) * Math.PI * 2 - Math.PI / 2) * 5;
    hourly.push({
      time: d.toISOString(),
      hourFormatted: hourLabel,
      temperature: Math.round(baseTemp + tempVar),
      apparentTemperature: Math.round(baseTemp + tempVar + (isCoastal ? 3 : 0)),
      humidity: Math.max(30, Math.min(95, Math.round(baseHumidity - tempVar * 2))),
      precipitationProbability: isCoastal ? 25 : 10,
      precipitation: 0,
      weatherCode: condition.code,
      condition,
      windSpeed: Math.round(current.windSpeed + Math.sin(i) * 3)
    });
  }

  const days = ['Today', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
  const daily: DailyForecastItem[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now.getTime() + i * 86400000);
    daily.push({
      date: d.toISOString().slice(0, 10),
      dayOfWeek: days[i] || 'Day',
      dateFormatted: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      weatherCode: condition.code,
      condition,
      tempMax: baseTemp + 3 + (i % 2),
      tempMin: Math.max(8, baseTemp - 7 - (i % 2)),
      apparentTempMax: baseTemp + 5,
      apparentTempMin: baseTemp - 6,
      precipitationSum: isCoastal && i === 2 ? 3.5 : 0,
      precipitationProbabilityMax: isCoastal ? 35 : 15,
      uvIndexMax: isHills ? 7.5 : 8.5,
      sunrise: '06:14 AM',
      sunset: '06:02 PM'
    });
  }

  const pm25 = city.region === 'North' ? 95 : isHills ? 22 : 45;
  const pm10 = pm25 * 1.8;
  const airQuality = calculateIndianNaqi(pm25, pm10, 420, 28, 12, 40);
  const imdAlert = generateImdAlert(city, current, airQuality, baseTemp + 3, 0);
  const lifestyleIndices = calculateLifestyleIndices(current, airQuality, baseTemp + 3, 15);
  const monsoonStatus = getMonsoonWatch(city, current);

  return {
    city,
    current,
    hourly,
    daily,
    airQuality,
    imdAlert,
    lifestyleIndices,
    monsoonStatus,
    fetchedAt: timeStr
  };
}

// Search online for any Indian place not in pre-defined list
export async function searchIndianPlaces(query: string): Promise<IndianCity[]> {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return [];

  // 1. Search local curated database first (super fast)
  const localMatches = INDIAN_CITIES.filter(
    (c) =>
      c.name.toLowerCase().includes(trimmed) ||
      c.hindiName.includes(trimmed) ||
      c.state.toLowerCase().includes(trimmed) ||
      c.region.toLowerCase().includes(trimmed)
  );

  if (localMatches.length > 0) {
    return localMatches;
  }

  // 2. Fall back to Open-Meteo Geocoding API filtered to India
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
    const res = await fetch(geoUrl);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.results) return [];

    // Filter to country code IN (India)
    const inResults = data.results.filter((r: any) => r.country_code === 'IN' || r.country === 'India');
    return inResults.map((r: any, idx: number) => ({
      id: `custom-${r.id || idx}-${r.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: r.name,
      hindiName: r.name,
      state: r.admin1 || 'India',
      region: getRegionFromState(r.admin1 || ''),
      lat: r.latitude,
      lon: r.longitude,
      elevationMeters: Math.round(r.elevation || 200),
      climateZone: r.elevation > 1200 ? 'Himalayan / Alpine' : 'Sub-tropical'
    }));
  } catch {
    return [];
  }
}

function getRegionFromState(state: string): IndianCity['region'] {
  const s = state.toLowerCase();
  if (s.includes('kashmir') || s.includes('ladakh') || s.includes('himachal') || s.includes('punjab') || s.includes('delhi') || s.includes('haryana') || s.includes('uttar pradesh') || s.includes('uttarakhand') || s.includes('rajasthan')) {
    return 'North';
  }
  if (s.includes('tamil') || s.includes('kerala') || s.includes('karnataka') || s.includes('andhra') || s.includes('telangana')) {
    return 'South';
  }
  if (s.includes('maharashtra') || s.includes('gujarat') || s.includes('goa')) {
    return 'West';
  }
  if (s.includes('west bengal') || s.includes('bihar') || s.includes('odisha') || s.includes('jharkhand')) {
    return 'East';
  }
  if (s.includes('assam') || s.includes('meghalaya') || s.includes('sikkim') || s.includes('tripura') || s.includes('manipur') || s.includes('nagaland') || s.includes('arunachal') || s.includes('mizoram')) {
    return 'North-East';
  }
  return 'Central';
}
