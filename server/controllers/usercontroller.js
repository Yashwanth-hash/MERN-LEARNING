const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = await User.create({
      name: req.body.name,
      age: req.body.age,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Could not create user" });
  }
};

const getUserById = async (req, res) => {
     try {
        const user = await User.findById(req.params.id);
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        res.json(user);
      } catch (error) {
        res.status(500).json({ message: "Could not get user" });
      }
};

const updateUser = async (req, res) => {
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
      res.status(500).json({ message: "Could not update user" });
    }
};
const deleteUser = async (req, res) => {
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
       res.status(500).json({ message: "Could not delete user" });
     }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};