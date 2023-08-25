// const Config = require("../models/Config");
import Config from "../models/Config";

class ConfigService {
  async getConfig() {
    try {
      const config = await Config.find().lean();
      return config;
    } catch (error) {
      console.log(`Could not fetch config ${error}`);
      throw error;
    }
  }
}
export default new ConfigService();
