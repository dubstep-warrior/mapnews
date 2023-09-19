import { Component } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';
import { State } from 'src/app/core/interfaces/state.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  slideInFromLeft,
  slideInFromRight,
} from 'src/app/core/utilities/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  animations: [slideInFromLeft, slideInFromRight],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  state: State;
  authenticated: boolean;
  constructor(
    private service: StateService,
    private authService: AuthService,
  ) {
    this.service.model.pipe(takeUntilDestroyed()).subscribe((state) => {
      this.state = state;
    });

    this.authService.authStatusSubject
      .pipe(takeUntilDestroyed())
      .subscribe((status) => {
        this.authenticated = status.loggedIn;
      });
  }
}
