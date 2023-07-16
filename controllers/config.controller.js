const ConfigService = require("../services/ConfigService");

module.exports = class Config{

   static async apiGetConfig(req, res, next){
       try {
         const config = await ConfigService.getConfig();
         if(!config){
            res.status(404).json("There are no article published yet!")
         }
         res.json({
            success: true,
            data: config
         });
       } catch (error) {
          res.status(500).json({success:false, error: error})
       }

   }
 

}