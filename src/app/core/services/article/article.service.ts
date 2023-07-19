import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subject } from 'rxjs';
import { StateService } from '../state/state.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../form/form.service';
import { Article } from '../../interfaces/article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  model: Subject<any>;
  api: string = 'api/v1/article';
  constructor(
    private service: ServerService,
    private formService: FormService,
    private stateService: StateService
  ) {
    this.model = new Subject();
  }

  async getArticles() {
    const res = await this.service.get(this.api);
    if (res && res.success) {
      this.model.next({
        type: 'articles',
        data: res.data,
      });
      console.log(res);
    } else {
      console.log(res.error);
    }
  }

  async report(form: FormGroup) {
    let formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      if ((form.value as any)[key]) {
        if (key == 'images') {
          (form.value as any)[key].forEach((image: any) => {
            formData.append(key, image.file);
          });
        } else {
          formData.append(key, JSON.stringify((form.value as any)[key]));
        }
      }
    });
    this.stateService.submittingArticle();
    const res = await this.service.post(this.api, formData);
    if (res && res.success) {
      this.model.next({
        type: 'article',
        data: res.data,
      });
    }
    this.stateService.submitAttempted(res.success);
    return res;
  }

  async resolveArticleLikes(id: string) {  
    const res = await this.service.post(`${this.api}/like`, {articleId: id});
    console.log(res)
    if (res && res.success) {
      console.log('inside success')
      this.model.next({
        type: 'update',
        data: res.data,
      });

      if(this.stateService.state.name == "articleDetails") {
        this.stateService.model.next({name: this.stateService.state.name, data: res.data})
      }
    }
  }
}
