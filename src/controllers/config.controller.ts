// const ConfigService = require("../services/ConfigService");
import ConfigService from "../services/ConfigService";
import { Request, Response, NextFunction } from "express";

class Config {
  async apiGetConfig(req: Request, res: Response, next: NextFunction) {
    try {
      const config = await ConfigService.getConfig();
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
export default new Config();
