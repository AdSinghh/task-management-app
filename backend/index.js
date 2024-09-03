// Import the Express library
const express = require('express');
const cors = require('cors');

// Create an instance of the Express application
const app = express();

// Load configuration from environment files
require('dotenv').config();

app.use(cors())

// Set the port number from the environment variable or use the default port 4000
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON request body
app.use(express.json());

// Import routes from the TODO API
const todoRoutes = require('./routes/todos');

// Mount the TODO API routes under the "/api/v1" prefix
app.use('/api/v1', todoRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

// Connect to the database
const dbConnect = require('./config/database');
dbConnect();

// Default Route
app.get('/', (req, res) => {
    // Send an HTML response for the root URL ("/")
    res.send('<h1>This is HOMEPAGE</h1>');
});