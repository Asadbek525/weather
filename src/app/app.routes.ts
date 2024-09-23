import { Routes } from '@angular/router';
import { DailyComponent } from './pages/daily/daily.component';
import { WeeklyComponent } from './pages/weekly/weekly.component';

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
    path: '**',
    redirectTo: 'daily',
  },
];
