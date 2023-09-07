import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Notification } from '../../interfaces/notification.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  model: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>(
    [],
  );
  private data: Notification[] = [];
  private api: string = 'api/v1/notification';
  private seen: Set<string> = new Set();
  constructor(private service: ServerService) {}

  public get unviewedCount(): number {
    const diff = this.data.length - this.seen.size;
    return diff < 0 ? 0 : diff;
  }

  seenNotification: () => void = () => {
    this.seen = new Set(this.data.map((notification) => notification._id));
    localStorage.setItem(
      'seen-notifications',
      JSON.stringify(this.data.map((notification) => notification._id)),
    );
  };

  addNotification: (args: Notification) => void = (notification) => {
    this.data.push(notification);
    this.model.next(this.data);
  };

  pullNotifications: () => Promise<void> = async () => {
    const res = await this.service.get(this.api);
    if (localStorage.getItem('seen-notifications') !== null) {
      this.seen = new Set(
        JSON.parse(localStorage.getItem('seen-notifications')),
      );
    }
    if (res && res.success) {
      this.data = res.data;
      this.model.next(this.data);
    }
  };
}
