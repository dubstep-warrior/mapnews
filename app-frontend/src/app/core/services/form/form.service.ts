import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
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

  get formRef(): FormGroup {
    return this.form;
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
    const formGroupObject: Record<string, AbstractControl> = {};
    Object.keys(formConfig.form).forEach((key) => {
      formGroupObject[key] = this.resolveType(formConfig.form[key]);
    });

    this.form = new FormGroup(formGroupObject);
    this.currentFormName = name;
    return this.form;
  };

  private resolveType: (arg: IFormAttribute) => AbstractControl = (
    formConfigObject,
  ) => {
    const type = formConfigObject.type;
    switch (type) {
      case 'array':
        return this.resolveFormArray(formConfigObject);
      case 'group':
        return this.resolveFormGroup(formConfigObject);
      default:
        return new FormControl(
          formConfigObject.value,
          formConfigObject?.validators?.map(
            (validatorKey) => validator[validatorKey],
          ) ?? [],
        );
    }
  };

  private resolveFormGroup: (arg: IFormAttribute) => FormGroup = (
    formConfigObject,
  ) => {
    const formGroupObject: any = {};
    Object.keys(formConfigObject.value).forEach((key) => {
      formGroupObject[key] = this.resolveType(formConfigObject.value[key]);
    });
    return new FormGroup(
      formGroupObject,
      formConfigObject?.validators?.map(
        (validatorKey) => validator[validatorKey],
      ) ?? [],
    );
  };

  private resolveFormArray: (arg: IFormAttribute) => FormArray = (
    formConfigObject,
  ) => {
    return new FormArray(
      Object.keys(formConfigObject.value).map((key) =>
        this.resolveType(formConfigObject.value[key]),
      ),
      formConfigObject?.validators?.map(
        (validatorKey) => validator[validatorKey],
      ) ?? [],
    );
  };
}
