import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subject } from 'rxjs';
import { StateService } from '../state/state.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  model: Subject<any>;
  api: string = 'api/v1/articles'
  constructor(
    private service: ServerService,
    private stateService: StateService
  ) {
    this.model = new Subject();
  }

  async getArticles() {
    const res = await this.service.get(this.api);
    if (res && res.success) {
      this.model.next(res.data);
      console.log(res);
    } else {
      console.log(res.error);
    }
  }

  async report(form: FormGroup) {
    let formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      if ((form.value as any)[key])
        formData.append(key, (form.value as any)[key]);
    });
    const res = await this.service.post(this.api, form.value); 
    console.log(res)
  }
}
