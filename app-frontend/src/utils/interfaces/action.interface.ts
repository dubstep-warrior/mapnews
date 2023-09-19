import { ObjectId } from 'mongoose';
import { ArticleCategory } from './article.interface';
import { ILocation } from './location.interface';

export interface Action {
  _id: ObjectId;
  user: ObjectId;
  action: string;
  category: ArticleCategory;
  tags: string[];
  time: Date;
  location?: Partial<ILocation>;
}
