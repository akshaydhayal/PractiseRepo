import mongoose from "mongoose";
let isConnected = false;

export async function dbConnect() {
  if (isConnected) {
    return;
  }
  if (isConnected === false) {
    isConnected = true;
    await mongoose
      .connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/")
      .then(() => {
        console.log("conneted to mongodb");
      });
  }
}
