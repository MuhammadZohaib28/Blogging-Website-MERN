import express from "express";
import { postRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MONGODB");
    autoIndex: true;
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/users", usersRoutes);

app.listen(3000, "localhost", () => {
  console.log("server is running on port 3000");
});
