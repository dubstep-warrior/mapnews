const Config = require("../models/Config");  

module.exports = class ArticleService { 

  static async getConfig() {
    try {
      const config = await Config.find().lean();
      return config;
    } catch (error) {
      console.log(`Could not fetch articles ${error}`);
    }
  } 
};
