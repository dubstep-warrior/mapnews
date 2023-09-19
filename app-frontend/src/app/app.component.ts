import { Component } from '@angular/core';
import { StateService } from './core/services/state/state.service';
import { State } from './core/interfaces/state.interface';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { slider } from './core/utilities/animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slider],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'MapNews';
  state: State;
  currentURL: string;
  constructor(
    private stateService: StateService,
    private router: Router,
  ) {
    this.stateService.model.pipe(takeUntilDestroyed()).subscribe((state) => {
      this.state = state;
    });

    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        this.currentURL = (event as NavigationEnd)['url'];
      });
  }

  resetState(): void {
    if (
      [
        'articleDetails',
        'addArticleLocation',
        'submittingArticle',
        'submitAttempted',
      ].includes(this.state?.name) ||
      ['/auth/login', '/auth/register'].includes(this.currentURL)
    )
      return;
    this.stateService.resetState();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
