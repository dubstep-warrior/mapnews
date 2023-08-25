import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { WebSocketService } from '../ws/web-socket.service';
import { ILocation } from '../../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _currentLocation: ILocation;
  mouseLocationCoordinates: Subject<any> = new Subject();
  constructor(private ws: WebSocketService) {}

  async init(): Promise<ILocation> {
    const data = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    this._currentLocation = {
      longitude: data.coords.longitude,
      latitude: data.coords.latitude,
    };

    return this._currentLocation;
  }

  get currentLocation(): ILocation {
    return this._currentLocation;
  }

  getLocation(): Observable<ILocation> {
    return new Observable((observer: Observer<ILocation>) => {
      navigator.geolocation.watchPosition(
        (pos) => {
          // console.log('change detected');
          // console.log(pos.coords);
          this._currentLocation = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };
          this.ws.send({
            name: 'location',
            data: this._currentLocation,
          });
          observer.next(this._currentLocation);
        },
        () => {},
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    });
  }

  setMouseCoordinates(coordinates: ILocation): void {
    this.mouseLocationCoordinates.next(coordinates);
  }
}
