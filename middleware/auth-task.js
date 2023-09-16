import jwt from "jsonwebtoken";
import taskModel from "../db/models/task.model.js";
const authTask = async (req, res, next) => {
  let { id } = req.params;
  let foundTask = await taskModel.findById(id);
  if (foundTask) {
    let token = req.cookies.token;
    !token && res.status(401).json({ massage: "please login first" });
    let decoded = jwt.verify(token, "cr7");
    if (decoded.id == foundTask.userId) {
      next();
    } else {
      res.status(401).json({ masssage: " you'r not the creator ,login first" });
    }
  } else {
    res.status(404).json({ masssage: " this task not found" });
  }
};

export default authTask;
