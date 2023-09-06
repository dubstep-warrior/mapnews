import { Request, Response, NextFunction } from "express";
import Controller from "../utils/controller.decorator";
import { Get } from "../utils/handlers.decorator";
import { Auth } from "../utils/authentication.decorator";
import NotificationService from "../services/NotificationService";

@Controller("/notification")
export default class Notification {
  @Auth("userId")
  @Get("")
  async apiGetAllNotifications(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const notifications = await NotificationService.getAll(req);
      if (!notifications) {
        res.status(404).json("There are no article published yet!");
      }
      res.json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
}
