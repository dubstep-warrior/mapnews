import { Component, Input } from '@angular/core';
import { Article } from '../../core/interfaces/article.interface.';
import { StateService } from './../../core/services/state/state.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss'],
})
export class MarkComponent {
  @Input() mark: Partial<Article>;
  @Input() type: string = 'location';
  constructor(public stateService: StateService) {}
}
