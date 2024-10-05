import { Injectable } from '@angular/core';
import Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root',
})
export class HighchartsConfigService {
  constructor() {
    this.setGlobalHighchartsOptions();
  }

  setGlobalHighchartsOptions(): void {
    Highcharts.setOptions({
      credits: {
        enabled: true, // Or false to disable
        href: 'https://amudar.io',
        text: 'amudar.io',
        style: {
          fontSize: '10px',
          color: '#666666',
        },
        position: {
          align: 'right', // Horizontal alignment (left, center, right)
          verticalAlign: 'bottom', // Vertical alignment (top, middle, bottom)
          x: -10, // Horizontal offset
          y: -10, // Vertical offset
        },
      },
    });
  }
}
