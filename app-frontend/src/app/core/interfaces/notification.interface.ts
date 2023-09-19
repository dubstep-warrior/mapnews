import { Article } from './article.interface.';
import { IUser } from './auth.interface';

export type NotificationType = 'emergency' | 'viral' | 'interest';

export interface Notification {
  _id: string;
  type?: NotificationType;
  article: Article;
  users: Array<IUser>;
  time: Date;
}
