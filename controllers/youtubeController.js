"use strict";

const youtube = require("youtube-search");
const dotEnv = require("dotenv");

// Load Environment Variables.
dotEnv.load({ path: ".env" });

// Youtube Parameter
const paramater = {
  maxResults: 20,
  key: process.env.YOUTUBE_API_KEY,
  channel:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI"
};

// Youtube Playlist Data
const playlist = {
  Popular:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
  Latest:
    "https://www.youtube.com/playlist?list=PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
  India:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alF0GjxEs0V_XFCe7LM3ReH",
  Weekly:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
  Electronic:
    "https://www.youtube.com/playlist?list=PLFPg_IUxqnZNnACUGsfn50DySIOVSkiKI",
  Popular_Music_Videos:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
  New_Music_This_Week:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
  Top_Tracks:
    "https://www.youtube.com/playlist?list=PLFgquLnL59alcyTM2lkWJU34KtfPXQDaX",
  Hip_Hop_and_RB_Hotlist:
    "https://www.youtube.com/playlist?list=PLFgquLnL59amBBTCULGWSotJu2CkioYkj",
  Pop_Hotlist:
    "https://www.youtube.com/playlist?list=PLFgquLnL59altZg1f_Kr1kGUYE6j-NE0M",
  Most_Viewed: "https://www.youtube.com/playlist?list=PL8A83124F1D79BD4F"
};

// Request Youtube Search Data
module.exports.requestSearchData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
    // Extract Parameter
    const search = req.query.type;

    return commaSeparatedParameter(search).then(result => {
      return res.status(200).send(result);
    });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Playlist Data
module.exports.requestPlaylistData = (req, res) => {
  // Varibale
  let metadata = {};

  const convertArray = Object.entries(playlist).map(([playlist, url]) => ({
    playlist,
    url
  }));

  // Intialize
  metadata = { count: convertArray.length };

  return res
    .status(200)
    .send(createJsonObject(convertArray, "api/v1/playlist", 200, metadata));
};

// Request Youtube Trending Data
module.exports.requestTrendingData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Call Youtube API
const callYoutubeAPI = type => {
  return new Promise(function(resolve, reject) {
    youtube(type, paramater, function(err, results) {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

// Comma Separated Parameter
const commaSeparatedParameter = async search => {
  // Variable
  let dataArray = [];
  let param = search.split(",");
  const youtube = param.map(async (val, i) => {
    return await callYoutubeAPI(val).then(result => {
      return result;
    });
  });

  return await Promise.all(youtube).then(result => {
    return result;
  });
};

// Create Json Object
const createJsonObject = (data, location, code, metadata) => {
  return JSON.stringify({
    results: data,
    requestLocation: location,
    status: code,
    metadata: metadata
  });
};
