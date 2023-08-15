import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ServerService } from '../server/server.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  model: Subject<Notification[]>;
  private data: Notification[];
  private api: string = 'api/v1/notification';
  constructor(private service: ServerService) {}

  addNotification(message: string) {
    const notification = JSON.parse(message);
    this.data.push(notification);
    this.model.next(this.data);
  }

  async pullNotifications() {
    const res = await this.service.get(this.api);
    if (res && res.success) {
      this.data = res.data;
      this.model.next(this.data);
    }
  }
}
