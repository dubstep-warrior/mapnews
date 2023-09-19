import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { WebSocketService } from '../ws/web-socket.service';
import { ILocation } from '../../interfaces/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private _currentLocation: ILocation;
  mouseLocationCoordinates: Subject<ILocation> = new Subject();
  constructor(private ws: WebSocketService) {}

  init: () => Promise<ILocation> = async () => {
    const data = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    this._currentLocation = {
      longitude: data.coords.longitude,
      latitude: data.coords.latitude,
    };

    return this._currentLocation;
  };

  get currentLocation(): ILocation {
    return this._currentLocation;
  }

  getLocation: () => Observable<ILocation> = () => {
    return new Observable((observer: Observer<ILocation>) => {
      navigator.geolocation.watchPosition(
        (pos) => {
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
  };

  setMouseCoordinates: (args: ILocation) => void = (coordinates) => {
    this.mouseLocationCoordinates.next(coordinates);
  };
}
