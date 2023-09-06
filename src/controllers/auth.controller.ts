import authService from "../services/AuthService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/controller.decorator";
import { Post } from "../utils/handlers.decorator";

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
      console.log(error);
      res.send({ success: false, error: error.message });
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
