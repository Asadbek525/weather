import { Routes } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';
import { WeeklyComponent } from './pages/weekly/weekly.component';
import { HighchartsHourlyComponent } from './pages/highcharts-hourly/highcharts-hourly.component';

export const routes: Routes = [
  {
    path: 'daily',
    component: DailyComponent,
  },
  {
    path: 'weekly',
    component: WeeklyComponent,
  },
  {
    path: 'highcharts-hourly',
    component: HighchartsHourlyComponent,
  },
  {
    path: '**',
    redirectTo: 'daily',
  },
];
