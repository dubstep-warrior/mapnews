import { Component, Input } from '@angular/core';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { StateService } from 'src/app/core/services/state/state.service';
import {
  slideInFromLeft,
  slideInFromRight,
} from 'src/app/core/utilities/animations';
import GeneralConfig from './../../core/configs/general.config.json';

@Component({
  selector: 'app-navbar',
  animations: [slideInFromLeft, slideInFromRight],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  selected = 'relevant';
  menu = GeneralConfig.menu;
  @Input() authenticated: boolean = false;
  mobileMenu: boolean = false;

  constructor(
    private service: StateService,
    private authService: AuthService,
    public articleService: ArticleService,
    public notificationService: NotificationService,
  ) {}

  addArticle() {
    this.mobileMenu = false;
    this.service.resolveState('addArticle');
  }

  openNotifications() {
    this.mobileMenu = false;
    this.notificationService.seenNotification();
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
    await this.articleService.getArticles(key);
  }

  resolveMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
    this.service.resetState();
  }
}
