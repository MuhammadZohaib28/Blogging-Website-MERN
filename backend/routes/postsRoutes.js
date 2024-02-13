import express from "express";

import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
  getUserPosts,
} from "../controllers/postsController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// get all posts route
router.get("/", getPosts);

// get all user posts route
router.get("/user", auth, getUserPosts);

// add new posts route
router.post("/", auth, addPost);

// delete new posts route
router.delete("/:id", auth, deletePost);

// update posts route
router.put("/:id", auth, updatePost);

export { router as postRoutes };
