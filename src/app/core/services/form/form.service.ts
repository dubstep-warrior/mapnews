import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';
import { IResponse } from '../../interfaces/response.interface';
import { IForm, IFormAttribute } from '../../interfaces/form.interface';
import validator from '../../utilities/validators';

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

  init: () => Promise<ConfigResponse> = async () => {
    return this.serverService.get(this.api).then((res: IResponse) => {
      if (res && res.success) {
        this.formConfigurations = res.data;
      }
      return res as ConfigResponse;
    });
  };

  get formCoordinates(): number[] {
    return this.form?.get('location')?.value?.coordinates;
  }

  resetForm: () => void = () => {
    this.form.reset();
    this.currentFormName = '';
  };

  resolve: (arg: string) => FormGroup = (name) => {
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
  };

  resolveType: (arg: IFormAttribute) => FormControl | void = (
    formConfigObject,
  ) => {
    const type = formConfigObject.type;
    switch (type) {
      case 'control':
        return new FormControl(
          formConfigObject.value,
          formConfigObject?.validators?.map(
            (validatorKey) => validator[validatorKey],
          ) ?? [],
        );
      default:
        return console.error('You have not implemented resolve group TBD soon');
    }
  };
}
