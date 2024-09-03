// Import the express library to create a router.
const express = require("express");

// Create an instance of an Express router.
const router = express.Router();

// Import the authentication middleware
const { authMiddleware } = require("../middlewares/authMiddleware");

// Import the controller functions
const { login, signup, getUserByToken } = require('../controllers/Auth');
const { createTodo } = require("../controllers/createTodo");
const { getTodo } = require("../controllers/getTodo");
const { updateTodo } = require("../controllers/updateTodo");
const { deleteTodo } = require("../controllers/deleteTodo");
// Define API routes.

// User Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", authMiddleware,getUserByToken)

// Todo Routes - Protected by authMiddleware

router.post("/createTodo", authMiddleware, createTodo);
router.get("/getTodos", authMiddleware, getTodo);
router.put("/updateTodo/:id", authMiddleware, updateTodo);
router.delete("/deleteTodo/:id", authMiddleware, deleteTodo);

// Export the router to make it available for use in other parts of the application.
module.exports = router;
