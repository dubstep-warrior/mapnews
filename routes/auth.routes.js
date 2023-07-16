const  express =  require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const multer = require('multer'); 

const storage = multer.memoryStorage()
  
const upload = multer({  storage });


router.post("/register", upload.single('profile_img') , AuthController.apiRegister);
router.post("/login", AuthController.apiLogin);
// router.get("/article/:id", AuthController.apiGetArticleById);
// router.put("/article/:id", ArticleCtrl.apiUpdateArticle);
// router.delete("/article/:id", ArticleCtrl.apiDeleteArticle);

module.exports =  router; 