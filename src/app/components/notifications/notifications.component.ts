import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Notification,
  NotificationType,
} from 'src/app/core/interfaces/notification';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notificationMessages: { [TYPE in NotificationType]: string } = {
    emergency: 'An emergency was reported in your area:',
    viral: 'This article is garnering attention in your area:',
    interest: 'You might be interested in this one:',
  };

  notifications$: Observable<Notification[]>;
  constructor(
    private service: NotificationService,
    private stateService: StateService,
    private articleService: ArticleService,
  ) {
    this.notifications$ = this.service.model;
  }

  selectNotification: (arg: Notification) => void = (notification) => {
    this.articleService.addNotificationArticle(notification.article);
    this.stateService.resolveState('articleDetails', notification.article);
  };
}
