import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export interface ValidatorMap {
  [key: string]: (control: AbstractControl) => ValidationErrors | null;
}

const validator: ValidatorMap = {
  required: Validators.required,
  isEmail: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  textBody: Validators.maxLength(280),
  title: Validators.maxLength(50),
};
export default validator;
