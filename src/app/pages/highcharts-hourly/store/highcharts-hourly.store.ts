import { HourlyResponse } from '../../../shared/models/weather.model';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface HighchartsHourlyState {
  hourlyData?: HourlyResponse;
}

@Injectable()
export class HighchartsHourlyStore extends ComponentStore<HighchartsHourlyState> {
  readonly hourlyData$ = this.select(state => state.hourlyData, {
    debounce: true,
  });
  readonly windData$ = this.select(state => {
    return state.hourlyData?.list.map(hour => hour.wind);
  });

  readonly setHourlyData = this.updater((state, hourlyData: HourlyResponse) => {
    return {
      ...state,
      hourlyData,
    };
  });

  constructor() {
    super({
      hourlyData: undefined,
    });
  }
}
