// Import the mongoose library, which is a MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require("mongoose");

// Import the dotenv library to load environment variables from a .env file.
require("dotenv").config();

// Define a function named dbConnect.
const dbConnect = (() => {
    // Use the connect method of mongoose to connect to the MongoDB database.
    mongoose.connect(process.env.DATABASE_URL, {
        // Note: The following options (useNewUrlParser and useUnifiedTopology) are commented out.
        // You might want to uncomment and set these options based on your project requirements.
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    // If the connection is successful, execute the following function.
    .then(() => {
        console.log("Database Connected Successfully");
    })
    // If there's an error during the connection, execute the following function.
    .catch((err) => {
        // Log the error to the console.
        console.log(err);
        // Log the error message to the console.
        console.error(err.message);
        // Exit the process with a non-zero status code (1) to indicate an error.
        process.exit(1);
    });
});

// Export the dbConnect function to make it accessible from other parts of the application.
module.exports = dbConnect;