import { IUser } from './user.interface';

export interface IAuth {
  token: string;
  user: IUser;
}
