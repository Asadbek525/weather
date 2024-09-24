import { Component } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss',
})
export class DailyComponent {
  constructor(private weatherService: WeatherService) {
    this.weatherService.getDailyForecast().subscribe(res => {
      console.log(res);
    });
  }
}
