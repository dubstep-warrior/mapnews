import * as dotenv from "dotenv";
import Notification from "../models/Notification";
import { Cache } from "../utils/decorators/cache.decorator";
import { Request } from "express";
import {
  IFullNotification, 
} from "../utils/interfaces/notification.interface";
dotenv.config();

class NotificationService {
  constructor() { }

  @Cache()
  async getAll(req: Request): Promise<IFullNotification[]> {
    const { userId } = req.body;
    const notifications = (await Notification.find({
      users: { $all: userId },
    })
      .sort({ date: 1 })
      .populate({
        path: "article",
        populate: "posted_by",
      })
      .lean()) as IFullNotification[];
    console.log(notifications);
    return notifications
      .filter((notification) => !!notification.article)

  }
}
export default new NotificationService();
