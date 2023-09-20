import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-access-container',
  templateUrl: './access-container.component.html',
  styleUrls: ['./access-container.component.scss'],
})
export class AccessContainerComponent {
  constructor(public service: AuthService) {}
}
