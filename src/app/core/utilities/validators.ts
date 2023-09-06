import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export interface ValidatorMap {
  [key: string]: ValidatorFn;
}

const validator: ValidatorMap = {
  required: Validators.required,
  isEmail: Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
  textBody: Validators.maxLength(280),
  title: Validators.maxLength(50),
  location: (control) => { 
    const isEmpty = !(control.value.coordinates.length == 2)
    return isEmpty ? {location: {value: control.value}} : null;
  }
};
export default validator;


export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}