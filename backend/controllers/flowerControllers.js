import Flower from "../models/Flower.js";
import User from "../models/User.js";

export const createFlower = async (req, res) => {
  try {
    const { title, description, flowerType } = req.body;

    const flower = await Flower.create({
      title,
      description,
      flowerType,
      postedBy: req.user.id
    });

    res.status(201).json(flower);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllFlowers = async (req, res) => {
  try {
    const flowers = await Flower.find().populate("postedBy", "name").sort({ createdAt: -1 });
    res.status(200).json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFlowersFromFollowed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const flowers = await Flower.find({
      postedBy: { $in: user.following }
    })
      .populate("postedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(flowers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likeFlower = async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);

    if (!flower.likes.includes(req.user.id)) {
      flower.likes.push(req.user.id);
      await flower.save();
      res.status(200).json({ message: "Liked!" });
    } else {
      res.status(400).json({ message: "Already liked" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const commentOnFlower = async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    const { text } = req.body;

    flower.comments.push({
      userId: req.user.id,
      text
    });

    await flower.save();

    res.status(200).json({ message: "Comment added!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
