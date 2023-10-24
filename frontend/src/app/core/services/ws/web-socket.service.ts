import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notification } from '../../interfaces/notification.interface';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private connection$: WebSocketSubject<any>;
  notificationSubject: Subject<Notification> = new Subject<Notification>();
  constructor() {}

  connect: () => Observable<any> = () => {
    if (this.connection$) {
      return this.connection$;
    } else {
      this.connection$ = webSocket(
       {
        url:  `${
          environment.ws_endpoint_mapnews_backend_api
        }?authentication=${localStorage.getItem('token')}`,
        openObserver: {
          next: () => {
            console.log('[WebSocket] connection established');
          }
        },
      closeObserver: {
          next: () => {
            console.log('[WebSocket] connection closed, reconnecting...');
            this.closeConnection();
            if(!!localStorage.getItem('token')) {
              this.connect();
            } 
          }
      },
       }
      );
      this.connection$.subscribe((data) => {
        console.log('notification received on frontend', data)
        this.notificationSubject.next(data);
      }); 
      return this.connection$;
    }
  };
  

  send: (args: Record<string, any>) => void = (data) => {
    if (this.connection$) {
      const payload = {
        token: localStorage.getItem('token'),
        ...data,
      };
      this.connection$.next(payload);
    }
  };

  closeConnection: () => void = () => {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  };

  ngOnDestroy: () => void = () => {
    this.closeConnection();
  };
}
