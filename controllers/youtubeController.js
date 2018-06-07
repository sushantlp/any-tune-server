"use strict";

// Import Package
const circularJSON = require("circular-json");

// Import Controllers
const api = require("./networkController");
const database = require("./databaseController");

// Youtube Playlist Data
/*const playlist = {
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
}; */

// Request Youtube Search Data
module.exports.requestSearchData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
    // Extract Parameter
    const search = req.query.type;

    // Youtube Search API Call
    return api
      .youtubeSearchCall(search)
      .then(result => {
        // Create Search JSON
        createSearchJson(result.data.items, 1)
          .then(result => {
            // Intialize
            const metadata = { count: result.length, type: search };

            return res
              .status(200)
              .send(createJsonObject(result, "api/v1/search", 200, metadata));
          })
          .catch(error => {
            return res.status(400).send("Oops our bad!!!");
          });
      })
      .catch(error => {
        return res
          .status(400)
          .send(
            "Oops our bad!!!" /*circularJSON.stringify(error.response.statusText)*/
          );
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Playlist Data
module.exports.requestPlaylistData = (req, res) => {
  // Varibale
  let metadata = {};

  /*const convertArray = Object.entries(playlist).map(([playlist, url]) => ({
    playlist,
    url
  })); */

  return database
    .getPlaylistData(1)
    .then(result => {
      // Intialize
      metadata = { count: result.length };

      return res
        .status(200)
        .send(createJsonObject(result, "api/v1/playlist", 200, metadata));
    })
    .catch(error => {
      return res.status(400).send("Oops our bad!!!");
    });
};

// Request Youtube Trending Data
module.exports.requestTrendingData = (req, res) => {
  if (req.query.type !== undefined && req.query.type !== "") {
    // Extract Parameter
    const search = req.query.type;

    return commaSeparatedParameter(search)
      .then(result => {
        // Intialize
        let metadata = { count: Object.keys(result).length, type: search };

        return res
          .status(200)
          .send(createJsonObject(result, "api/v1/trending", 200, metadata));
      })
      .catch(error => {
        console.log(error);
        return res.status(400).send("Oops our bad!!!");
      });
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Stream Data
module.exports.requestStreamData = (req, res) => {
  if (req.query.url !== undefined && req.query.url !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Related Video Data
module.exports.requestRelatedData = (req, res) => {
  if (req.query.url !== undefined && req.query.url !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
};

// Request Youtube Audio Download
module.exports.requestDownloadData = (req, res) => {
  if (req.query.url !== undefined && req.query.url !== "") {
  } else {
    return res.status(400).send("Not a good api call");
  }
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

// Comma Separated Parameter
const commaSeparatedParameter = async search => {
  // Variable
  let dataObject = {};
  let param = search.split(",");

  const youtube = param.map(async (val, i) => {
    // Block Variable
    let playlistId = undefined;
    let underscore = undefined;
    for (let play in playlist) {
      underscore = val.replace(/ /g, "_");
      if (play == underscore) {
        let playArray = playlist[play].split("list=");
        playlistId = playArray[1];
        break;
      }
    }

    // Check Value Undefined
    if (typeof playlistId !== undefined) {
      // Youtube Playlist Video Call
      return await api
        .youtubePlaylistVideo(playlistId)
        .then(result => {
          // Create Search JSON
          return createSearchJson(result.data.items, 2)
            .then(result => {
              return (dataObject[underscore] = result);
            })
            .catch(error => {
              return Promise.reject(error);
            });
        })
        .catch(error => {
          return Promise.reject(error);
        });
    }
  });

  return await Promise.all(youtube).then(result => {
    return Promise.resolve(dataObject);
  });
};

// Create Search JSON
const createSearchJson = async (json, status) => {
  // Variable
  let arr = [];

  for (let i = 0; i < json.length; i++) {
    // Block Variable
    let obj = {};
    let videoId = undefined;

    obj.publishedAt = json[i].snippet.publishedAt;
    obj.title = json[i].snippet.title;
    obj.description = json[i].snippet.description;
    obj.thumb = json[i].snippet.thumbnails.medium.url;
    obj.uploader = json[i].snippet.channelTitle;

    if (status == 1) {
      videoId = json[i].id.videoId;
    } else {
      videoId = json[i].snippet.resourceId.videoId;
    }

    // Youtube Video Detail API Call
    await api
      .youtubeVideoCall(videoId)
      .then(result => {
        // Variable
        const data = result.data.items;
        for (let j = 0; j < data.length; j++) {
          obj.duration = data[j].contentDetails.duration;
          obj.views = data[j].statistics.viewCount;
          obj.id = data[j].id;
          obj.suggest_url = `api/v1/suggest?url=${data[j].id}`;
          obj.stream_url = `api/v1/stream?url=${data[j].id}`;
          obj.get_url = `api/v1/download?url=${data[j].id}`;
          //obj.stream = data[j].player;

          // Push Array
          arr.push(obj);
        }
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
  return Promise.resolve(arr);
};
