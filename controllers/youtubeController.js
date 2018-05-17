"use strict";

const youtube = require("youtube-search");
const dotEnv = require("dotenv");

// Load Environment Variables.
dotEnv.load({ path: ".env" });

// Youtube Parameter
const paramater = {
  maxResults: 20,
  key: process.env.YOUTUBE_API_KEY
};

// Request Youtube Search Data
module.exports.requestSearchData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
    // Extract Parameter
    const search = req.query.type;

    const response = commaSeparatedParameter(search);

    return res.status(400).send(response);
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Playlist Data
module.exports.requestPlaylistData = (req, res) => {};

// Request Youtube Trending Data
module.exports.requestTrendingData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Call Youtube API
const callYoutubeAPI = type => {
  youtube(type, paramater, function(err, results) {
    if (err) return err;
    return results;
  });
};

// Comma Separated Parameter
/*const commaSeparatedParameter = async (search) => {
  let param = search.split(",");
  
  const youtube = param.map((val) => {
    
  });
}; */

function commaSeparatedParameter(search) {}

function doLater() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done");
    }, 1000);
  });
}

async function chainStart() {
  return await doLater();
}

doLater()
  .then(val => {
    console.log(val);
  })
  .catch(error => {
    console.log(error);
  });
