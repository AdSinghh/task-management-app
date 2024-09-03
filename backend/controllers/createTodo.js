// Import the Todo model from the specified path.
const Todo = require("../models/Todo");
const User = require('../models/User');

// Define a route handler function named createTodo using async/await.
exports.createTodo = async ({body,user}, res) => {
    try {
        // Extract the 'title', 'description', and 'user' from the request body.
        const { title, description} = body;

        // Create a new Todo object and insert it into the database using the Todo model.
        const response = await Todo.create({ title, description, user: user._id });

        // Send a JSON response indicating success.
        res.status(200).json({
            success: true,
            data: response,
            message: "Entry created successfully"
        });
    } catch (err) {
        // If an error occurs during the process, log the error to the console.
        console.error(err);

        // Send a JSON response indicating a server error with details.
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
