import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import tasksRouter from "./routes/tasks.js";

dotenv.config();
const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("Todo API is running 🚀"));
app.use("/tasks", tasksRouter);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`API ⚡ on ${PORT}`)))
  .catch(err => console.error("Mongo connection error:", err.message));