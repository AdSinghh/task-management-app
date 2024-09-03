// Import the Todo model from the specified path.
const Todo = require("../models/Todo");
const User = require("../models/User");

exports.getTodo = async ({ user }, res) => {
  try {
    // fetch all Todos from database

    const todos = await Todo.find({ user: user?._id });

    res.status(200).json({
      success: true,
      data: todos,
      message: "Entire Todos Fetched",
    });
  } catch (err) {
    // If an error occurs during the process, log the error to the console.
    console.error(err);

    // Send a JSON response indicating a server error with details.
    res.status(500).json({
      success: false,
      data: "Server Error",
      message: err.message,
    });
  }
};
