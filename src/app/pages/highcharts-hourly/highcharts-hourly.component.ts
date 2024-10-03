import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { WeatherService } from '../../core/services/weather.service';
import { Hourly } from '../../shared/models/weather.model';
import StockModule from 'highcharts/modules/stock';

StockModule(Highcharts);

@Component({
  selector: 'app-highcharts-hourly',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './highcharts-hourly.component.html',
  styleUrl: './highcharts-hourly.component.scss',
})
export class HighchartsHourlyComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: WritableSignal<Highcharts.Options> = signal({
    rangeSelector: {
      selected: 1,
    },
    navigator: {
      enabled: true,
    },
    chart: {
      zooming: {
        type: 'x',
        enabled: true,
      },
    },
    title: {
      text: 'Weather Data',
    },
    xAxis: {
      type: 'datetime',
      minRange: 5 * 3600 * 1000,
    },
    yAxis: [
      {
        // Primary Y-Axis (Temperature)
        title: {
          text: 'Temperature (°C)',
        },
        labels: {
          format: '{value}°C',
        },
        opposite: false, // This will be the left Y-axis
      },
      {
        // Secondary Y-Axis (Humidity)
        title: {
          text: 'Humidity (%)',
        },
        labels: {
          format: '{value} %',
        },
        opposite: true, // This will be the right Y-axis
      },
    ],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        data: [],
      },
      {
        name: 'Humidity',
        type: 'line',
        data: [],
      },
    ],
  });

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getHourlyForecast();
  }

  getHourlyForecast() {
    this.weatherService.getHourlyForecast().subscribe(res => {
      if (res) {
        const data = this.getTemperatureSeries(res.list);
        const humidity = this.getHourlyHumidity(res.list);
        this.chartOptions.update(value => {
          return {
            ...value,
            series: [
              {
                name: 'Temperature',
                type: 'line',
                data: data,
                yAxis: 0,
              },
              {
                name: 'Humidity',
                type: 'line',
                data: humidity,
                yAxis: 1,
              },
            ],
          };
        });
      }
    });
  }

  private getTemperatureSeries(data: Hourly[]) {
    return data.map(hourly => {
      return [hourly.dt * 1000, hourly.main.temp];
    });
  }

  private getHourlyHumidity(data: Hourly[]) {
    return data.map(hourly => {
      return [hourly.dt * 1000, hourly.main.humidity];
    });
  }
}
