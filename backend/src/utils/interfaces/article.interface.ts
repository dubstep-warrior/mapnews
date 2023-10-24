import { ObjectId } from "mongoose";
import { ILocation } from "./location.interface";

export type ArticleCategory =
  | "emergency"
  | "crime"
  | "event"
  | "observation"
  | "recommendation";

export interface IArticle {
  category: ArticleCategory;
  location: ILocation;
  _id: ObjectId;
  title: string;
  description: string;
  images?: string[];
  tags?: Array<string>;
  time: Date;
  posted_by?: ObjectId;
  likes?: ObjectId[];
}
 

export type ArticleParams = Omit<IArticle, "_id" | "images" | "time" | "likes">;
