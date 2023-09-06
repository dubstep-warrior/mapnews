import { Component, OnInit } from '@angular/core';
import { AuthStatus } from 'src/app/core/interfaces/auth.interface';
import { FormDirective } from 'src/app/core/directives/form.directive';

@Component({
  selector: 'app-right-overlay',
  templateUrl: './right-overlay.component.html',
  styleUrls: ['./right-overlay.component.scss'],
})
export class RightOverlayComponent extends FormDirective implements OnInit {
  authStatus: AuthStatus;

  constructor() {
    super();
  }

  override ngOnInit(): void {
    this.authService.authStatusSubject
      .pipe(this.takeUntilDestroy())
      .subscribe((status) => {
        this.authStatus = status;
      });
    if (['search'].includes(this.state.name)) {
      this.formType = 'search';
      super.ngOnInit();
    }
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
