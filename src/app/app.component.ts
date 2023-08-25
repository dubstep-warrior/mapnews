import { Component, OnInit } from '@angular/core';
import { StateService } from './core/services/state/state.service';
import { Base } from './core/directives/base.directive';
import { State } from './core/interfaces/state';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { fader, slider } from './core/utilities/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slider],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Base implements OnInit {
  title = 'MapNews';
  state: State;
  currentURL: string;
  constructor(
    private stateService: StateService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.stateService.model.pipe(this.takeUntilDestroy()).subscribe((state) => {
      this.state = state;
    });

    this.router.events
      .pipe(
        this.takeUntilDestroy(),
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
