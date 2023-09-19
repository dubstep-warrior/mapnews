import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/core/interfaces/article.interface.';
import { AuthStatus } from 'src/app/core/interfaces/auth.interface';
import { State } from 'src/app/core/interfaces/state.interface';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent {
  @Input() article: Article;
  @Input() state: State;
  @Input() authStatus: AuthStatus;
  favouriteActive: boolean = false;

  @Output() resolveLike = new EventEmitter<string>();

  clickLikeButton(id: string) {
    this.resolveLike.emit(id);
  }
}
