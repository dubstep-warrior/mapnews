import { Component } from '@angular/core';
import { FormDirective } from 'src/app/core/directives/form.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends FormDirective {
  constructor() {
    super('login');
  }

  async submit() {
    await this.authService.login(this.form);
  }
}
