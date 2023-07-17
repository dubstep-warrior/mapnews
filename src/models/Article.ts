import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  tags: {
    type: [String],
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
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

  //   TO ADD MONTHLYVIEWCOUNT, LIKECOUNT, POSTED BY AND LIKES
}, {collection: 'articles'});

const Article = mongoose.model("Article", articleSchema);
export default Article;
