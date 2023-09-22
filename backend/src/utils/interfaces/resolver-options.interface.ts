import mongoose from "mongoose";
import { ArticleCategory } from "./article.interface";

export interface ResolverOptions {
  id?: mongoose.Types.ObjectId;
  distance?: number;
  longitude?: number;
  latitude?: number;
  tags?: string[];
  category?: ArticleCategory;
}
