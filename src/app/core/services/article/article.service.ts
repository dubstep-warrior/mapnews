import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subject } from 'rxjs';
import { StateService } from '../state/state.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  model: Subject<any>;

  constructor(private service: ServerService, private stateService: StateService) {
    this.model = new Subject();
  }

  async getArticles() {
    const res = await this.service.getNewsArticles();
    if(res && res.success) {
      this.model.next(res.data)
      console.log(res)
    } else {
      console.log(res.error)
    }
  }
}
