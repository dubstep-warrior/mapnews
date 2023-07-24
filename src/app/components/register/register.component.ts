import { Component, OnInit } from '@angular/core';
import { FormDirective } from 'src/app/core/directives/form.directive';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends FormDirective implements OnInit {
  previewImg: string;
  authenticated: boolean = false;
  constructor() {
    super();
    this.formType = 'register';
  }

  override ngOnInit(): void {
    this.authService.authStatusSubject
      .pipe(this.takeUntilDestroy())
      .subscribe((status) => {
        this.authenticated = status.loggedIn;
        console.log(status);
      });

    super.ngOnInit();
  }

  addImage(event: any) {
    this.form.get('profile_img').setValue(event.target.files[0]);
    this.previewImg = URL.createObjectURL(event.target.files[0]);
  }

  async submit() {
    const res = await this.authService.register(this.form);
    console.log(res);
  }
}
