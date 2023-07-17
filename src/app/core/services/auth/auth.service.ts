import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api: string = 'api/v1/auth';
  authenticated: boolean = false;
  authStatusSubject: BehaviorSubject<boolean>;
  token: string = '';
  constructor(private service: ServerService, private router: Router) {
    this.token = localStorage.getItem('token');
    this.authenticated = Boolean(this.token);
    this.authStatusSubject = new BehaviorSubject(this.authenticated);
  }

  async register(form: FormGroup) {
    return await this.resolveSubmission(form, 'register');
  }

  async login(form: FormGroup) {
    return await this.resolveSubmission(form, 'login');
  }

  logout() {
    localStorage.removeItem('token');
    this.authenticated = false;
    this.authStatusSubject.next(this.authenticated);
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
      localStorage.setItem('token', res.data);
      console.log(localStorage.getItem('token'));
      this.authStatusSubject.next(this.authenticated);
    }
    return res;
  }
}
