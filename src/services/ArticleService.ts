// const Article = require("../models/Article");
// const ImageKit = require("imagekit");
// require("dotenv").config();
import jwt from "jsonwebtoken";
import { JwtPayload } from "../utils/interfaces/jwtpayload.interface";
import Article from "../models/Article";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
import User from "../models/User";
import mongoose from "mongoose";
dotenv.config();

class ArticleService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });

  async getAllArticles() {
    try {
      const allArticles = await Article.find().lean();
      return allArticles.map((article: any) => {
        return { ...article, coordinates: article.location.coordinates };
      });
    } catch (error) {
      console.log(`Could not fetch articles ${error}`);
    }
  }

  async createArticle(req: any) {
    try {
      let data = req.body;
      let imagekit_images = [];

      // const token = req.headers.authorization?.split(" ")[1];
      // const payload = jwt.verify(token, process.env.SECRET_JWT_CODE!) as JwtPayload;
      // const user = await User.findById(payload.id)

      for (const img of req.files) {
        try {
          const res = await this.imageKit.upload({
            file: img.buffer.toString("base64"),
            fileName: img.originalname,
            folder: "Articles",
          });
          imagekit_images.push(res.url);
        } catch (err) {
          console.error(err);
        }
      }
      const newArticle: any = {
        images: imagekit_images,
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
    console.log("likeArticle called: ", articleId, userId);
    const oidUserID = new mongoose.Types.ObjectId(JSON.parse(userId))
    try {
      const article = await Article.findOneAndUpdate(
        { _id: articleId },
        [{
          $set: {
            likes: {
              $cond: [
                { $in: [JSON.parse(userId), "$likes"] },
                {
                  $filter: {
                    input: "$likes",
                    cond: { $ne: ["$$this", JSON.parse(userId)] },
                  },
                },
                { $concatArrays: ["$likes", [JSON.parse(userId)]] },
              ],
            },
          },
        }],
        { returnDocument: "after" }
      );

      return {
        ...article?.toObject(),
        coordinates: (article?.location as any).coordinates,
      };
    } catch (error) {
      throw `Article not found. ${error}`
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
