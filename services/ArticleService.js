const Article = require("../models/Article"); 
const ImageKit = require("imagekit");
require("dotenv").config();

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

module.exports = class ArticleService {
  static async getAllArticles() {
    try {
      const allArticles = await Article.find().lean();
      return allArticles.map((article) => {
        return { ...article, coordinates: article.location.coordinates };
      });
    } catch (error) {
      console.log(`Could not fetch articles ${error}`);
    }
  }

  static async createArticle(req) {
    try {
      let data = req.body;
      let imagekit_images = []; 

      for (const img of req.files) {
        try {
          const res = await imageKit.upload({
            file: img.buffer.toString("base64"),
            fileName: img.originalname,
            folder: "Articles",
          });
          imagekit_images.push(res.url);
        } catch (err) {
          console.error(err);
        }
      } 
      const newArticle = {
        images: imagekit_images,
      };

      Object.keys(data).forEach((key) => {
        newArticle[key] = JSON.parse(data[key]);
      });

      const response = await new Article(newArticle).save();
      console.log(response)
      return response;
    } catch (error) {
      console.log("error in service");
      console.log(error);
    }
  }
  static async getArticlebyId(articleId) {
    try {
      const singleArticleResponse = await Article.findById({ _id: articleId });
      return singleArticleResponse;
    } catch (error) {
      console.log(`Article not found. ${error}`);
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
};
