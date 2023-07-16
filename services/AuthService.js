const User = require("../models/User");
const ImageKit = require("imagekit");
require("dotenv").config();
const JsonWebToken = require("jsonwebtoken");
const Bcrypt = require("bcryptjs");

module.exports = class ArticleService {
  static imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  static async createUser(req) {
    try {
      let data = req.body;

      const res = await this.imageKit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "Users",
      });
      const newUser = {};
      if (res) {
        newUser["profile_img"] = res.url;
      }

      Object.keys(data).forEach((key) => {
        newUser[key] = JSON.parse(data[key]);
      });

      newUser["password"] = Bcrypt.hashSync(newUser["password"], 10);

      const response = await new User(newUser).save();
      return { ...response.toObject() };
    } catch (error) {
      console.log("error in service");
      console.log(error);
    }
  }

  static async userLogin(req) {
    let data = req.body;
    if (["email", "password"].some((element) => !(element in data))) {
      // return not all params filled
      throw new Error("Not all parameters filled");
    }

    const currentUser = {};
    Object.keys(data).forEach((key) => {
      currentUser[key] = JSON.parse(data[key]);
    });

    User.findOne({ email: currentUser['email'] }).then((user) => {
        if(!user) {
            throw new Error("User does not exist")
        } 
        if(!Bcrypt.compareSync(currentUser['password'], user.password)) {
            throw new Error("Wrong password")
        }
        const token = JsonWebToken.sign({id: user._id, email: user.email}, process.env.SECRET_JWT_CODE)
        return token
    })
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
