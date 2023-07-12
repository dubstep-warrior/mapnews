import { Component, Input } from '@angular/core';
import { Article } from './../../core/interfaces/article';
import { StateService } from './../../core/services/state/state.service';

@Component({
  selector: 'app-mark',
  templateUrl: './mark.component.html',
  styleUrls: ['./mark.component.scss']
})
export class MarkComponent {
  @Input() article: Article = {} as Article; 
  constructor(public stateService: StateService){

  }
}
