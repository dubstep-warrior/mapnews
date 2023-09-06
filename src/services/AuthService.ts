import User from "../models/User";
import ImageKit from "imagekit";
import * as dotenv from "dotenv";
dotenv.config();
import JsonWebToken from "jsonwebtoken";
import Bcrypt from "bcryptjs";
import { Request } from "express";
import { IAuth } from "../utils/interfaces/auth.interface";
import { IUser } from "../utils/interfaces/user.interface";

class AuthService {
  imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
  });

  async createUser(req: Request): Promise<IAuth> {

    const data = req.body;
    const newUser: Partial<IUser> & { confirmPassword?: string } = {};
    Object.keys(data).forEach((key) => {
      const index: keyof IUser = key as keyof IUser;
      newUser[index] = data[index];
    });

    if ((["email", "password", "confirmPassword"]).some((element) => !newUser[element as keyof typeof newUser])) {
      throw new Error("Not all fields are filled");
    }
    if (newUser.password !== newUser.confirmPassword) {
      throw new Error("Passwords do not match!");
    }
    delete newUser.confirmPassword;

    newUser["password"] = Bcrypt.hashSync(newUser["password"]!, 10);

    const user = await new User(newUser).save();
    if (user) {
      const token = JsonWebToken.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_JWT_CODE!,
      );

      if (req.file)
        this.imageKit.upload(
          {
            file: req.file.buffer.toString("base64"),
            fileName: req.file.originalname,
            folder: "Users",
          },
          (err, res) => {
            if (err) throw err;
            else {
              user.profile_img = res?.url;
              user.save();
            }
          },
        );

      return {
        token,
        user: user.toObject(),
      };
    } else {
      throw new Error("Something happened, please try again later");
    }
  }

  async userLogin(req: Request): Promise<IAuth> {
    let data = req.body;

    const currentUser: Partial<IUser> = {};
    Object.keys(data).forEach((key) => {
      const index: keyof IUser = key as keyof IUser;
      currentUser[index] = data[index];
    });

    if (["email", "password"].some((element) => !currentUser[element as keyof Partial<IUser>])) {
      throw new Error("Not all fields are filled");
    }

    const user = await User.findOne({ email: currentUser["email"] });

    if (!user) {
      throw "User does not exist";
    }
    if (!Bcrypt.compareSync(currentUser["password"]!, user.password)) {
      throw "Wrong password";
    }
    const token = JsonWebToken.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_JWT_CODE!,
    );
    return { token, user: user.toObject() };
  }
}
export default new AuthService();
