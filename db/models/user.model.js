import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      minLength: [3, "Name Less Than 3 Letters"],
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    age: Number,
    gender: String,
    phone: {
      type: String,
      require: true,
    },
    isVerified: Boolean,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const userModel = new mongoose.model("User", userSchema);
export default userModel;
