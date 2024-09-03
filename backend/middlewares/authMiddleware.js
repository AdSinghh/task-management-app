const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library to handle JWT operations like signing and verifying tokens.
const User = require("../models/User"); // Import the User model to interact with the user data in the database.
require("dotenv").config(); // Load environment variables from a .env file into process.env, including the JWT_SECRET.

// Middleware to authenticate and verify JWT token
exports.authMiddleware = async (req, res, next) => { // Export a middleware function named authMiddleware that is asynchronous.
  try { 
    // Extract JWT token from the Authorization header or request body
    const token = req.headers?.access_token || req.body?.access_token; // Try to extract the JWT token from the 'access_token' field in the request headers or body.

    if (!token) { // Check if the token is missing.
      // If token is missing, return an unauthorized response
      return res.status(401).json({ // Respond with a 401 Unauthorized status code.
        success: false, 
        message: "Token is missing", 
      });
    }

    // Verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token using the secret key stored in the environment variable JWT_SECRET. This will throw an error if the token is invalid.
      const { userId } = decode; // Extract the userId from the decoded token payload.
      const userDoc = await User.findById(userId); // Query the database to find a user document by the userId obtained from the token.

      if (!userDoc) { // Check if no user document was found.
        return res.status(401).json({ // Respond with a 401 Unauthorized status code.
          success: false, // Indicate failure in the response.
          message: "Invalid User", // Provide a message indicating the user is invalid or does not exist.
        });
      }

      // Attach the decoded user information to the request object for later use
      req.user = userDoc; // Attach the found user document to the request object, so subsequent middleware or route handlers can access it.

      // Move to the next middleware or route handler
      next(); // Call the next middleware or route handler in the stack.
    } catch (error) {
      // If token verification fails, return an unauthorized response
      console.error("Error:", error); // Log the error for debugging purposes.
      return res.status(401).json({ // Respond with a 401 Unauthorized status code.
        success: false, // Indicate failure in the response.
        message: "Token is Invalid", // Provide a message indicating the token is invalid.
      });
    }
  } catch (error) {
    // If an unexpected error occurs, return an unauthorized response
    return res.status(401).json({ // Respond with a 401 Unauthorized status code.
      success: false, 
      message: "Something went wrong while verifying the token", 
    });
  }
};
