import { Component } from '@angular/core';
import { AuthStatus } from 'src/app/core/interfaces/auth.interface';
import { FormDirective } from 'src/app/core/directives/form.directive';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-right-overlay',
  templateUrl: './right-overlay.component.html',
  styleUrls: ['./right-overlay.component.scss'],
})
export class RightOverlayComponent extends FormDirective {
  authStatus: AuthStatus;

  constructor() {
    super('search');
    this.authService.authStatusSubject
      .pipe(takeUntilDestroyed())
      .subscribe((status) => {
        this.authStatus = status;
      });
  }
  async clickLikeButton(id: string): Promise<void> {
    await this.articleService.resolveArticleLikes(id);
  }

  async submit(): Promise<void> {
    const res = await this.articleService.getArticles(
      'search',
      this.form.value,
    );
    if (res && res.success) {
      this.formService.resetForm();
      this.stateService.resetState();
    }
  }
}
