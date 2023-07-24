import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthStatus, IUser } from '../../interfaces/auth';
import { WebSocketService } from '../ws/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api: string = 'api/v1/auth';
  authenticated: boolean = false;
  authStatusSubject: BehaviorSubject<AuthStatus>;
  token: string = '';
  user: IUser | null;
  constructor(
    private service: ServerService,
    private wsService: WebSocketService,
  ) {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem(this.token)) as IUser;
    this.authenticated = Boolean(this.token && this.user);
    if (this.authenticated) this.wsService.connect();
    this.authStatusSubject = new BehaviorSubject({
      loggedIn: this.authenticated,
      id: this.user?._id ?? '',
    } as AuthStatus);
  }

  async register(form: FormGroup) {
    return await this.resolveSubmission(form, 'register');
  }

  async login(form: FormGroup) {
    return await this.resolveSubmission(form, 'login');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem(this.token);
    this.token = '';
    this.user = null;
    this.authenticated = false;
    this.wsService.closeConnection();
    this.authStatusSubject.next({ loggedIn: this.authenticated });
  }

  async resolveSubmission(form: FormGroup, action: string) {
    let formData: any;
    if (action == 'register') {
      formData = new FormData();
      Object.keys(form.value).forEach((key) => {
        if ((form.value as any)[key]) {
          formData.append(key, (form.value as any)[key]);
        }
      });
    } else {
      formData = form.value;
    }
    const res = await this.service.post(`${this.api}/${action}`, formData);
    if (res && res.success) {
      this.authenticated = true;
      this.token = res.data;
      console.log(res);
      // console.log(res)
      localStorage.setItem('token', res.data.token);
      localStorage.setItem(res.data.token, JSON.stringify(res.data.user));
      this.wsService.connect();
      console.log(localStorage.getItem('token'));
      this.authStatusSubject.next({
        loggedIn: this.authenticated,
        id: res.data.user._id,
      });
    }
    return res;
  }
}
