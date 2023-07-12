import { Injectable } from '@angular/core';
import { Article } from './../../interfaces/article';
import { Subject } from 'rxjs';
import { State } from './../../interfaces/state'

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { } 
  
  state: State = {name: "neutral"};
  model: Subject<any> = new Subject();

  openArticleDetails(article: Article) {
    this.state.name = 'articleDetails'
    this.state.data = article
    this.stateBroadcast()
  }

  selectArticle(article: Article) {
    this.state.name = 'selectedArticle'
    this.state.data = article
    this.stateBroadcast()
  }

  stateBroadcast() {
    this.model.next(this.state)
  }

  resetState() {
    this.state = {name: "neutral"}
    this.stateBroadcast()
  }
}
