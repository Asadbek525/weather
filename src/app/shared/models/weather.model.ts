export interface DailyResponse {
  city: City;
  cnt: number;
  cod: string;
  message: number;
  list: Daily[];
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  country: string;
  name: string;
  population: number;
  timezone: number;
  coord: Coord;
}
