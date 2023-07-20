// const ArticleService = require("../services/ArticleService")
import ArticleService from "../services/ArticleService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/controller.decorator";
import { Get, Post } from "../utils/handlers.decorator";
import { Auth } from "../utils/authentication.decorator";

@Controller('/article')
export default class Article { 
  constructor() { 
  }
 
  // @Auth()
  @Get('')
  async apiGetAllArticles(req: Request, res: Response, next: NextFunction) {
   console.log('yes we tried')
    try {
      const articles = await ArticleService.getAllArticles();
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }
      // console.log(articles)
      res.json({
        success: true,
        data: articles,
      }); 
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth('userId')
  @Post('/like')
  async resolveArticleLikes(req: Request, res: Response, next: NextFunction) {
    try { 
      const article = await ArticleService.resolveArticleLikes(req);
      console.log(article)
      res.json({
        success: true,
        data: article,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth('posted_by')
  @Post('')
  async apiCreateArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const createdArticle = await ArticleService.createArticle(req);
      res.json({
        success: true,
        data: createdArticle,
      });
    } catch (error) {
      console.log("error caught heres");
      console.log(error);
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth('userId', true)
  @Get('/favourites', '/self', '/new', '/relevant', '/search')
  async apiResolveArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const method = req.path == '/search' ? 'resolveArticleSearch' : 'resolveArticles'
      const articles = await ArticleService[method](req) as Array<any>;
      console.log('yes we tried')
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }
      // console.log(articles)
      res.json({
        success: true,
        data: articles,
      }); 
    } catch (error) {
      console.log('error in controller', error)
      res.status(500).json({ success: false, error: error });
    }
  }

  // @Auth('userId')
  // @Get('/self')
  // async apiGetOwnArticles(req: Request, res: Response, next: NextFunction) {
  //  console.log('yes we tried')
  //   try {
  //     const articles = await ArticleService.getOwnArticles(req);
  //     if (!articles) {
  //       res.status(404).json("There are no article published yet!");
  //     }
  //     // console.log(articles)
  //     res.json({
  //       success: true,
  //       data: articles,
  //     }); 
  //   } catch (error) {
  //     res.status(500).json({ success: false, error: error });
  //   }
  // }

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
} 
