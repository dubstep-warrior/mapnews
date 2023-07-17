import express from "express";
const router = express.Router();
import AuthController from "../controllers/auth.controller";
import multer from "multer";

const storage = multer.memoryStorage() 
const upload = multer({  storage }); 

router.post("/register", upload.single('profile_img') , AuthController.apiRegister);
router.post("/login", AuthController.apiLogin);
// router.get("/article/:id", AuthController.apiGetArticleById);
// router.put("/article/:id", ArticleCtrl.apiUpdateArticle);
// router.delete("/article/:id", ArticleCtrl.apiDeleteArticle);

export default router;