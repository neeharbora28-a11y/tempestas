export interface IndianCity {
  id: string;
  name: string;
  hindiName: string;
  state: string;
  region: 'North' | 'South' | 'West' | 'East' | 'Central' | 'North-East';
  lat: number;
  lon: number;
  elevationMeters: number;
  isMetro?: boolean;
  climateZone?: 'Tropical' | 'Sub-tropical' | 'Arid / Semi-arid' | 'Himalayan / Alpine' | 'Coastal';
  famousFor?: string;
}

export const INDIAN_CITIES: IndianCity[] = [
  // Metros & National Capital
  {
    id: 'delhi',
    name: 'New Delhi',
    hindiName: 'नई दिल्ली',
    state: 'Delhi NCR',
    region: 'North',
    lat: 28.6139,
    lon: 77.2090,
    elevationMeters: 216,
    isMetro: true,
    climateZone: 'Sub-tropical',
    famousFor: 'National Capital Territory'
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    hindiName: 'मुंबई',
    state: 'Maharashtra',
    region: 'West',
    lat: 19.0760,
    lon: 72.8777,
    elevationMeters: 14,
    isMetro: true,
    climateZone: 'Coastal',
    famousFor: 'Financial Capital & Arabian Sea Coast'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    hindiName: 'बेंगलुरु',
    state: 'Karnataka',
    region: 'South',
    lat: 12.9716,
    lon: 77.5946,
    elevationMeters: 920,
    isMetro: true,
    climateZone: 'Tropical',
    famousFor: 'Silicon Plateau & Pleasant Weather'
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    hindiName: 'कोलकाता',
    state: 'West Bengal',
    region: 'East',
    lat: 22.5726,
    lon: 88.3639,
    elevationMeters: 9,
    isMetro: true,
    climateZone: 'Tropical',
    famousFor: 'City of Joy & Hooghly River'
  },
  {
    id: 'chennai',
    name: 'Chennai',
    hindiName: 'चेन्नई',
    state: 'Tamil Nadu',
    region: 'South',
    lat: 13.0827,
    lon: 80.2707,
    elevationMeters: 6,
    isMetro: true,
    climateZone: 'Coastal',
    famousFor: 'Coromandel Coast & Northeast Monsoon'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    hindiName: 'हैदराबाद',
    state: 'Telangana',
    region: 'South',
    lat: 17.3850,
    lon: 78.4867,
    elevationMeters: 542,
    isMetro: true,
    climateZone: 'Tropical',
    famousFor: 'Deccan Plateau'
  },

  // North India
  {
    id: 'srinagar',
    name: 'Srinagar',
    hindiName: 'श्रीनगर',
    state: 'Jammu & Kashmir',
    region: 'North',
    lat: 34.0837,
    lon: 74.7973,
    elevationMeters: 1585,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'Kashmir Valley & Dal Lake'
  },
  {
    id: 'shimla',
    name: 'Shimla',
    hindiName: 'शिमला',
    state: 'Himachal Pradesh',
    region: 'North',
    lat: 31.1048,
    lon: 77.1734,
    elevationMeters: 2206,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'Himalayan Foothills & Apple Orchards'
  },
  {
    id: 'leh',
    name: 'Leh Ladakh',
    hindiName: 'लेह लद्दाख',
    state: 'Ladakh',
    region: 'North',
    lat: 34.1526,
    lon: 77.5771,
    elevationMeters: 3500,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'High-Altitude Cold Desert'
  },
  {
    id: 'chandigarh',
    name: 'Chandigarh',
    hindiName: 'चंडीगढ़',
    state: 'Punjab / Haryana',
    region: 'North',
    lat: 30.7333,
    lon: 76.7794,
    elevationMeters: 321,
    climateZone: 'Sub-tropical',
    famousFor: 'The City Beautiful & Shivalik View'
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    hindiName: 'जयपुर',
    state: 'Rajasthan',
    region: 'North',
    lat: 26.9124,
    lon: 75.7873,
    elevationMeters: 431,
    climateZone: 'Arid / Semi-arid',
    famousFor: 'Pink City & Thar Desert Edge'
  },
  {
    id: 'lucknow',
    name: 'Lucknow',
    hindiName: 'लखनऊ',
    state: 'Uttar Pradesh',
    region: 'North',
    lat: 26.8467,
    lon: 80.9462,
    elevationMeters: 123,
    climateZone: 'Sub-tropical',
    famousFor: 'Awadh Plains & Gomti Basin'
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    hindiName: 'वाराणसी',
    state: 'Uttar Pradesh',
    region: 'North',
    lat: 25.3176,
    lon: 82.9739,
    elevationMeters: 80,
    climateZone: 'Sub-tropical',
    famousFor: 'Ganga Ghats & Ancient Heritage'
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    hindiName: 'देहरादून',
    state: 'Uttarakhand',
    region: 'North',
    lat: 30.3165,
    lon: 78.0322,
    elevationMeters: 640,
    climateZone: 'Sub-tropical',
    famousFor: 'Doon Valley'
  },
  {
    id: 'amritsar',
    name: 'Amritsar',
    hindiName: 'अमृतसर',
    state: 'Punjab',
    region: 'North',
    lat: 31.6340,
    lon: 74.8723,
    elevationMeters: 234,
    climateZone: 'Sub-tropical',
    famousFor: 'Golden Temple & Majha Plain'
  },

  // West India
  {
    id: 'pune',
    name: 'Pune',
    hindiName: 'पुणे',
    state: 'Maharashtra',
    region: 'West',
    lat: 18.5204,
    lon: 73.8567,
    elevationMeters: 560,
    climateZone: 'Tropical',
    famousFor: 'Western Ghats Leeward Plains'
  },
  {
    id: 'ahmedabad',
    name: 'Ahmedabad',
    hindiName: 'अहमदाबाद',
    state: 'Gujarat',
    region: 'West',
    lat: 23.0225,
    lon: 72.5714,
    elevationMeters: 53,
    climateZone: 'Arid / Semi-arid',
    famousFor: 'Sabarmati Valley & Cotton Hub'
  },
  {
    id: 'surat',
    name: 'Surat',
    hindiName: 'सूरत',
    state: 'Gujarat',
    region: 'West',
    lat: 21.1702,
    lon: 72.8311,
    elevationMeters: 13,
    climateZone: 'Coastal',
    famousFor: 'Tapi Estuary'
  },
  {
    id: 'panaji',
    name: 'Panaji (Goa)',
    hindiName: 'पणजी (गोवा)',
    state: 'Goa',
    region: 'West',
    lat: 15.4909,
    lon: 73.8278,
    elevationMeters: 7,
    climateZone: 'Coastal',
    famousFor: 'Konkan Coast & Heavy Monsoons'
  },
  {
    id: 'nagpur',
    name: 'Nagpur',
    hindiName: 'नागपुर',
    state: 'Maharashtra',
    region: 'West',
    lat: 21.1458,
    lon: 79.0882,
    elevationMeters: 310,
    climateZone: 'Tropical',
    famousFor: 'Zero Mile Stone & Orange Heartland'
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    hindiName: 'उदयपुर',
    state: 'Rajasthan',
    region: 'West',
    lat: 24.5854,
    lon: 73.7125,
    elevationMeters: 598,
    climateZone: 'Arid / Semi-arid',
    famousFor: 'Aravalli Hills & City of Lakes'
  },

  // South India
  {
    id: 'kochi',
    name: 'Kochi',
    hindiName: 'कोच्चि',
    state: 'Kerala',
    region: 'South',
    lat: 9.9312,
    lon: 76.2673,
    elevationMeters: 3,
    climateZone: 'Coastal',
    famousFor: 'Malabar Coast & First Monsoon Entry Point'
  },
  {
    id: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    hindiName: 'तिरुवनंतपुरम',
    state: 'Kerala',
    region: 'South',
    lat: 8.5241,
    lon: 76.9366,
    elevationMeters: 10,
    climateZone: 'Coastal',
    famousFor: 'South-West Monsoon Gateway'
  },
  {
    id: 'coimbatore',
    name: 'Coimbatore',
    hindiName: 'कोयंबटूर',
    state: 'Tamil Nadu',
    region: 'South',
    lat: 11.0168,
    lon: 76.9558,
    elevationMeters: 411,
    climateZone: 'Tropical',
    famousFor: 'Palakkad Gap Gateway'
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    hindiName: 'विशाखापट्टनम',
    state: 'Andhra Pradesh',
    region: 'South',
    lat: 17.6868,
    lon: 83.2185,
    elevationMeters: 45,
    climateZone: 'Coastal',
    famousFor: 'Eastern Naval Port & Cyclone Watch'
  },
  {
    id: 'ooty',
    name: 'Ooty (Udhagamandalam)',
    hindiName: 'ऊटी',
    state: 'Tamil Nadu',
    region: 'South',
    lat: 11.4102,
    lon: 76.6950,
    elevationMeters: 2240,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'Nilgiri Blue Mountains'
  },
  {
    id: 'madurai',
    name: 'Madurai',
    hindiName: 'मदुरै',
    state: 'Tamil Nadu',
    region: 'South',
    lat: 9.9252,
    lon: 78.1198,
    elevationMeters: 101,
    climateZone: 'Tropical',
    famousFor: 'Vaigai River Plain'
  },

  // East India
  {
    id: 'patna',
    name: 'Patna',
    hindiName: 'पटना',
    state: 'Bihar',
    region: 'East',
    lat: 25.5941,
    lon: 85.1376,
    elevationMeters: 53,
    climateZone: 'Sub-tropical',
    famousFor: 'Middle Indo-Gangetic Plain'
  },
  {
    id: 'bhubaneswar',
    name: 'Bhubaneswar',
    hindiName: 'भुवनेश्वर',
    state: 'Odisha',
    region: 'East',
    lat: 20.2961,
    lon: 85.8245,
    elevationMeters: 45,
    climateZone: 'Coastal',
    famousFor: 'Bay of Bengal Weather Belt'
  },
  {
    id: 'ranchi',
    name: 'Ranchi',
    hindiName: 'रांची',
    state: 'Jharkhand',
    region: 'East',
    lat: 23.3441,
    lon: 85.3096,
    elevationMeters: 651,
    climateZone: 'Tropical',
    famousFor: 'Chota Nagpur Plateau'
  },
  {
    id: 'darjeeling',
    name: 'Darjeeling',
    hindiName: 'दार्जिलिंग',
    state: 'West Bengal',
    region: 'East',
    lat: 27.0410,
    lon: 88.2663,
    elevationMeters: 2042,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'Eastern Himalayas & Tea Hills'
  },

  // North-East India
  {
    id: 'guwahati',
    name: 'Guwahati',
    hindiName: 'गुवाहाटी',
    state: 'Assam',
    region: 'North-East',
    lat: 26.1445,
    lon: 91.7362,
    elevationMeters: 55,
    climateZone: 'Sub-tropical',
    famousFor: 'Brahmaputra Valley & North East Gateway'
  },
  {
    id: 'shillong',
    name: 'Shillong',
    hindiName: 'शिलांग',
    state: 'Meghalaya',
    region: 'North-East',
    lat: 25.5788,
    lon: 91.8933,
    elevationMeters: 1525,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'Abode of Clouds & Scotland of the East'
  },
  {
    id: 'gangtok',
    name: 'Gangtok',
    hindiName: 'गंगटोक',
    state: 'Sikkim',
    region: 'North-East',
    lat: 27.3314,
    lon: 88.6138,
    elevationMeters: 1650,
    climateZone: 'Himalayan / Alpine',
    famousFor: 'Kanchenjunga Foothills'
  },
  {
    id: 'agartala',
    name: 'Agartala',
    hindiName: 'अगरतला',
    state: 'Tripura',
    region: 'North-East',
    lat: 23.8315,
    lon: 91.2868,
    elevationMeters: 12,
    climateZone: 'Tropical',
    famousFor: 'Haora River Basin'
  },

  // Central India
  {
    id: 'bhopal',
    name: 'Bhopal',
    hindiName: 'भोपाल',
    state: 'Madhya Pradesh',
    region: 'Central',
    lat: 23.2599,
    lon: 77.4126,
    elevationMeters: 527,
    climateZone: 'Tropical',
    famousFor: 'Upper Lake & Central Vindhyas'
  },
  {
    id: 'indore',
    name: 'Indore',
    hindiName: 'इंदौर',
    state: 'Madhya Pradesh',
    region: 'Central',
    lat: 22.7196,
    lon: 75.8577,
    elevationMeters: 553,
    climateZone: 'Tropical',
    famousFor: 'Malwa Plateau & Cleanest City'
  },
  {
    id: 'raipur',
    name: 'Raipur',
    hindiName: 'रायपुर',
    state: 'Chhattisgarh',
    region: 'Central',
    lat: 21.2514,
    lon: 81.6296,
    elevationMeters: 298,
    climateZone: 'Tropical',
    famousFor: 'Mahanadi Basin & Rice Bowl'
  }
];

export const REGIONS: Array<IndianCity['region']> = [
  'North',
  'South',
  'West',
  'East',
  'Central',
  'North-East'
];
