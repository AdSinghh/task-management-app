const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const userSchema = new mongoose.Schema(
	{
		// Define the name field with type String, required, and trimmed
        name: {
            type: String,       // The type is String
            required: true,     // The field is required
            trim: true          // Trim leading and trailing whitespaces
        },
		// Define the email field with type String, required, and trimmed
		email: {
			type: String,
			required: true,
            unique :true,
			trim: true,
		},

		// Define the password field with type String and required
		password: {
			type: String,
			required: true,
		},

    })

    module.exports = mongoose.model("User",userSchema)