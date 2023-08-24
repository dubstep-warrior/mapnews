import { ILocation } from "./location";

export type ArticleCategory = "emergency" | "crime" | "event" | "observation" | "recommendation"
 
export interface Article {
  category: ArticleCategory;
  coordinates: Array<number>;
  _id: string;
  title: string;
  description: string;
  tags?: Array<string>;
}

export interface GetArticleParams extends ILocation {
  category?: ArticleCategory,
  tags?: string[]
}

