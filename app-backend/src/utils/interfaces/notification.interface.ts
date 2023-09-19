import { ObjectId } from "mongoose";
import { IArticle, IProcessedArticle } from "./article.interface";

type TNotificationType = "emergency" | "viral" | "interest";

export interface INotification {
  _id: ObjectId;
  type: TNotificationType;
  article: ObjectId;
  time: Date;
  users: ObjectId[];
}

export type IFullNotification = INotification & {
  article: IArticle;
};

export type IFullProcessedNotification = IFullNotification & {
  article: IProcessedArticle;
};
