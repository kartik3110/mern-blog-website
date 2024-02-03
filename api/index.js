import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/blog-website"; //precautionary measure
const app = express();
dotenv.config();
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

app.use(express.json());
// routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello from express!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});
