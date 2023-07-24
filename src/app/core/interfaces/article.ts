export interface Article {
  category: string;
  coordinates: Array<number>;
  _id: String;
  title: String;
  description: String;
  tags?: Array<String>;
}
