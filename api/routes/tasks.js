import { Router } from "express";
import Task from "../models/Task.js";

const router = Router();

router.get("/", async (_, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", async (req, res) => {
  const { text, priority = "low", dueDate } = req.body;
  const task = await Task.create({ text, priority, dueDate });
  res.status(201).json(task);
});

router.patch("/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

router.delete("/:id", async (_, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

export default router;