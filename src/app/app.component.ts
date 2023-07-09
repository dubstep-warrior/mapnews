import { Component, OnInit } from '@angular/core';
import { Article } from './interfaces/article';
import { StateService } from './services/state/state.service';
import { Base } from './directives/base.directive';
import { State } from './interfaces/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends Base implements OnInit {
  title = 'MapNews';
  state: State;
  constructor(private stateService: StateService) {
    super()
  }

  ngOnInit(): void {
      this.stateService.currentStateSubject.pipe(this.takeUntilDestroy()).subscribe((state) => {
        this.state = state
      })
  }
  
  resetState(): void {
    if (['articleDetails'].includes(this.state.name)) return;
    this.stateService.resetState();
  }
}
