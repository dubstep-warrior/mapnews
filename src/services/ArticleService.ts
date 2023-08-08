import Article from "../models/Article";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
import mongoose, { ObjectId } from "mongoose";
import { Cache } from "../utils/cache.decorator";
import { FilterResolver } from "../utils/filters/article.resolvers";
import RedisClient from "../clients/redis.client";
dotenv.config();

class ArticleService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });

  constructor() {}

  async getAllArticles() {
    try {
      const allArticles = await Article.find().lean();
      return allArticles.map((article: any) => {
        return { ...article, coordinates: article.location.coordinates };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createArticle(req: any) {
    try {
      const data = req.body;

      const imageUploads = req.files.map((img: any) =>
        this.imageKit.upload({
          file: img.buffer.toString("base64"),
          fileName: img.originalname,
          folder: "Articles",
        }),
      );

      const newArticle: any = {
        images: (await Promise.all(imageUploads)).map((res) => res.url),
      };

      Object.keys(data).forEach((key) => {
        newArticle[key] = JSON.parse(data[key]);
      });

      const response = await new Article(newArticle).save();
      return {
        ...response.toObject(),
        coordinates: (response.location as any).coordinates,
      };
    } catch (error) {
      console.log("error in service");
      throw error;
    }
  }

  async resolveArticleLikes(req: any) {
    const { articleId, userId } = req.body;
    try {
      const article = await Article.findOneAndUpdate(
        { _id: articleId },
        FilterResolver(req.path, {
          id: new mongoose.Types.ObjectId(JSON.parse(userId)),
        }),
        { returnDocument: "after" },
      );

      return {
        ...article?.toObject(),
        coordinates: (article?.location as any).coordinates,
      };
    } catch (error) {
      console.log(error);
      throw `Article not found. ${error}`;
    }
  }

  // TODO to renable caching after fixing geospatial queries
  // @Cache()
  async resolveArticles(req: any) {
    const options: any = {
      ...JSON.parse(req.query.data),
    };
    if ("userId" in req.body)
      options["id"] = new mongoose.Types.ObjectId(
        JSON.parse(req.body["userId"]),
      );
    try {
      console.log(options);
      const allArticles = await Article.find(
        FilterResolver(req.path, options),
      ).lean();

      const articles = allArticles.map((article: any) => {
        return { ...article, coordinates: article.location.coordinates };
      });

      return articles;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async resolveArticleSearch(req: any) {
    try {
      const options = JSON.parse(req.query.data);
      const allArticles = await Article.find(
        FilterResolver(req.path, options),
      ).lean();
      return allArticles.map((article: any) => {
        return { ...article, coordinates: article.location.coordinates };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // static async updateArticle(title, body, articleImage){
  //         try {
  //             const updateResponse =  await Article.updateOne(
  //                 {title, body, articleImage},
  //                 {$set: {date: new Date.now()}});

  //                 return updateResponse;
  //         } catch (error) {
  //             console.log(`Could not update Article ${error}` );

  //     }
  // }

  // static async deleteArticle(articleId){
  //     try {
  //         const deletedResponse = await Article.findOneAndDelete(articleId);
  //         return deletedResponse;
  //     } catch (error) {
  //         console.log(`Could  ot delete article ${error}`);
  //     }

  // }
}
export default new ArticleService();
