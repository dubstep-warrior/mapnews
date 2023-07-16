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
      const newUser = {};
      Object.keys(data).forEach((key) => {
        newUser[key] = data[key];
      });
      console.log(newUser)

      if (newUser.password !== newUser.confirmPassword) {
        throw new Error("Passwords do not match!");
      }
      delete newUser.confirmPassword;

      const res = await this.imageKit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "Users",
      });
      if (res) {
        newUser["profile_img"] = res.url;
      }

      newUser["password"] = Bcrypt.hashSync(newUser["password"], 10);

      const user = await new User(newUser).save();
      if(user) {
        const token = JsonWebToken.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_JWT_CODE
          );
          return token; 
      } else {
        throw 'Something happened, please try again later'
      }
    } catch (error) {
      throw error;
    }
  }

  static async userLogin(req) {
    let data = req.body;

    const currentUser = {};
    Object.keys(data).forEach((key) => {
      currentUser[key] = data[key]
    });
    console.log('currentUser', currentUser)

    if (["email", "password"].some((element) => !(element in currentUser))) {
      // return not all params filled
      throw new Error("Not all parameters filled");
    }
     User.findOne({ email: currentUser["email"] }).then((user) => {
      if (!user) {
        throw new Error("User does not exist");
      }
      if (!Bcrypt.compareSync(currentUser["password"], user.password)) {
        throw new Error("Wrong password");
      }
      const token = JsonWebToken.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_JWT_CODE
      );
      return token;
    });
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
