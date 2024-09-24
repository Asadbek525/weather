import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocationService } from './location.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiKey: string;
  lat: number;
  lon: number;

  constructor(
    private apiService: ApiService,
    private locationService: LocationService
  ) {
    this.apiKey = environment.apiKey;
    this.lat = this.locationService.getLocation().latitude;
    this.lon = this.locationService.getLocation().longitude;
  }

  getDailyForecast(cnt = 7) {
    return this.apiService.get('/daily', {
      lat: this.lat,
      lon: this.lon,
      appid: this.apiKey,
      cnt,
      units: 'metric',
    });
  }
}
