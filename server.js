const express = require("express");

const PORT = process.env.PORT || 3060;

const app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes and give the server access to them.
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  console.log(`Aligator listening on: http://localhost: ${PORT}!`);
});