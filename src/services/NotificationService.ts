import Article from "../models/Article";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
import mongoose, { ObjectId } from "mongoose";
import { Cache } from "../utils/cache.decorator";
import { FilterResolver } from "../utils/filters/article.resolvers";
import RedisClient from "../clients/redis.client";
import Notification from "../models/Notification";
dotenv.config();

class NotificationService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });

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
