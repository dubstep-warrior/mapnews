import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  connection$: WebSocketSubject<any>;  

  constructor() {} 

  connect(): Observable<any> {
    if (this.connection$) {
      return this.connection$;
    } else {
      this.connection$ = webSocket(environment.ws_endpoint_mapnews_backend_api);
      console.log('WS CONNECTION CALLED ', this.connection$)
      this.connection$.subscribe((data) => {
        console.log('web socket data: ', data)
      })
      this.connection$.next('i got in')
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
