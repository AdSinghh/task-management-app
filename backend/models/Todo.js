// Import the mongoose library to define and create a model.
const mongoose = require("mongoose");

// Define a Mongoose schema for the Todo model.
const todoSchema = new mongoose.Schema({
    // Define the 'title' field with type String, required, and a maximum length of 50 characters.
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    // Define the 'description' field with type String, required, and a maximum length of 100 characters.
    description: {
        type: String,
        maxLength: 500,
    },
    isDone:{
        type: Boolean,
        default: false
    },
    // Define the 'createdAt' field with type Date, required, and a default value of the current date and time.
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    // Define the 'updatedAt' field with type Date, required, and a default value of the current date and time.
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    }
});

// Export the Todo model by creating a Mongoose model using the defined schema.
module.exports = mongoose.model("Todo", todoSchema);