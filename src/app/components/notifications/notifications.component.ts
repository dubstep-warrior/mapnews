import { Component } from '@angular/core';
import { NotificationType } from 'src/app/core/interfaces/notification';

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
}
