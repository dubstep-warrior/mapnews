import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Notification } from '../../interfaces/notification.interface';
import { BehaviorSubject, tap, filter } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthStatus } from '../../interfaces/auth.interface';
import { WebSocketService } from '../ws/web-socket.service';

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
  private authStatus: AuthStatus;
  constructor(
    private service: ServerService,
    private authService: AuthService,
    private wsService: WebSocketService,
  ) {
    this.authService.authStatusSubject
      .pipe(
        tap((status) => {
          this.authStatus = status;
        }),
        filter((status) => status.loggedIn),
      )
      .subscribe(() => {
        this.pullNotifications();
      });
    this.wsService.notificationSubject.subscribe((notification) =>
      this.addNotification(notification),
    );
  }

  public get unviewedCount(): number {
    const diff = this.data.length - this.seen.size;
    return diff < 0 ? 0 : diff;
  }

  seenNotification: () => void = () => {
    this.seen = new Set(this.data.map((notification) => notification._id));
    localStorage.setItem(
      `seen-notifications/${this.authStatus.id}`,
      JSON.stringify(this.data.map((notification) => notification._id)),
    );
  };

  pullNotifications: () => Promise<void> = async () => {
    const res = await this.service.get(this.api);
    if (
      localStorage.getItem(`seen-notifications/${this.authStatus.id}`) !== null
    ) {
      this.seen = new Set(
        JSON.parse(
          localStorage.getItem(`seen-notifications/${this.authStatus.id}`),
        ),
      );
    }
    if (res && res.success) {
      this.data = res.data;
      this.model.next(this.data);
    }
  };

  private addNotification: (args: Notification) => void = (notification) => {
    this.data.push(notification);
    this.model.next(this.data);
  };
}
