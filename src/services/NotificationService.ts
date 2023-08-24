import * as dotenv from "dotenv";
import Notification from "../models/Notification";
import { Cache } from "../utils/cache.decorator";
dotenv.config();

class NotificationService {
  constructor() {}

  @Cache()
  async getAll(req: any) {
    const { userId } = req.body;
    try {
      console.log("getall service called: ", userId);
      const notifications = await Notification.find({
        users: { $all: userId },
      })
        .sort({ date: -1 })
        .populate("article")
        .lean();
      console.log(notifications);
      return notifications.map((notification: any) => {
        return {
          ...notification,
          article: {
            ...notification.article,
            coordinates: notification.article.location.coordinates,
          },
        };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new NotificationService();
