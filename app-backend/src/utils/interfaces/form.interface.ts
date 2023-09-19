import { ObjectId } from "mongoose";

type TFormName = "addArticle" | "login" | "register" | "search";

interface IFormAttribute {
  type: string;
  value: any;
  validators?: string[];
}

interface IFormConfig {
  [key: string]: IFormAttribute;
}

export interface IForm {
  _id: ObjectId;
  form: IFormConfig;
  name: TFormName;
}
