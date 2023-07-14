const  express =  require("express");
const router = express.Router();
const ArticleCtrl = require("../controllers/article.controller");
const multer = require('multer'); 

const storage = multer.memoryStorage()
  
const upload = multer({  storage });

router.get("/", ArticleCtrl.apiGetAllArticles);
router.post("/", upload.array('images', 12) , ArticleCtrl.apiCreateArticle);
router.get("/article/:id", ArticleCtrl.apiGetArticleById);
// router.put("/article/:id", ArticleCtrl.apiUpdateArticle);
// router.delete("/article/:id", ArticleCtrl.apiDeleteArticle);

module.exports =  router; 