// Import the Todo model from the specified path.
const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isDone } = req.body;

    const updatePayload = {
        title, description, isDone, updatedAt: Date.now(),
    };

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user?._id },
      updatePayload
    );

    res.status(200).json({
      success: true,
      data: todo,
      message: "Data updated successfully",
    });
  } catch (err) {
    // If an error occurs during the process, log the error to the console.
    console.error(err);

    // Send a JSON response indicating a server error with details.
    res.status(500).json({
      success: false,
      data: "Internal Server Error",
      message: err.message,
    });
  }
};
