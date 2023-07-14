import { Component, Input } from '@angular/core';
import { StateService } from './../../core/services/state/state.service';


@Component({
  selector: 'app-right-overlay',
  templateUrl: './right-overlay.component.html',
  styleUrls: ['./right-overlay.component.scss']
})
export class RightOverlayComponent {
  @Input() state: any;
  liked: boolean = false

  constructor(private stateService: StateService) {

  }

  exitArticleDetail(): void {
    this.stateService.resetState()
  }
}
