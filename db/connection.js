import mongoose from "mongoose";
const connection = () => {
  mongoose
    .connect("mongodb+srv://sarahaa:sarahaa@cluster0.c4t5fu8.mongodb.net/")
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(err);
    });
};
export default connection;
