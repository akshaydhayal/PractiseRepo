const express=require("express");
const bosyParser=require("body-parser");
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const adminRoutes=require("./routes/admin.js");
const userRoutes=require("./routes/user.js");


const app=express();
app.use(cors());
app.use(bodyParser.json());

app.use("/admin",adminRoutes);
app.use("/users",userRoutes);

mongoose.connect("mongodb+srv://akshay:akshay@cluster0.jy7weei.mongodb.net/")
  .then(() => {
    console.log("mongogoose connected!!");
  })
  .catch((err) => console.log(err));

app.listen(3002,()=>{
    console.log("server running at port 3002");
})