require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});