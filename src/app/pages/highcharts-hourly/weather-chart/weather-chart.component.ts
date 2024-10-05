import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { LINE_CHART_CONFIG } from '../../../core/constants/high-charts.config';
import { Observable } from 'rxjs';
import { HourlyResponse } from '../../../shared/models/weather.model';
import { HighchartsHourlyStore } from '../store/highcharts-hourly.store';
import { WeatherService } from '../../../core/services/weather.service';
import { HighChartsFlag } from '../../../shared/models/high-charts.model';
import moment from 'moment/moment';
import Highcharts from 'highcharts';
import StockChart from 'highcharts/modules/stock';
import { HighchartsChartModule } from 'highcharts-angular';

StockChart(Highcharts);

@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [HighchartsChartModule],
  templateUrl: './weather-chart.component.html',
  styleUrl: './weather-chart.component.scss',
})
export class WeatherChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: WritableSignal<any> = signal(LINE_CHART_CONFIG);
  hourlyData$: Observable<HourlyResponse | undefined>;

  constructor(
    private readonly highchartsHourlyStore: HighchartsHourlyStore,
    private weatherService: WeatherService
  ) {
    this.hourlyData$ = this.highchartsHourlyStore.hourlyData$;
  }

  ngOnInit(): void {
    this.fetchHourlyForecast();
    this.getHourlyForecast();
  }

  fetchHourlyForecast() {
    this.weatherService.getHourlyForecast().subscribe(res => {
      if (res) this.highchartsHourlyStore.setHourlyData(res);
    });
  }

  getHourlyForecast() {
    this.highchartsHourlyStore.hourlyData$.subscribe(res => {
      if (res) {
        const data = this.getTemperatureSeries(res);
        const humidity = this.getHourlyHumidity(res);
        const plotBands = this.getPlotBandsForDayAndNight(res);
        const flags = this.getDailyMaxAndMinTempFlags(res);
        this.chartOptions.update(value => {
          return {
            ...value,
            series: [
              {
                name: 'Temperature',
                type: 'line',
                id: 'temperatureSeries',
                data: data,
                yAxis: 0,
              },
              {
                name: 'Humidity',
                type: 'line',
                id: 'Humidity',
                data: humidity,
                yAxis: 1,
              },
              {
                type: 'flags',
                data: flags.dailyMaxTemp,
                onSeries: 'temperatureSeries',
                shape: 'circlepin',
                color: '#00FF00',
                style: {
                  color: 'black',
                },
              },
              {
                type: 'flags',
                data: flags.dailyMinTemp,
                onSeries: 'temperatureSeries',
                shape: 'circlepin',
                color: '#FF0000',
                style: {
                  color: 'black',
                },
              },
            ],
            xAxis: {
              ...value.xAxis,
              plotBands,
            },
          };
        });
      }
    });
  }

  private getTemperatureSeries(res: HourlyResponse) {
    const data = res.list;
    return data.map(hourly => {
      return [(hourly.dt + res.city.timezone) * 1000, hourly.main.temp];
    });
  }

  private getHourlyHumidity(res: HourlyResponse) {
    const data = res.list;
    return data.map(hourly => {
      return [(hourly.dt + res.city.timezone) * 1000, hourly.main.humidity];
    });
  }

  private getPlotBandsForDayAndNight(data: HourlyResponse) {
    const plotBands = [];
    const sunrise = (data.city.sunrise + data.city.timezone) * 1000;
    const sunset = (data.city.sunset + data.city.timezone) * 1000;
    const daysCount = data.list.length / 24;
    for (let i = 0; i <= daysCount; i++) {
      const from = sunrise + i * 24 * 3600 * 1000;
      const to = sunset + i * 24 * 3600 * 1000;
      plotBands.push({
        from,
        to,
        color: 'rgba(68, 170, 213, 0.1)',
      });
    }

    for (let i = 0; i <= daysCount; i++) {
      const from = sunset + i * 24 * 3600 * 1000;
      const to = sunrise + (i + 1) * 24 * 3600 * 1000;
      plotBands.push({
        from,
        to,
        color: '#FCFFC5',
      });
    }
    return plotBands;
  }

  private getDailyMaxAndMinTempFlags(data: HourlyResponse) {
    const dailyMaxTemp: HighChartsFlag[] = [];
    const dailyMinTemp: HighChartsFlag[] = [];
    const dailyMaxTempData: Record<number, { temp: number; dt: number }> = {};
    const dailyMinTempData: Record<number, { temp: number; dt: number }> = {};
    const timezone = data.city.timezone;
    data.list.forEach(hourly => {
      const date = new Date(hourly.dt * 1000);
      const day = date.getDate();
      const temp = hourly.main.temp;
      if (
        dailyMaxTempData[day] === undefined ||
        dailyMaxTempData[day].temp < temp
      ) {
        dailyMaxTempData[day] = {
          temp,
          dt: (hourly.dt + timezone) * 1000,
        };
      }
      if (
        dailyMinTempData[day] === undefined ||
        dailyMinTempData[day].temp > temp
      ) {
        dailyMinTempData[day] = {
          temp,
          dt: (hourly.dt + timezone) * 1000,
        };
      }
    });
    for (const { temp, dt } of Object.values(dailyMaxTempData)) {
      dailyMaxTemp.push({
        x: dt,
        title: 'Max Temp',
        text: `Max Temp: ${temp}°C for ${moment(dt - timezone * 1000).format('DD/MM/YYYY')}`,
      });
    }
    for (const { temp, dt } of Object.values(dailyMinTempData)) {
      dailyMinTemp.push({
        x: dt,
        title: 'Min Temp',
        text: `Min Temp: ${temp}°C for ${moment(dt - timezone * 1000).format('DD/MM/YYYY')}`,
      });
    }
    return { dailyMaxTemp, dailyMinTemp };
  }
}
