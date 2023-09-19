import Config from "../models/Config";
import { IForm } from "../utils/interfaces/form.interface";

class ConfigService {
  async getConfig(): Promise<IForm[]> {
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
