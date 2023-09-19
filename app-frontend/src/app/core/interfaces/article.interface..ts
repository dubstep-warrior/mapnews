import { IUser } from './auth.interface';
import { ILocation } from './location.interface';

export type ArticleCategory =
  | 'emergency'
  | 'crime'
  | 'event'
  | 'observation'
  | 'recommendation';

export interface Article {
  category: ArticleCategory;
  coordinates: Array<number>;
  _id: string;
  title: string;
  description: string;
  tags?: Array<string>;
  likes: string[];
  images: string[];
  time: Date;
  posted_by: IUser;
}

export interface GetArticleParams extends ILocation {
  category?: ArticleCategory;
  tags?: string[];
}
