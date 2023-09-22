import authService from "../services/AuthService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/decorators/controller.decorator";
import { Post } from "../utils/decorators/handlers.decorator";
import MongoServerErrors from "../config/mongo-server.errors.json";

@Controller("/auth")
export default class Auth {
  @Post("/register")
  async apiRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const createdUser = await authService.createUser(req);
      res.json({
        success: true,
        data: createdUser,
      });
    } catch (error: any) {
      console.log(error.name);
      console.log(error.message);
      const key: any = error.message.split(" ")[0];
      const mongoErrors = MongoServerErrors.registration;
      res.send({
        success: false,
        error: mongoErrors?.[key as keyof typeof mongoErrors] ?? error.message,
      });
    }
  }

  @Post("/login")
  async apiLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = await authService.userLogin(req);
      res.json({
        success: true,
        data: token,
      });
    } catch (error: any) {
      console.log("error caught heres");
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
