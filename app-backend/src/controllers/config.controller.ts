import ConfigService from "../services/ConfigService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/decorators/controller.decorator";
import { Get } from "../utils/decorators/handlers.decorator";
import { IForm } from "../utils/interfaces/form.interface";

@Controller("/config")
export default class Config {
  @Get("")
  async apiGetConfig(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const config: IForm[] = await ConfigService.getConfig();
      if (!config) {
        res.status(404).json("There are no article published yet!");
      }
      res.json({
        success: true,
        data: config,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
}
