import { Component, OnInit } from '@angular/core';
import { StateService } from './core/services/state/state.service';
import { Base } from './core/directives/base.directive';
import { State } from './core/interfaces/state';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-root',
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
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Base implements OnInit {
  title = 'MapNews';
  state: State;
  constructor(private stateService: StateService) {
    super();
  }

  ngOnInit(): void {
    this.stateService.model.pipe(this.takeUntilDestroy()).subscribe((state) => {
      this.state = state;
      console.log(this.state.name);
    });
  }

  resetState(): void {
    if (
      [
        'articleDetails',
        'addArticleLocation',
        'submittingArticle',
        'submitAttempted',
      ].includes(this.state?.name)
    )
      return;
    this.stateService.resetState();
  }
}
