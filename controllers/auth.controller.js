const authService = require("../services/AuthService");

module.exports = class Article {
  static async apiRegister(req, res, next) {
    try {
      const createdUser = await authService.createUser(req);
      res.json({
        success: true,
        data: createdUser,
      });
    } catch (error) {
      console.log("error caught in register"); 
      console.log(error)
      res.send({ success: false, error: error.message });
    }
  }

  static async apiLogin(req, res, next) {
    try {
      const token = await authService.userLogin(req);
      console.log('controller', token)
      res.json({
        success: true,
        data: token,
      });
    } catch (error) {
      console.log("error caught heres");
      console.log(error);
      res.status(500).json({ success: false, error: error });
    }
  }

  // static async apiUpdateArticle(req, res, next){
  //    try {
  //       const comment = {}
  //       comment.title        = req.body.title;
  //       comment.body         = req.body.body;
  //       comment.articleImage = req.body.article_image

  //       const updatedArticle = await ArticleService.updateArticle(comment);

  //       if(updatedArticle.modifiedCount === 0){
  //          throw new Error("Unable to update article, error occord");
  //       }

  //       res.json(updatedArticle);

  //    } catch (error) {
  //       res.status(500).json({error: error});
  //    }
  // }

  // static async apiDeleteArticle(req, res, next){
  //       try {
  //          const articleId = req.params.id;
  //          const deleteResponse =  await ArticleService.deleteArticle(articleId)
  //          res.json(deleteResponse);
  //       } catch (error) {
  //          res.status(500).json({error: error})
  //       }
  // }
};
