import { Directive, OnInit, Input } from '@angular/core';
import { Base } from './base.directive';
import { FormService } from '../services/form/form.service';
import { FormGroup } from '@angular/forms';
import { AppInjector } from 'src/app/app.module';
import { ArticleService } from '../services/article/article.service';
import { AuthService } from '../services/auth/auth.service';
import { LocationService } from '../services/location/location.service';
import { StateService } from '../services/state/state.service';
import { State } from '../interfaces/state';

@Directive({
  selector: '[appForm]',
})
export class FormDirective extends Base implements OnInit {
  @Input() state: State;
  form: FormGroup;

  formService: FormService;
  articleService: ArticleService;
  authService: AuthService;
  locationService: LocationService;
  stateService: StateService;

  formType: 'search' | 'addArticle' | 'register' | 'login';
  constructor() {
    super();
    this.formService = AppInjector.get(FormService);
    this.articleService = AppInjector.get(ArticleService);
    this.authService = AppInjector.get(AuthService);
    this.locationService = AppInjector.get(LocationService);
    this.stateService = AppInjector.get(StateService);
  }

  ngOnInit(): void {
    this.form = this.formService.resolve(this.formType);
    this.form.valueChanges.pipe(this.takeUntilDestroy()).subscribe(() => {
      if (['register', 'login'].includes(this.formType))
        this.authService.clearError();
    });
  }

  addTag(event: any) {
    this.form
      .get('tags')
      .setValue([...this.form.get('tags').value, event.target.value]);
  }
}
