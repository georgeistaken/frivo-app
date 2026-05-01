const express = require("express");  // Importing tool 'Express'
const cors = require("cors");  // Import cors to use in file

const app = express();  // Initializing the application by creating the server

// Allows requests from frontend
app.use(cors({
    origin: "http://localhost:3001"
}));
// Takes incoming data and converts it into usable JSON
app.use(express.json());

// stores routes.js in the routes variable
const routes = require('./routes/routes');

// When user reaches the starting point/path, the system uses all routes from routes.js
app.use('/', routes);

// Starts server and makes it available on port 3000
app.listen(3000, () => {
    console.log('Server running on port 3000');
});


