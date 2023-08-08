import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';
import { WebSocketService } from '../ws/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  mouseLocationCoordinates: Subject<any> = new Subject();
  constructor(private ws: WebSocketService) {}

  getLocation(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      navigator.geolocation.watchPosition((pos) => {
        // console.log('change detected');
        // console.log(pos.coords);
        this.ws.send({
          name: 'location',
          data: {
            longtitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          },
        });
        observer.next(pos.coords);
      }, () => {}, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0,
      });
    });
  }

  setMouseCoordinates(coordinates: any): any {
    this.mouseLocationCoordinates.next(coordinates);
  }
}
