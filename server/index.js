import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
// import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { verifyToken } from "./middleware/auth.js";
// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

/* CONFIGURATIONS */
dotenv.config();
const port = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* file upload configuration by multer */

/* Step 2: Where you create the configuration object for file uploading instance of multer */
const storage = multer.diskStorage({
  //configuration object 1
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const filefilter = function (req, file, cb) {
  //configuration object 2
  // Accept video files only
  if (file.mimetype.startsWith("image/")) {
    //after video/ there are mp4, webm etc for specific limitations
    cb(null, true);
  } else {
    cb(new Error("Only images files are allowed!"), false);
  }
};

/* Step: 1 (create multer instance with required objects of configuration --like storage, fileFilter etc)  */
const upload = multer({
  //multer instance
  storage: storage,
  fileFilter: filefilter,
});

/* Step:3 (create Route and use multer instance as the middleware for single or array(multi) file uploading) */
app.post("/uploads", upload.single("file"), (req, res) => {}); //middleware using the multer instance

/* Mongoose Setup configurations */
mongoose
  .connect(
    "mongodb+srv://pranshu-taneja:fobsg041TLSezk40@cluster0.pnx1rpk.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    }
  )
  .then(() => {
    console.log(`MongoDB successfully connected to the Remote DataBase!!`);
  })
  .catch((err) => {
    console.log("Not working!!")
    console.log(`ERR: ${err}`);
  });

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.listen(port, () => {
  console.log(`Example app listening on Port ${port}!!`);
});
