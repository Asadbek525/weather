export interface DailyResponse {
  city: City;
  cnt: number;
  cod: string;
  message: number;
  list: Daily[];
}

export interface HourlyResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Hourly[];
}

export interface Hourly {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
}

export interface Sys {
  pod: string;
}

export interface Rain {
  '1h': number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
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
