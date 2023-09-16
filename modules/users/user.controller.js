import userModel from "../../db/models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  try {
    let foundedUser = await userModel.findOne({ email: req.body.email });
    if (foundedUser) {
      res.status(409).json({ Msg: "Already Resgister" });
    } else {
      let hashedPassword = bcrypt.hashSync(req.body.password, 10);
      let addedUser = await userModel.insertMany({
        ...req.body,
        password: hashedPassword,
      });
      res.status(201).json({ addedUser });
    }
  } catch (error) {
    res.status(400).json({ Msg: "error", error });
  }
};

const signIn = async (req, res) => {
  let foundedUser = await userModel.findOne({ email: req.body.email });
  if (foundedUser) {
    let matched = bcrypt.compareSync(req.body.password, foundedUser.password);
    if (matched) {
      let token = jwt.sign(
        { id: foundedUser.id, userName: foundedUser.userName },
        "cr7"
      );
      res
        .status(200)
        .cookie("token", token)
        .json({ Msg: "login Successfully", token });
    } else {
      res.status(400).json({ Msg: "Wrong Password" });
    }
  } else {
    res.status(404).json({ Msg: "User Not Found, U Have To Resgister First" });
  }
};

const changePassword = async (req, res) => {
  let { id } = req.params;
  const newPassword = req.body.password;
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  let changedPassword = await userModel.findByIdAndUpdate(
    id,
    {
      password: hashedPassword,
    },
    { new: true }
  );

  res.json({ changedPassword });
};
const updateUser = async (req, res) => {
  let { id } = req.params;
  let updatedUser = await userModel.findByIdAndUpdate(
    id,
    {
      userName: req.body.userName,
      age: req.body.age,
    },
    { new: true }
  );
  res.json({ updatedUser });
};
const deleteUser = async (req, res) => {
  let { id } = req.params;
  let deletedUser = await userModel.findByIdAndDelete(id);
  res.json({ deletedUser });
};
const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isDeleted = true;
    await user.save();
    res.json({ message: "User soft deleted", user });
  } catch (error) {
    res.status(400).json({ message: " error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    let allUsers = await userModel.find({ isDeleted: false });
    res.json({ allUsers });
  } catch (error) {
    res.status(400).json({ message: " error" });
  }
};
const logOut = (req, res) => {
  res.clearCookie("token").json({ Msg: "LogOut successfully" });
};
export {
  signUp,
  getAllUsers,
  signIn,
  changePassword,
  updateUser,
  deleteUser,
  softDeleteUser,
  logOut,
};
