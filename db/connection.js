import mongoose from "mongoose";
const connection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/trelloApp")
    .then(() => console.log("DB connected"))
    .catch((err) => {
      console.log(err);
    });
};
export default connection;
