import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocationService } from './location.service';
import { environment } from '../../../environments/environment';
import {
  DailyResponse,
  HourlyResponse,
} from '../../shared/models/weather.model';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  apiKey: string;
  lat: number;
  lon: number;
  units: string;

  constructor(
    private apiService: ApiService,
    private locationService: LocationService
  ) {
    this.apiKey = environment.apiKey;
    this.lat = this.locationService.getLocation().latitude;
    this.lon = this.locationService.getLocation().longitude;
    this.units = environment.units;
  }

  getDailyForecast(cnt = 7) {
    return this.apiService
      .get<DailyResponse>('/daily', {
        lat: this.lat,
        lon: this.lon,
        appid: this.apiKey,
        cnt,
        units: this.units,
      })
      .pipe(
        catchError(this.apiService.handleError('getDailyForecast', undefined))
      );
  }

  getHourlyForecast() {
    return this.apiService
      .get<HourlyResponse>('/hourly', {
        lat: this.lat,
        lon: this.lon,
        appid: this.apiKey,
        units: this.units,
      })
      .pipe(
        catchError(this.apiService.handleError('getHourlyForecast', undefined))
      );
  }
}
