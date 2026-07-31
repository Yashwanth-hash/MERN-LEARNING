const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const JWT_SECRET = "mysecretkey";
const signup = async (req, res) => {
    const errors = validationResult(req);

if (!errors.isEmpty()) {

    return res.status(400).json({
        errors: errors.array()
    });

}
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User created successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
}; 

const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
    {
        id: user._id,
        email: user.email,
        role: user.role
    },
    JWT_SECRET,
    {
        expiresIn: "1h",
    }
);

res.status(200).json({
    message: "Login successful",
    token,
});

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};
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
  getUserById,
  updateUser,
  deleteUser,
  signup,
  login,
};