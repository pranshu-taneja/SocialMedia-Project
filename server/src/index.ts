import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan"; //logs http request to the server console
import path from "path";
import { fileURLToPath } from "url"; //gives the path of the this file/module (index.js tbh)
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";
//.*|/\*[\s\S]*?\*/
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common")); 
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const port: string = process.env.port || "5000";

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/app", (req, res) => {
  res.send("working");
});
app.listen(Number(port), () =>
  console.log(`Example app listening on port ${port}!`)
);
