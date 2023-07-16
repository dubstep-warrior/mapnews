const  express =  require("express");
const router = express.Router();
const ConfigController = require("../controllers/config.controller");
 
router.get("/", ConfigController.apiGetConfig); 

module.exports =  router; 