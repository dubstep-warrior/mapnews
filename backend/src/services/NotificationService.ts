import * as dotenv from "dotenv";
import Notification from "../models/Notification";
import { Cache } from "../utils/decorators/cache.decorator";
import { Request } from "express";
import {
  IFullNotification,
  IFullProcessedNotification,
} from "../utils/interfaces/notification.interface";
dotenv.config();

class NotificationService {
  constructor() {}

  @Cache()
  async getAll(req: Request): Promise<IFullProcessedNotification[]> {
    const { userId } = req.body;
    try {
      const notifications = (await Notification.find({
        users: { $all: userId },
      })
        .sort({ date: 1 })
        .populate("article")
        .lean()) as IFullNotification[];
      return notifications.map((notification) => {
        return {
          ...notification,
          article: {
            ...notification.article,
            coordinates: notification.article.location.coordinates,
          },
        } as IFullProcessedNotification;
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new NotificationService();
