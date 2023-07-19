import { Component, Input, OnInit } from '@angular/core';
import { StateService } from './../../core/services/state/state.service';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { Base } from 'src/app/core/directives/base.directive';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { AuthStatus } from 'src/app/core/interfaces/auth';


@Component({
  selector: 'app-right-overlay',
  templateUrl: './right-overlay.component.html',
  styleUrls: ['./right-overlay.component.scss']
})
export class RightOverlayComponent extends Base implements OnInit {
  @Input() state: any;
  authStatus: AuthStatus;
  constructor(private stateService: StateService, private articleService: ArticleService, private authService: AuthService) {
    super()
  }

  ngOnInit(): void {
    this.authService.authStatusSubject.pipe(this.takeUntilDestroy()).subscribe(status => {
      this.authStatus = status
    })
  }

  exitArticleDetail(): void {
    this.stateService.resetState()
  }

  async clickLikeButton(id: string): Promise<void> { 
    await this.articleService.resolveArticleLikes(id)
  }
}
