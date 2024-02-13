/********************************************************* GET ALL POST *********************************************************/
import mongoose from "mongoose";
import Post from "../models/PostModels.js";
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/********************************************************* CREATE NEW POST *********************************************************/

const addPost = async (req, res) => {
  const { title, body } = req.body;

  //   Check the fields empty or not
  if (!title || !body) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    const post = await Post.create({ title, body });
    res.status(200).json({ success: "POST created", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  console.log(req.body);
};

/********************************************************* DELETE POST *********************************************************/

const deletePost = async (req, res) => {
  // Check if the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Check if the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    await post.deleteOne();
    res.status(200).json({ success: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/********************************************************* UPDATE POST *********************************************************/
const updatePost = async (req, res) => {
  // Grab the data from the request body
  const { title, body } = req.body;

  //   Check the fields empty or not
  if (!title || !body) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  // Check if the ID is valid type
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  // Check if the post exists
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ success: "Post updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, addPost, deletePost, updatePost };
