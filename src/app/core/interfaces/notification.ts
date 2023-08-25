import { Article } from './article';
import { IUser } from './auth';

export type NotificationType = 'emergency' | 'viral' | 'interest';

export interface Notification {
  _id: string;
  type?: NotificationType;
  article: Article;
  users: Array<IUser>;
  time: Date;
}
