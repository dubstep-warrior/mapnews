import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api: string = 'api/v1/auth';
  authenticated: boolean = false;
  authStatusSubject: Subject<any>;
  constructor(private service: ServerService, private router: Router) {
    this.authStatusSubject = new Subject();
  }

  async register(form: FormGroup) {
    await this.resolveSubmission(form, 'register');
  }

  async login(form: FormGroup) {
    await this.resolveSubmission(form, 'login');
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
      formData = form.value
    }
    console.log(form.value);
    const res = await this.service.post(`${this.api}/${action}`, formData);
    if (res && res.success) {
      this.authenticated = true;
      localStorage.setItem('token', res.data);
      this.router.navigate(['/']); 
      this.authStatusSubject.next(this.authenticated);
    }
     
  }
}
