import { Component, Input } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';
 

@Component({
  selector: 'app-left-overlay',
  templateUrl: './left-overlay.component.html',
  styleUrls: ['./left-overlay.component.scss']
})
export class LeftOverlayComponent {
  @Input() state: any;
  liked: boolean = false

  constructor(private stateService: StateService) {

  }

  exitOverlay(): void {
    this.stateService.resetState()
  }
}
