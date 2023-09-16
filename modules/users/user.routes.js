import express from "express";
import {
  signUp,
  getAllUsers,
  signIn,
  changePassword,
  updateUser,
  deleteUser,
  softDeleteUser,
  logOut,
} from "./user.controller.js";
import validation from "../../middleware/validation.js";
import {
  signUpValidationSchema,
  signInValidationSchema,
} from "./user.validation.js";
import auth from "../../middleware/auth.js";
const userRoutes = express.Router();

userRoutes.post("/user/signUp", validation(signUpValidationSchema), signUp);
userRoutes.post("/user/signIn", validation(signInValidationSchema), signIn);
userRoutes.patch("/changePassword/:id", auth, changePassword);
userRoutes.patch("/updateUser/:id", auth, updateUser);
userRoutes.delete("/deleteUser/:id", auth, deleteUser);
userRoutes.delete("/softDelete/:id", auth, softDeleteUser);
userRoutes.get("/users", auth, getAllUsers);
userRoutes.get("/logOut", auth, logOut);

export default userRoutes;
