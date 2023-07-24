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
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error),
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }

  setMouseCoordinates(coordinates: any): any {
    this.mouseLocationCoordinates.next(coordinates);
  }
}
