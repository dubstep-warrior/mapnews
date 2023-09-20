import { Component, Input } from '@angular/core';
import { State } from '../../core/interfaces/state.interface';
import { StateService } from './../../core/services/state/state.service';
import { slideUp } from 'src/app/core/utilities/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-article-box',
  animations: [slideUp],
  templateUrl: './article-box.component.html',
  styleUrls: ['./article-box.component.scss'],
})
export class ArticleBoxComponent {
  currentState: State;
  @Input() fromMap: boolean = true;
  constructor(public service: StateService) {
    this.service.model.pipe(takeUntilDestroyed()).subscribe((state) => {
      this.currentState = state;
    });
  }
}
