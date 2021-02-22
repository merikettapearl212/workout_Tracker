// Require the following npm packages inside of the server.js file:
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// Load models file into mongoose
require("./models");

const PORT = process.env.PORT || 3080;

// Create express server
const app = express();
// Tell our server to use logger/morgan
app.use(logger("dev"));
// Parse application body as JSON/Process dynamic Data with middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Connection to mongoose
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:workout',
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  },
     (error) => {
    const connectionStatus = !error ? 'Success': 'Error Connecting to database';
    console.log(connectionStatus);
});
// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
app.use(require("./routes/apiRoutes.js"));
app.use(require("./routes/htmlRoutes.js"));

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  console.log("Aligator listening on: http://localhost:" + PORT);
});