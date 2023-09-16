import taskModel from "../../db/models/task.model.js";
import userModel from "../../db/models/user.model.js";

const addTask = async (req, res) => {
  let { id } = req.params;
  let foundedUser = await userModel.findById(id);
  if (foundedUser) {
    let newTask = await taskModel.insertMany({
      ...req.body,
      status: "toDo",
      userId: id,
    });
    res.status(201).json({ masssage: "task added", newTask });
  } else {
    res.status(400).json({ masssage: "user not found" });
  }
};

const allTasks = async (req, res) => {
  let getallTasks = await taskModel.find().populate("userId");
  res.json({ masssage: "all tasks", getallTasks });
};

const updateTask = async (req, res) => {
  let { id } = req.params;
  try {
    let updatedTask = await taskModel.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        assignTo: req.body.assignTo,
        deadline: req.body.deadline,
      },
      { new: true }
    );

    res.json({ massage: "task-update", updatedTask });
  } catch (error) {
    res.json({ massage: "error to update", error });
  }
};

const deleteTask = async (req, res) => {
  let { id } = req.params;
  let deleted = await taskModel.findByIdAndDelete(id);
  let alltasks = await taskModel.find();
  if (deleted) {
    res.status(201).json({ massage: "task-delete", alltasks });
  } else {
    res.status(400).json({ massage: "task not found" });
  }
};

export { addTask, allTasks, updateTask, deleteTask };
//-------------------------------------------------------------------------------------
// import taskModel from "../../db/models/task.model.js";
// import userModel from "../../db/models/user.model.js";

// const addTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const foundedUser = await userModel.findById(id);

//     if (!foundedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const newTask = await taskModel.create({
//       ...req.body,
//       status: "toDo",
//       userId: id,
//     });

//     res.status(201).json({ message: "Task added", newTask });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const allTasks = async (req, res) => {
//   try {
//     const allTasks = await taskModel.find().populate("userId");
//     res.status(200).json({ message: "All tasks", allTasks });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const updateTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedTask = await taskModel.findByIdAndUpdate(
//       id,
//       {
//         title: req.body.title,
//         description: req.body.description,
//         status: req.body.status,
//         assignTo: req.body.assignTo,
//         deadline: req.body.deadline,
//       },
//       { new: true }
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json({ message: "Task updated", updatedTask });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// const deleteTask = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedTask = await taskModel.findByIdAndDelete(id);

//     if (!deletedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     const allTasks = await taskModel.find();
//     res.status(200).json({ message: "Task deleted", allTasks });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export { addTask, allTasks, updateTask, deleteTask };
