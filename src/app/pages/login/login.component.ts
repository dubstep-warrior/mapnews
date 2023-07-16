import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private service: AuthService, private formService: FormService) {}

  ngOnInit(): void {
    this.form = this.formService.resolve('login');
  }

  async submit() {
    const res = await this.service.login(this.form);
    console.log(res);
  }
}
