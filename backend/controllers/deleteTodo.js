// Import the Todo model from the specified path.
const Todo = require("../models/Todo");
const User = require("../models/User");

exports.deleteTodo = async ({ params, user }, res) => {
  try {
    const { id } = params;
    await Todo.findOneAndDelete({ _id: id, user: user._id });

    res.status(200).json({
      status: true,
      data: Todo,
      message: "Todo deleted",
    });
  } catch(err) {
    console.error(err);

    // Send a JSON response indicating a server error with details.
    res.status(500).json({
      success: false,
      data: "Server Error",
      message: err.message,
    });
  }
};
