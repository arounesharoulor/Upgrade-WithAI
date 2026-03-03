import userRoutes from "./routes/UserRoutes.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(console.error);