import ArticleService from "../services/ArticleService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/decorators/controller.decorator";
import { Get, Post } from "../utils/decorators/handlers.decorator";
import { Auth } from "../utils/decorators/authentication.decorator";
import RedisHandler from "../clients/redis.client";

@Controller("/article")
export default class Article {
  @Auth("userId")
  @Get("/favourites", "/self", "/new", "/relevant", "/search")
  async apiResolveArticles(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const method =
        req.path == "/search" ? "resolveArticleSearch" : "resolveArticles";
      const articles = (await ArticleService[method](req)) as Array<any>;
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }

      res.status(200).json({
        success: true,
        data: articles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth("posted_by")
  @Post("")
  async apiCreateArticle(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const createdArticle = await ArticleService.createArticle(
        req.body,
        req.files as Express.Multer.File[],
      );

      RedisHandler.get("publisher").publish(
        createdArticle.category == "emergency" ? "emergency" : "general",
        JSON.stringify(createdArticle),
      );

      res.status(200).json({
        success: true,
        data: createdArticle,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth("userId")
  @Post("/like")
  async resolveArticleLikes(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const article = await ArticleService.resolveArticleLikes(req);
      res.json({
        success: true,
        data: article,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }
}
