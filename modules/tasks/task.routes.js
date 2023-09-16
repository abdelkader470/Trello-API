import express from "express";
import {
  addTask,
  allTasks,
  deleteTask,
  updateTask,
} from "./task.controller.js";
import authTask from "../../middleware/auth-task.js";
const taskRoutes = express.Router();

taskRoutes.post("/addtask/:id", addTask);
taskRoutes.get("/alltasks", allTasks);
taskRoutes.patch("/updatetask/:id", authTask, updateTask);
taskRoutes.delete("/deletetask/:id", authTask, deleteTask);

export default taskRoutes;
