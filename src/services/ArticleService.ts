import Article from "../models/Article";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
import mongoose, { ObjectId } from "mongoose";
import { FilterResolver } from "../utils/filters/article.resolvers";
dotenv.config();

class ArticleService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });
 

  constructor() { 
  }

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
      let data = req.body;
      let imagekit_images = []; 

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
    const oidUserID = new mongoose.Types.ObjectId(JSON.parse(userId));
    try {
      const article = await Article.findOneAndUpdate(
        { _id: articleId },
        [
          {
            $set: {
              likes: {
                $cond: [
                  { $in: [oidUserID, "$likes"] },
                  {
                    $filter: {
                      input: "$likes",
                      cond: { $ne: ["$$this", oidUserID] },
                    },
                  },
                  { $concatArrays: ["$likes", [oidUserID]] },
                ],
              },
            },
          },
        ],
        { returnDocument: "after" }
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

  async resolveArticles(req: any) { 

    const options: any = {}
    if ("userId" in req.body) options['id'] = new mongoose.Types.ObjectId(JSON.parse(req.body["userId"]))
    try {
      console.log(req.path);
      const allArticles = await Article.find(
        FilterResolver(req.path, options)
      ).lean();
      console.log(allArticles);
      return allArticles.map((article: any) => {
        return { ...article, coordinates: article.location.coordinates };
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async resolveArticleSearch(req: any) { 
    console.log('search service called')
    try {
      console.log(req.path);
      console.log(req.query) 
      const options = JSON.parse(req.query.data)
      const allArticles = await Article.find(
        FilterResolver(req.path, options)
      ).lean();
      console.log(allArticles);
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
