import express from "express";

import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "../controllers/postsController.js";

const router = express.Router();

// get all posts route
router.get("/", getPosts);

// add new posts route
router.post("/", addPost);

// delete new posts route
router.delete("/:id", deletePost);

// update posts route
router.put("/:id", updatePost);

export { router as postRoutes };
