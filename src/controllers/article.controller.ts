// const ArticleService = require("../services/ArticleService")
import ArticleService from "../services/ArticleService";
import { Request, Response, NextFunction } from "express";
import Controller from "../utils/controller.decorator";
import { Get, Post } from "../utils/handlers.decorator";
import { Auth } from "../utils/authentication.decorator";
import { RedisPublisher } from "../clients/redis.client";

@Controller("/article")
export default class Article {
  @Get("")
  async apiGetAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const articles = await ArticleService.getAllArticles();
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }
      res.json({
        success: true,
        data: articles,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth("userId")
  @Post("/like")
  async resolveArticleLikes(req: Request, res: Response, next: NextFunction) {
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

  @Auth("posted_by")
  @Post("")
  async apiCreateArticle(req: Request, res: Response, next: NextFunction) {
    // validate form title etc

    try {
      const createdArticle = await ArticleService.createArticle(req);

      RedisPublisher.publish(
        createdArticle.category == "emergency" ? "emergency" : "general",
        JSON.stringify(createdArticle),
      );

      res.json({
        success: true,
        data: createdArticle,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error });
    }
  }

  @Auth("userId", true)
  @Get("/favourites", "/self", "/new", "/relevant", "/search")
  async apiResolveArticles(req: Request, res: Response, next: NextFunction) {
    try {
      const method =
        req.path == "/search" ? "resolveArticleSearch" : "resolveArticles";
      const articles = (await ArticleService[method](req)) as Array<any>;
      if (!articles) {
        res.status(404).json("There are no article published yet!");
      }

      res.json({
        success: true,
        data: articles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error });
    }
  }
}
