import { Component, Input } from '@angular/core';
import { State } from '../../core/interfaces/state.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  @Input() tags: Array<string>;
  @Input() currentState: State;
}
