import authService from "../services/AuthService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/controller.decorator";
import { Post } from "../utils/handlers.decorator";

@Controller("/auth")
export default class Auth {
  @Post("/register")
  async apiRegister(req: Request, res: Response, next: NextFunction) {
    try {
      const createdUser = await authService.createUser(req);
      res.json({
        success: true,
        data: createdUser,
      });
    } catch (error: any) {
      console.log("error caught in register");
      console.log(error);
      res.send({ success: false, error: error.message });
    }
  }

  @Post("/login")
  async apiLogin(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("login controller attempted");
      const token = await authService.userLogin(req);
      console.log("controller", token);
      res.json({
        success: true,
        data: token,
      });
    } catch (error) {
      console.log("error caught heres");
      console.log(error);
      res.status(500).json({ success: false, error: error });
    }
  }
}
