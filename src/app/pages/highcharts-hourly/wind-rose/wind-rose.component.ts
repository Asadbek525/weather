import { Component, signal, WritableSignal } from '@angular/core';
import Highcharts from 'highcharts';
import { Wind } from '../../../shared/models/weather.model';
import { HighchartsChartModule } from 'highcharts-angular';
import HighchartsMore from 'highcharts/highcharts-more';
import { HighchartsHourlyStore } from '../store/highcharts-hourly.store';
import { WIND_ROSE_CONFIG } from '../../../core/constants/high-charts.config';

HighchartsMore(Highcharts);

@Component({
  selector: 'app-wind-rose',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './wind-rose.component.html',
  styleUrl: './wind-rose.component.scss',
})
export class WindRoseComponent {
  Highcharts: typeof Highcharts = Highcharts;
  directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  initialChartOptions = {
    ...WIND_ROSE_CONFIG,
    xAxis: {
      ...WIND_ROSE_CONFIG.xAxis,
      categories: this.directions,
    },
    series: this.getSeriesData([]),
  };

  chartOptions: WritableSignal<any> = signal(this.initialChartOptions);
  windRoseData$;

  constructor(private highchartsHourlyStore: HighchartsHourlyStore) {
    this.windRoseData$ = this.highchartsHourlyStore.windData$;
    this.windRoseData$.subscribe(data => {
      if (data) {
        this.setWindRoseData(data);
      }
    });
  }

  private getWindSpeedCategory(speed: number): string {
    if (speed < 5) {
      return '0-5 m/s';
    } else if (speed < 10) {
      return '5-10 m/s';
    } else {
      return '>10 m/s';
    }
  }

  private getWindDirection(deg: number): string {
    return this.directions[Math.round(deg / 45) % 8];
  }

  private getSeriesData(windData: Wind[]) {
    const seriesData = [];
    const windSpeedCategories = ['0-5 m/s', '5-10 m/s', '>10 m/s'];
    for (const category of windSpeedCategories) {
      const data = [];
      for (const direction of this.directions) {
        const wind = windData.find(
          w =>
            this.getWindDirection(w.deg) === direction &&
            this.getWindSpeedCategory(w.speed) === category
        );
        if (wind) {
          data.push(wind.speed);
        } else {
          data.push(0);
        }
      }
      seriesData.push({
        name: category,
        data,
        type: 'column',
        pointPlacement: 'on',
      });
    }
    return seriesData;
  }

  private setWindRoseData(data: Wind[]) {
    this.chartOptions.update(value => ({
      ...value,
      series: this.getSeriesData(data),
    }));
  }
}
