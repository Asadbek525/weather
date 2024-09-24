import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../core/services/weather.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { DailyResponse } from '../../shared/models/weather.model';
import moment from 'moment';
import { BehaviorSubject, debounceTime, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [BaseChartDirective, AsyncPipe],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.scss',
})
export class DailyComponent implements OnInit, OnDestroy {
  lineChartData: ChartConfiguration<'line'>['data'] = {
    datasets: [],
    labels: [],
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperature(°C)',
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };
  cnt$ = new BehaviorSubject<number>(7);
  cityName = '';

  constructor(private weatherService: WeatherService) {}

  updateCnt(cnt: number) {
    this.cnt$.next(cnt);
  }

  ngOnInit(): void {
    this.subscribeToCnt();
    this.cnt$.next(7);
  }

  ngOnDestroy(): void {
    this.cnt$.complete();
    this.cnt$.unsubscribe();
  }

  private subscribeToCnt() {
    this.cnt$
      .pipe(
        debounceTime(300),
        switchMap(cnt => this.weatherService.getDailyForecast(cnt))
      )
      .subscribe(res => {
        if (res) {
          this.lineChartData = this.processDailyData(res.list);
          this.cityName = res.city.name;
        }
      });
  }

  private processDailyData(
    data: DailyResponse['list']
  ): ChartConfiguration<'line'>['data'] {
    const minTempData = data.map(item => {
      return item.temp.min;
    });
    const maxTempData = data.map(item => {
      return item.temp.max;
    });
    const tempData = data.map(item => {
      return item.temp.day;
    });
    const morningTempData = data.map(item => {
      return item.temp.morn;
    });
    const eveningTempData = data.map(item => {
      return item.temp.eve;
    });
    const nightTempData = data.map(item => {
      return item.temp.night;
    });
    const labels = data.map(item => {
      return moment(item.dt * 1000).format('DD MMM');
    });
    return {
      datasets: [
        {
          data: minTempData,
          label: 'Min Temp',
          backgroundColor: 'blue',
          tension: 0.2,
          borderColor: 'blue',
        },
        {
          data: maxTempData,
          label: 'Max Temp',
          backgroundColor: 'red',
          tension: 0.2,
          borderColor: 'red',
        },
        {
          data: tempData,
          label: 'Day Temp',
          backgroundColor: 'green',
          tension: 0.2,
          borderColor: 'green',
        },
        {
          data: morningTempData,
          label: 'Morning Temp',
          backgroundColor: 'yellow',
          tension: 0.2,
          borderColor: 'yellow',
        },
        {
          data: eveningTempData,
          label: 'Evening Temp',
          backgroundColor: 'orange',
          tension: 0.2,
          borderColor: 'orange',
        },
        {
          data: nightTempData,
          label: 'Night Temp',
          backgroundColor: 'purple',
          tension: 0.2,
          borderColor: 'purple',
        },
      ],
      labels,
    };
  }
}
