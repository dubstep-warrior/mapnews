import mongoose from "mongoose";
import { IArticle } from "../utils/interfaces/article.interface";
const Schema = mongoose.Schema;

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      required: false,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere", // Create a geospatial index for faster queries
      },
    },

    images: {
      type: [String],
      required: false,
    },

    time: {
      type: Date,
      default: Date.now(),
    },

    posted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    likes: {
      type: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
      ],
      required: false,
    },

    //   TO ADD MONTHLYVIEWCOUNT, LIKECOUNT AND LIKES
  },
  { collection: "articles" },
);

const Article = mongoose.model("Article", articleSchema);
export default Article;
