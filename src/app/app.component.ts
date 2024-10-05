import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocationService } from './core/services/location.service';
import { HighchartsConfigService } from './core/services/highcharts-config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private locationService: LocationService,
    private highchartsConfigService: HighchartsConfigService
  ) {}

  async ngOnInit() {
    await this.locationService.initializeLocation();
  }
}
