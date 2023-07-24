import User from "../models/User";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
dotenv.config();
import JsonWebToken from "jsonwebtoken";
import Bcrypt from "bcryptjs";
import { Request } from "express";

class AuthService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });

  // TODO see if can refactor
  async createUser(req: Request) {
    try {
      let data = req.body;
      const newUser: any = {};
      Object.keys(data).forEach((key) => {
        newUser[key] = data[key];
      });
      if (newUser.password !== newUser.confirmPassword) {
        throw new Error("Passwords do not match!");
      }
      delete newUser.confirmPassword;

      newUser["password"] = Bcrypt.hashSync(newUser["password"], 10);

      const user = await new User(newUser).save();
      if (user) {
        const token = JsonWebToken.sign(
          { id: user._id, email: user.email },
          process.env.SECRET_JWT_CODE!,
        );

        if (req.file) {
          this.imageKit.upload(
            {
              file: req.file.buffer.toString("base64"),
              fileName: req.file.originalname,
              folder: "Users",
            },
            (err: any, res: any) => {
              if (err) throw err;
              else {
                user.profile_img = res.url;
                user.save();
              }
            },
          );
        }
        return {
          token,
          user: user.toObject(),
        };
      } else {
        throw "Something happened, please try again later";
      }
    } catch (error) {
      throw error;
    }
  }

  async userLogin(req: Request) {
    let data = req.body;

    const currentUser: any = {};
    Object.keys(data).forEach((key) => {
      currentUser[key] = data[key];
    });

    if (["email", "password"].some((element) => !(element in currentUser))) {
      throw new Error("Not all parameters filled");
    }
    const user = await User.findOne({ email: currentUser["email"] });

    if (!user) {
      throw new Error("User does not exist");
    }
    if (!Bcrypt.compareSync(currentUser["password"], user.password)) {
      throw new Error("Wrong password");
    }
    const token = JsonWebToken.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_JWT_CODE!,
    );
    return { token, user: user.toObject() };
  }
}
export default new AuthService();
