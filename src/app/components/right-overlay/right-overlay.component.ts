import { Component, OnInit } from '@angular/core';
import { AuthStatus } from 'src/app/core/interfaces/auth';
import { FormDirective } from 'src/app/core/directives/form.directive';

@Component({
  selector: 'app-right-overlay',
  templateUrl: './right-overlay.component.html',
  styleUrls: ['./right-overlay.component.scss'],
})
export class RightOverlayComponent extends FormDirective implements OnInit {
  authStatus: AuthStatus; 

  constructor( 
  ) {
    super();
    this.formType = 'search'
  }

  override ngOnInit(): void {
    this.authService.authStatusSubject
      .pipe(this.takeUntilDestroy())
      .subscribe((status) => {
        this.authStatus = status;
      });
    super.ngOnInit();
  }

  async clickLikeButton(id: string): Promise<void> {
    await this.articleService.resolveArticleLikes(id);
  } 

  async submit(): Promise<void> {
    console.log(event)
    console.log('submit search')
    const res = await this.articleService.getArticles('search', this.form.value)
    console.log(res)
    // TODO reset form when successful lmao
  }
}
