"use strict";

// Import
const dotEnv = require("dotenv");
const axios = require("axios");

// Constant Value
const SEARCH_API = "https://www.googleapis.com/youtube/v3/search?";
const VIDEO_PLAYLIST_API =
  "https://www.googleapis.com/youtube/v3/playlistItems?";
const VIDEO_DETAIL_API = "https://www.googleapis.com/youtube/v3/videos?";
const MAX_RESULT = 25;

// Load Environment Variables.
dotEnv.load({ path: ".env" });

// Youtube Search API Call
module.exports.youtubeSearchCall = async search => {
  try {
    // URL
    const URL =
      SEARCH_API +
      `type=video&q=${search}&maxResults=${MAX_RESULT}&part=snippet&key=${
        process.env.YOUTUBE_API_KEY
      }`;

    return await axios.get(URL);
  } catch (error) {
    return Promise.reject(error);
  }
};
