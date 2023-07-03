import { Component, Input, OnInit } from '@angular/core';
import { Base } from 'src/app/directives/base.directive';
import { Article } from 'src/app/interfaces/article';
import { State } from 'src/app/interfaces/state';
import { StateService } from 'src/app/services/state/state.service';

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
      this.service.currentStateSubject.pipe(this.takeUntilDestroy()).subscribe((state) => {
        this.currentState = state
      })
  }
}
