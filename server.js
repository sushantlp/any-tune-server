"use strict";

// Module Dependencies.
const express = require("express");
//const session = require("express-session");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const dotEnv = require("dotenv");
//const flash = require("express-flash");
const path = require("path");
const expressValidator = require("express-validator");
const expressStatusMonitor = require("express-status-monitor");
const sass = require("node-sass-middleware");
//const jsonWebToken = require("./middleware/jsonwebtoken");

require("express-group-routes");

// Load environment variables from .env file, where API keys and passwords are configured.
dotEnv.load({ path: ".env" });

// Create Express server.
const app = express();

// Controllers (route handlers).
const database = require("./controllers/databaseController");
const youtube = require("./controllers/youtubeController");

// Use morgan to log requests to the console
app.use(morgan("dev"));

// Express configuration.
app.set("host", process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0");
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use(expressStatusMonitor());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(
  sass({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public")
  })
);

app.use(express.static(path.join(__dirname, "public")));

//app.use("/api", jsonWebToken.verifyJsonWebToken);

// Index Route
app.get("/", youtube.requestPlaylistData);

// Version 1 API
app.group("/api/v1", router => {
  // Youtube Search API
  router.get("/search", youtube.requestSearchData);

  // Youtube Playlist API
  router.get("/playlist", youtube.requestPlaylistData);

  // Youtube Trending API
  router.get("/trending", youtube.requestTrendingData);
});

// Call Mysql Connection Object
database.mysqlConnect();

// Call Sequelize Connection
database.sequelizeConnection();

// Error Handler.
app.use(errorHandler());

// Start Express server.
app.listen(app.get("port"), () => {
  console.log("Server Start");
});

// If Production then Execute
if (process.env.APP_ENV.toUpperCase() == "PROD") {
  app.all("*", function(req, res) {
    res.redirect(process.env.PRODUCTION_URL);
  });
} else {
  app.all("*", function(req, res) {
    res.redirect(process.env.DEVELOPMENT_URL);
  });
}

// Export
module.exports = app;
