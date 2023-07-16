import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  api: string = 'api/v1/config'; 
  form: FormGroup;
  formObjSchema: any = {};
  formConfigurations: Array<any>;
  constructor(private serverService: ServerService) {
  
  }

  retrieveFormConfig() {
    return this.serverService.get(this.api).then((res: any) => {
      if (res && res.success) {
        this.formConfigurations = res.data;
        console.log(this.formConfigurations)
      }
    }); 
  }

  resetForm() { 
    this.form.reset()
    this.formObjSchema = {}
  }

  resolve(name: string) {
    const formConfig: any = this.formConfigurations.find(
      (config) => config.name == name
    );
    const formGroupObject: any = {};
    Object.keys(formConfig.form).forEach((key) => {
      formGroupObject[key] = this.resolveType(formConfig.form[key]);
      this.formObjSchema[key] = formConfig.form[key].value
    });

    this.form = new FormGroup(formGroupObject)
    console.log(this.formObjSchema)
    console.log(this.form)
    return this.form
  }

  resolveType(formConfigObject: any) {
    const type = formConfigObject.type;
    switch (type) {
      case 'control':
        return new FormControl(formConfigObject.value)
      default:
        return console.error("You have not implemented resolve group TBD soon")
    }
  }
}
