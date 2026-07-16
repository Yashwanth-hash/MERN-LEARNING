const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb+srv://yashwanth007_db_user:5jRAXGkKAy09nHn8@cluster0.iceoc0d.mongodb.net/mern_learningappName=Cluster0")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/create-user", async (req, res) => {
  try {
    const user = await User.create({
      name: "Y",
      age: 20,
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not create user" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not create user" });
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Could not get users" });
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not get user" });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        age: req.body.age,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
  console.log(error);
  res.status(500).json({ message: "Could not update user" });
}
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
  console.log(error);
  res.status(500).json({ message: "Could not delete user" });
}
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});