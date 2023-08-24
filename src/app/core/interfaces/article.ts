export interface Article {
  category: string;
  coordinates: Array<number>;
  _id: string;
  title: string;
  description: string;
  tags?: Array<string>;
}
