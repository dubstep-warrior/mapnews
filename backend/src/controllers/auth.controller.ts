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
      const createdUser = await authService.createUser(req.body, req.file as Express.Multer.File);
      res.json({
        success: true,
        data: createdUser,
      });
    } catch (error: any) {
      const key: any = error.message.split(" ")[0];
      const mongoErrors = MongoServerErrors.registration;
      console.log(error);
      res.status(400).send({
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
      const token = await authService.userLogin(req.body);
      res.status(200).json({
        success: true,
        data: token,
      });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message });
    }
  }
}
