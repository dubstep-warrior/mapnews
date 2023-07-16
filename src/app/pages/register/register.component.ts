import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormService } from 'src/app/core/services/form/form.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  previewImg: string;
  constructor(private service: AuthService, private formService: FormService) {

  }

  ngOnInit(): void {
      this.form = this.formService.resolve('register')
  }

  addImage(event: any) {
    this.form.get('profile_img').setValue(event.target.files[0])
    this.previewImg = URL.createObjectURL(event.target.files[0])
  }

  async submit() {
    const res = await this.service.register(this.form);
    console.log(res);
  }
}
