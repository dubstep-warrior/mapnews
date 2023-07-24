import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('interceptor attempt');
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Token ' + token),
      });
      console.log('intercepted with jwt');
      return next.handle(cloned);
    } else {
      console.log('interceptor failed');
      return next.handle(req);
    }
  }
}
