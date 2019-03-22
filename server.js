// ==============================================================================
// DEPENDENCIES
// ==============================================================================

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");


// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8081;
app.use(express.static('app/public'));

// // Sets up the Express app to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Setup for the parser for the server to be able to interpret data
// var jsonParser = bodyParser.json();

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json({ type: 'applilication/*+json' }));

app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

app.use(bodyParser.text({ type: 'text/html' }));

app.use('/static', express.static(path.join(__dirname, 'app/public')))

// ================================================================================
// ROUTER
// ================================================================================

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// =============================================================================
// LISTENER
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
