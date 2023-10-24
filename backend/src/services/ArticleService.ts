import Article from "../models/Article";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { Cache } from "../utils/decorators/cache.decorator";
import { FilterResolver } from "../utils/resolvers/article-filter.resolver";
import {
  ArticleParams,
  IArticle, 
} from "../utils/interfaces/article.interface";
import { Request } from "express";
import { ResolverOptions } from "../utils/interfaces/resolver-options.interface";
import { ImageKitHandler } from "../clients/imagekit.client";
dotenv.config();

class ArticleService {
  constructor() {}

  async createArticle(
    params: ArticleParams,
    files: Express.Multer.File[] = [],
  ): Promise<IArticle> {
    try {
      const data: Partial<ArticleParams> = {};
      const imageUploads = files.map((img: any) =>
      ImageKitHandler.client!.upload({
          file: img.buffer.toString("base64"),
          fileName: img.originalname,
          folder: "Articles",
        }),
      );

      Object.keys(params).forEach((key) => {
        const index: keyof ArticleParams = key as keyof ArticleParams;
        try {
          data[index] = JSON.parse(params[index] as any);
        } catch (e) {
          data[index] = params[index] as any;
        }
      });

      const newArticle: Partial<IArticle> = {
        images: (await Promise.all(imageUploads)).map((res) => res.url),
        ...data,
      };

      const response = await new Article(newArticle)
        .save()
        .then((res) => res.populate("posted_by"));
      return response.toObject();
    } catch (error: any) {
      throw error;
    }
  }

  async resolveArticleLikes(req: Request): Promise<IArticle> {
    const { articleId, userId } = req.body;
    try {
      const article = await Article.findOneAndUpdate(
        { _id: articleId },
        FilterResolver(req.path, {
          id: new mongoose.Types.ObjectId(userId),
        }),
        { returnDocument: "after" },
      ).populate("posted_by");

      if (!article) throw "Cant find article";

      return article?.toObject();
    } catch (error) {
      console.log(error);
      throw `Article not found. ${error}`;
    }
  }

  @Cache()
  async resolveArticles(req: Request): Promise<IArticle[]> {
    try {
      const options: ResolverOptions = {
        ...JSON.parse((req.query.data as string) ?? "null"),
      };
      if ("userId" in req.body)
        options["id"] = new mongoose.Types.ObjectId(req.body["userId"]);

      const allArticles = await Article.find(FilterResolver(req.path, options))
        .populate("posted_by")
        .lean(); 

      return allArticles;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async resolveArticleSearch(req: Request): Promise<IArticle[]> {
    try {
      const options: ResolverOptions = JSON.parse(req.query.data as string);
      const allArticles = await Article.find(FilterResolver(req.path, options))
        .populate("posted_by")
        .lean();
      return allArticles;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new ArticleService();
