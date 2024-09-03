// Import necessary modules
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Define the signup route handler
exports.signup = async (req, res) => {
  try {
    // Get user data from the request body
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      // If user already exists, return an error response
      return res.status(400).json({
        success: false,
        message:"Incomplete Data! please provide all fields",
      });
    }

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If user already exists, return an error response
      return res.status(401).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the user's password for security
    let hashedPassword;

    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      // If there is an error in hashing the password, return an error response
      return res.status(500).json({
        success: false,
        message: "Error in hashing Password",
      });
    }

    // Create a new user with hashed password
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return a success response if user creation is successful
    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    // If there is any other error, log the error and return an error response
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

// login route handler

exports.login = async (req, res) => {
  try {
    // Data fetch from req body
    const { email, password } = req.body;

    // Validation of email and password
    if (!email || !password) {
      // If email or password is missing, return a 400 status with an error message
      return res.status(400).json({
        success: false,
        message: "Please fill all the details properly",
      });
    }

    // Check for registered user
    let user = await User.findOne({ email });

    // If not a registered user
    if (!user) {
      // If the user is not found, return a 401 status with an error message
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    // Prepare payload for JWT token
    const payload = {
      email: user.email,
      userId: user._id,
    };

    // Verify password & generate JWT token
    if (await bcrypt.compare(password, user.password)) {
      // If the password is correct
      // Generate a JWT token with the payload, sign it with the secret, and set expiration time
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });
     

      // Configure options for the cookie
      const options = {
        expire: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Cookie expiration time (2 days)
        httpOnly: true, // Cookie accessible only through HTTP(S) headers
      };

      // Set the token in a cookie and send a success response
      res.cookie("access_token", token, options).status(200).json({
        success: true,
        message: "User logged in successfully",
        data:{
            user:{
              email: user.email,
              name: user.name,
              id: user._id
            },
            access_token: token
        }
      });
    } else {
      // If the password is incorrect, return a 403 status with an error message
      return res.status(403).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    // If there is any other error during the process, log the error and return a 500 status with an error message
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

exports.getUserByToken = async ({user}, res) => {
  res.status(200).json({
    success: true,
    data: user,
    message:"token validated"
  })
}
