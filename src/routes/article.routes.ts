import express from "express";
const router = express.Router();
import ArticleCtrl from "../controllers/article.controller";
import multer from "multer";
const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.get("/", ArticleCtrl.apiGetAllArticles);
router.post("/", upload.array("images", 12), ArticleCtrl.apiCreateArticle);
router.get("/article/:id", ArticleCtrl.apiGetArticleById);
// router.put("/article/:id", ArticleCtrl.apiUpdateArticle);
// router.delete("/article/:id", ArticleCtrl.apiDeleteArticle);

export default router;
