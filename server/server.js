const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://yashwanth007_db_user:5jRAXGkKAy09nHn8@cluster0.iceoc0d.mongodb.net/mern_learningappName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});