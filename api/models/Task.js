import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  text:      { type: String, required: true },
  priority:  { type: String, enum: ["low", "medium", "high"], default: "low" },
  completed: { type: Boolean, default: false },
  dueDate:   { type: Date }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);