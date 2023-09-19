import { Component } from '@angular/core';
import { FormDirective } from 'src/app/core/directives/form.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormDirective {
  previewImg: string;
  constructor() {
    super('register');
  }

  addImage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.form.get('profile_img').setValue(input.files[0]);
    this.previewImg = URL.createObjectURL(input.files[0]);
  }

  async submit() {
    await this.authService.register(this.form);
  }
}
