import { Pipe, PipeTransform } from '@angular/core';
import { NotificationType } from '../../interfaces/notification';
import * as NotificationMessages from './../../configs/notification.messages.json';

@Pipe({
  name: 'notificationMessage',
})
export class NotificationMessagePipe implements PipeTransform {
  transform(value: string, type: NotificationType, ...args: unknown[]): string {
    return `${NotificationMessages[type]} ${value}`;
  }
}
