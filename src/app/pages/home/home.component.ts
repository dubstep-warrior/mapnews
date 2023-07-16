import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Base } from 'src/app/core/directives/base.directive';
import { StateService } from 'src/app/core/services/state/state.service';
import { State } from 'src/app/core/interfaces/state';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  animations: [
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('200ms', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('200ms', style({ transform: 'translateX(0%)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('200ms', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends Base implements OnInit {
  state: State;
  authenticated: boolean;
  constructor(private service: StateService, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.service.model.pipe(this.takeUntilDestroy()).subscribe((state) => {
      this.state = state;
      console.log(this.state.name);
    });

    this.authService.authStatusSubject
      .pipe(this.takeUntilDestroy())
      .subscribe((status) => {
        this.authenticated = status;
      });
  }
}
