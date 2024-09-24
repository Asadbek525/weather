import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private latitude: number | null = null;
  private longitude: number | null = null;

  private defaultLocation = {
    latitude: 41.2995, // Tashkent latitude
    longitude: 69.2401, // Tashkent longitude
  };

  initializeLocation(): Promise<void> {
    return new Promise(resolve => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            resolve();
          },
          error => {
            console.warn(
              'Error getting location, using fallback (Tashkent):',
              error
            );
            this.useDefaultLocation(); // Use Tashkent as fallback
            resolve(); // Still resolve, but with fallback
          }
        );
      } else {
        console.warn('Geolocation not supported, using Tashkent location.');
        this.useDefaultLocation(); // Use Tashkent if geolocation isn't supported
        resolve();
      }
    });
  }

  // Method to get the stored location (either real or fallback)
  getLocation() {
    if (this.latitude && this.longitude) {
      return { latitude: this.latitude, longitude: this.longitude };
    } else {
      throw new Error('Location not initialized');
    }
  }

  // Store fallback location
  private useDefaultLocation() {
    this.latitude = this.defaultLocation.latitude;
    this.longitude = this.defaultLocation.longitude;
  }
}
