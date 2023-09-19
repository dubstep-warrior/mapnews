import { Directive, Input, Inject } from '@angular/core';
import { FormService } from '../services/form/form.service';
import { FormGroup } from '@angular/forms';
import { AppInjector } from 'src/app/app.module';
import { ArticleService } from '../services/article/article.service';
import { AuthService } from '../services/auth/auth.service';
import { LocationService } from '../services/location/location.service';
import { StateService } from '../services/state/state.service';
import { State } from '../interfaces/state.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type FormType = 'search' | 'addArticle' | 'register' | 'login';

@Directive({
  selector: '[appForm]',
})
export class FormDirective {
  @Input() state: State;
  form: FormGroup;

  formService: FormService;
  articleService: ArticleService;
  authService: AuthService;
  locationService: LocationService;
  stateService: StateService;

  formType: FormType;
  constructor(@Inject(String) formType: FormType) {
    this.formService = AppInjector.get(FormService);
    this.articleService = AppInjector.get(ArticleService);
    this.authService = AppInjector.get(AuthService);
    this.locationService = AppInjector.get(LocationService);
    this.stateService = AppInjector.get(StateService);
    this.formType = formType;
    this.form = this.formService.resolve(formType);
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (['register', 'login'].includes(formType))
        this.authService.clearError();
    });
  }

  addTag(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.value.trim()) return;
    this.form
      .get('tags')
      .setValue([...this.form.get('tags').value, input.value]);
  }
}
