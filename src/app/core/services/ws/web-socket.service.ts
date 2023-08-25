import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  connection$: WebSocketSubject<any>;

  constructor(private notificationService: NotificationService) {}

  connect(): Observable<any> {
    if (this.connection$) {
      return this.connection$;
    } else {
      this.connection$ = webSocket(
        `${
          environment.ws_endpoint_mapnews_backend_api
        }?authentication=${localStorage.getItem('token')}`,
      );
      this.connection$.subscribe((data) => {
        this.notificationService.addNotification(data);
      });
      return this.connection$;
    }
  }

  send(data: any) {
    if (this.connection$) {
      const payload = {
        token: localStorage.getItem('token'),
        ...data,
      };
      this.connection$.next(payload);
    }
  }

  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = null;
    }
  }

  ngOnDestroy() {
    this.closeConnection();
  }
}
