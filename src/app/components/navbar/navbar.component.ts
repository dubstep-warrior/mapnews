import { Component, Input, OnChanges } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StateService } from 'src/app/core/services/state/state.service';
import {
  slideInFromLeft,
  slideInFromRight,
} from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-navbar',
  animations: [slideInFromLeft, slideInFromRight],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnChanges {
  selected = 'Relevant';
  menu = ['Relevant', 'New', 'Favourites', 'My Posts'];
  @Input() authenticated: boolean = false;

  constructor(
    private service: StateService,
    private authService: AuthService,
    private articleService: ArticleService
  ) {}

  ngOnChanges() {}

  addArticle() {
    this.service.addArticle();
  }

  searchArticle() {
    this.service.searchArticle();
  }

  logout() {
    this.authService.logout();
  }

  async resolveMenuOption(item: string): Promise<void> {
    const key = item.toLowerCase().replaceAll(' ', '');
    const res = await this.articleService.getArticles(key);
    console.log(res)
  }
}
