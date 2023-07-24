import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}
  mouseLocationCoordinates: Subject<any> = new Subject();

  getLocation(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      navigator.geolocation.watchPosition((pos) => {
        console.log('change detected');
        observer.next(pos.coords);
      });
    });
  }

  setMouseCoordinates(coordinates: any): any {
    this.mouseLocationCoordinates.next(coordinates);
  }
}
