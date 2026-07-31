const { body, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const adminMiddleware = require("../middleware/adminMiddleware");
const router = express.Router();
router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Welcome!",
        user: req.user
    });

});
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  signup,
  login,
} = require("../controllers/userController");

router.post(
    "/signup",

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid email"),

    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),

    signup
);


router.get("/users/:id", getUserById);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.post("/signup",signup);

router.post("/login",login);

router.delete(
    "/users/:id",
    authMiddleware,
    adminMiddleware,
    deleteUser
);
module.exports = router;