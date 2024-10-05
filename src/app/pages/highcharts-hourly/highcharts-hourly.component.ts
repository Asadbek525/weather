import { Component } from '@angular/core';
import { WindRoseComponent } from './wind-rose/wind-rose.component';
import { HighchartsHourlyStore } from './store/highcharts-hourly.store';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@Component({
  selector: 'app-highcharts-hourly',
  standalone: true,
  imports: [WindRoseComponent, WeatherChartComponent],
  templateUrl: './highcharts-hourly.component.html',
  styleUrl: './highcharts-hourly.component.scss',
  providers: [HighchartsHourlyStore],
})
export class HighchartsHourlyComponent {}
