import { Request, Response, NextFunction } from "express";
import Controller from "../utils/decorators/controller.decorator";
import { Get } from "../utils/decorators/handlers.decorator";
import { Auth } from "../utils/decorators/authentication.decorator";
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

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      console.log("catch notif error", error);
      res.status(500).json({ success: false, error: error });
    }
  }
}
