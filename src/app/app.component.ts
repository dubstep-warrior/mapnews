import { Component, OnInit } from '@angular/core';
import { StateService } from './core/services/state/state.service';
import { Base } from './core/directives/base.directive';
import { State } from './core/interfaces/state';

@Component({
  selector: 'app-root',
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
