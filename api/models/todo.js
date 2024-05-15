const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    rquired: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
  category: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  creartedAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
