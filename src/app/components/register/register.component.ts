import { Component, OnInit } from '@angular/core';
import { FormDirective } from 'src/app/core/directives/form.directive';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormDirective implements OnInit {
  previewImg: string;
  constructor() {
    super();
    this.formType = 'register';
  }

  addImage(event: any) {
    this.form.get('profile_img').setValue(event.target.files[0]);
    this.previewImg = URL.createObjectURL(event.target.files[0]);
  }

  async submit() {
    await this.authService.register(this.form);
  }
}
