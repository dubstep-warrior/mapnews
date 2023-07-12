import { Component, Input, OnInit } from '@angular/core';
import { Base } from 'src/app/core/directives/base.directive';
import { Article } from './../../core/interfaces/article';
import { State } from './../../core/interfaces/state';
import { StateService } from './../../core/services/state/state.service';

@Component({
  selector: 'app-article-box',
  templateUrl: './article-box.component.html',
  styleUrls: ['./article-box.component.scss']
})
export class ArticleBoxComponent extends Base implements OnInit{ 
  currentState: State
  constructor(public service: StateService){
    super()
  } 

  ngOnInit(): void {
      this.service.model.pipe(this.takeUntilDestroy()).subscribe((state) => {
        this.currentState = state
      })
  }
}
