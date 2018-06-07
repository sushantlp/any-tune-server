/**
 * Database Connection
 */

"use strict";

// Import
const mysql = require("mysql2");
const dotEnv = require("dotenv");
const Sequelize = require("sequelize");
const bluebird = require("bluebird");
const moment = require("moment");

// Load Environment Variables from .env file.
dotEnv.load({ path: ".env" });

// Current Date and Time
const now = moment()
  .tz("Asia/Kolkata")
  .format("YYYY-MM-DD HH-m-ss");

// Mysql Connection Object
module.exports.mysqlConnect = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    Promise: bluebird
  });
};

// Call Mysql Connection Function
const mysqlObject = this.mysqlConnect();

// Sequelize Connection
module.exports.sequelizeConnection = () => {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DRIVER,
      pool: {
        max: 90,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });

  return sequelize;
};

/**
 * Start Database Read and Write
 */

// Get Youtube Playlist Data
module.exports.getPlaylistData = async status => {
  try {
    // Query
    const query = "SELECT * FROM `playlists` WHERE `status`=?";

    return await mysqlObject.execute(query, [status]);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * End Database Read and Write
 */
