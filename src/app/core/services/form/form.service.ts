import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { IResponse } from '../../interfaces/response.interface';
import { IForm, IFormAttribute } from '../../interfaces/form.interface';

export interface ConfigResponse extends IResponse {
  data: IForm[];
}

@Injectable({
  providedIn: 'root',
})
export class FormService {
  private api: string = 'api/v1/config';
  private form: FormGroup;
  private currentFormName: string;
  private formConfigurations: Array<IForm>;
  constructor(private serverService: ServerService) {}

  init() {
    return this.serverService.get(this.api).then((res: ConfigResponse) => {
      if (res && res.success) {
        this.formConfigurations = res.data;
      }
    });
  }

  get formCoordinates() {
    return this.form?.get('location')?.value?.coordinates;
  }

  resetForm(): void {
    this.form.reset();
    this.currentFormName = '';
  }

  resolve(name: string): FormGroup {
    if (this.currentFormName == name) return this.form;
    const formConfig: IForm = this.formConfigurations.find(
      (config) => config.name == name,
    );
    const formGroupObject: any = {};
    Object.keys(formConfig.form).forEach((key) => {
      formGroupObject[key] = this.resolveType(formConfig.form[key]);
    });

    this.form = new FormGroup(formGroupObject);
    this.currentFormName = name;
    return this.form;
  }

  resolveType(formConfigObject: IFormAttribute) {
    const type = formConfigObject.type;
    switch (type) {
      case 'control':
        return new FormControl(formConfigObject.value);
      default:
        return console.error('You have not implemented resolve group TBD soon');
    }
  }
}
