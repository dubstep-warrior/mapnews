import { Component, Input, OnInit } from '@angular/core';
import { Base } from 'src/app/core/directives/base.directive';
import { State } from '../../core/interfaces/state.interface';
import { StateService } from './../../core/services/state/state.service';
import { slideUp } from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-article-box',
  animations: [slideUp],
  templateUrl: './article-box.component.html',
  styleUrls: ['./article-box.component.scss'],
})
export class ArticleBoxComponent extends Base implements OnInit {
  currentState: State;
  @Input() fromMap: boolean = true;
  constructor(public service: StateService) {
    super();
  }

  ngOnInit(): void {
    this.service.model.pipe(this.takeUntilDestroy()).subscribe((state) => {
      this.currentState = state;
    });
  }
}
