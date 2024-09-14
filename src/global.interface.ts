export interface GeocodingResponse {
  results: Location[];
}

export interface WeatherCard {
  name: string;
  temperature: number;
  weatherImage: string;
  unit: string;
}

export interface Location {
  id: number;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface DailyAverage {
  date: string;
  avgTemp: string;
  avgCode: string;
}
