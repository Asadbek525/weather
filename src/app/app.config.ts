import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { LocationService } from './core/services/location.service';

export function initializeLocation(locationService: LocationService) {
  return (): Promise<void> => locationService.initializeLocation();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(withInterceptors([baseUrlInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeLocation,
      deps: [LocationService],
      multi: true,
    },
  ],
};
