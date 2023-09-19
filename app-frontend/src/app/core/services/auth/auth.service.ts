import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthStatus, IUser } from '../../interfaces/auth.interface';
import { WebSocketService } from '../ws/web-socket.service';
import { NotificationService } from '../notification/notification.service';
import { filter } from 'rxjs/operators';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api: string = 'api/v1/auth';
  authenticated: boolean = false;
  authStatusSubject: BehaviorSubject<AuthStatus>;
  token: string = '';
  user: IUser | null;
  private _error: string;
  constructor(
    private service: ServerService,
    private wsService: WebSocketService,
    private router: Router,
  ) {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem(this.token)) as IUser;
    this.authenticated = Boolean(this.token && this.user);
    if (this.authenticated) {
      this.afterAuthInit();
    }
    this.authStatusSubject = new BehaviorSubject({
      loggedIn: this.authenticated,
      id: this.user?._id ?? '',
    } as AuthStatus);
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this._error = '';
      });
  }

  register: (arg: FormGroup) => Promise<IResponse> = async (form) => {
    return await this.resolveSubmission(form, 'register');
  };

  login: (arg: FormGroup) => Promise<IResponse> = async (form) => {
    return await this.resolveSubmission(form, 'login');
  };

  logout: () => void = () => {
    localStorage.removeItem('token');
    localStorage.removeItem(this.token);
    this.token = '';
    this.user = null;
    this.authenticated = false;
    this.wsService.closeConnection();
    this.authStatusSubject.next({ loggedIn: this.authenticated });
  };

  resolveSubmission: (form: FormGroup, action: string) => Promise<IResponse> =
    async (form, action) => {
      let formData: FormData;
      if (action == 'register') {
        formData = new FormData();
        Object.keys(form.value).forEach((key) => {
          if (form.value[key]) {
            formData.append(key, form.value[key]);
          }
        });
      } else {
        formData = form.value;
      }
      const res = await this.service.post(`${this.api}/${action}`, formData);
      if (res && res.success) {
        this.authenticated = true;
        this.token = res.data;
        this.user = res.data.user;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem(res.data.token, JSON.stringify(this.user));
        this.afterAuthInit();
        this.authStatusSubject.next({
          loggedIn: this.authenticated,
          id: this.user._id,
        });
      }
      if (res && !res.success && res.error) {
        console.log(res);
        this._error = res.error;
      }
      return res;
    };

  get error() {
    return this._error;
  }

  clearError: () => void = () => {
    this._error = '';
  };

  private afterAuthInit: () => void = () => {
    this.wsService.connect();
  };
}
