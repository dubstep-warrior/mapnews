import { IUser } from "./user.interface";

export interface IAuth {
  token: string;
  user: IUser;
}

export type LoginParams = Pick<IUser, "email" | "password">;

export interface RegisterParams extends LoginParams {
  confirmPassword: string;
  profile_img: Express.Multer.File;
}
