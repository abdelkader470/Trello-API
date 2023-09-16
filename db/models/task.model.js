import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
    },
    assignTo: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    deadline: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);
const taskModel = new mongoose.model("Task", taskSchema);
export default taskModel;
