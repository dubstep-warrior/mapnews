import * as dotenv from "dotenv";
import Notification from "../models/Notification";
dotenv.config();

class NotificationService {
  constructor() {}

  async getAll(req: any) {
    const { userId } = req.body;
    try {
      const notifications = await Notification.find({
        users: { $all: userId },
      }).lean();
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
