"use strict";

// Module Dependencies.
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorHandler = require("errorhandler");
const dotEnv = require("dotenv");
const path = require("path");
const expressValidator = require("express-validator");
const expressStatusMonitor = require("express-status-monitor");
const sass = require("node-sass-middleware");
const favicon = require("serve-favicon");
const robots = require("express-robots");
const CronJob = require("cron").CronJob;
//const jsonWebToken = require("./middleware/jsonwebtoken");

require("express-group-routes");

// Load environment variables from .env file, where API keys and passwords are configured.
dotEnv.load({ path: ".env" });

// Create Express server.
const app = express();

// Controllers (route handlers).
const database = require("./controllers/databaseController");
const youtube = require("./controllers/youtubeController");
const cron = require("./controllers/cronController");

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
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(robots(path.join(__dirname, "public", "robots.txt")));
app.disable("etag");

//app.use("/api", jsonWebToken.verifyJsonWebToken);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Index Route
app.get("/", (req, res) => {
  res.status(200).send("welcome to this API");
});

// Version 1 API
app.group("/api/v1", router => {
  // Youtube Search API
  router.get("/search", youtube.requestSearchData);

  // Youtube Playlist API
  router.get("/playlist", youtube.requestPlaylistData);

  // Youtube Trending API
  router.get("/trending", youtube.requestTrendingData);

  router.get("/stream", youtube.requestStreamData);

  // Youtube Related Video Search
  router.get("/suggest", youtube.requestRelatedData);

  // Youtube Audio Download
  router.get("/download", youtube.requestRelatedData);
});

// Call Mysql Connection Object
//database.mysqlConnect();

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

new CronJob(
  "* * * 1 * *",
  function() {
    // Execute code here
    cron.logicCronScheduling();
  },
  null,
  true,
  "Asia/Kolkata"
);

// Export
module.exports = app;
