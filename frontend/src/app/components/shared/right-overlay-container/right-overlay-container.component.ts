import { Component } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-right-overlay-container',
  templateUrl: './right-overlay-container.component.html',
  styleUrls: ['./right-overlay-container.component.scss'],
})
export class RightOverlayContainerComponent {
  constructor(private service: StateService) {}

  exitOverlay(): void {
    this.service.resetState();
  }
}
