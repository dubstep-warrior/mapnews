const  express =  require("express");
const router = express.Router();
const ArticleCtrl = require("../controllers/article.controller");
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
  });
  
const upload = multer({ storage: storage });

router.get("/", ArticleCtrl.apiGetAllArticles);
router.post("/", upload.array('photos', 12) , ArticleCtrl.apiCreateArticle);
router.get("/article/:id", ArticleCtrl.apiGetArticleById);
// router.put("/article/:id", ArticleCtrl.apiUpdateArticle);
// router.delete("/article/:id", ArticleCtrl.apiDeleteArticle);

module.exports =  router; 