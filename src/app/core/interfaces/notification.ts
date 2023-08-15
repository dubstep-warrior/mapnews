import { Article } from './article';
import { IUser } from './auth';

export interface Notification {
  _id: String;
  type?: String;
  article: Article;
  users: Array<IUser>;
  time: Date;
}
