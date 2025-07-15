// server/models/Flower.js
import mongoose from "mongoose";

const flowerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    flowerType: {
      type: String,
      enum: ["rose", "sunflower", "daisy", "tulip", "lily"],
      default: "rose"
    },
    date: {
      type: Date,
      default: Date.now
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        text: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);
export default mongoose.model("Flower", flowerSchema);
