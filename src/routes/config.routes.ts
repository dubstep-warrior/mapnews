import express from "express";
const router = express.Router();
// const ConfigController = require("../controllers/config.controller");
import ConfigController from "../controllers/config.controller";

 
router.get("/", ConfigController.apiGetConfig); 

export default router;