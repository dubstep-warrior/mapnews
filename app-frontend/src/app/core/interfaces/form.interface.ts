import { ValidatorMap } from '../utilities/validators';

type TFormName = 'addArticle' | 'login' | 'register' | 'search';

export interface IFormAttribute {
  type: string;
  value: any;
  validators?: (keyof ValidatorMap)[];
}

interface IFormConfig {
  [key: string]: IFormAttribute;
}

export interface IForm {
  _id: string;
  form: IFormConfig;
  name: TFormName;
}
