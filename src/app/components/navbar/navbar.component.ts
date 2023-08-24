import { Component, Input, OnInit } from '@angular/core';
import { Base } from 'src/app/core/directives/base.directive';
import { State } from 'src/app/core/interfaces/state';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
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
export class NavbarComponent extends Base implements OnInit {
  selected = 'Relevant';
  menu = ['Relevant', 'New', 'Favourites', 'My Posts'];
  @Input() authenticated: boolean = false;
  articleState: string = 'relevant';
  mobileMenu: boolean = false;

  unviewedCount: number;

  constructor(
    private service: StateService,
    private authService: AuthService,
    private articleService: ArticleService,
    private notificationService: NotificationService,
  ) {
    super();
    this.unviewedCount = this.notificationService.unviewedCount;
    console.log('UNVIEWED COUNT', this.unviewedCount);
  }

  ngOnInit(): void {
    // this.articleService.model
    //   .pipe(this.takeUntilDestroy())
    //   .subscribe((data) => {
    //     if ('state' in data) {
    //       this.articleState = data.state;
    //     }
    //   });
  }

  addArticle() {
    this.mobileMenu = false;
    this.service.resolveState('addArticle');
  }

  openNotifications() {
    this.mobileMenu = false;
    this.service.resolveState(
      this.service.state.name == 'notifications' ? 'neutral' : 'notifications',
    );
  }

  searchArticle() {
    this.mobileMenu = false;
    this.service.resolveState(
      this.service.state.name == 'search' ? 'neutral' : 'search',
    );
  }

  logout() {
    this.authService.logout();
  }

  async resolveMenuOption(item: string): Promise<void> {
    this.mobileMenu = false;
    this.selected = item;
    this.service.resetState();
    const key = item.toLowerCase().replaceAll(' ', '');
    const res = await this.articleService.getArticles(key);
    console.log(res);
  }

  resolveMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
    this.service.resetState();
  }
}
