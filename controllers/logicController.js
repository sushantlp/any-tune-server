"use strict";

// Import Controllers
const api = require("./networkController");

// Comma Separated Parameter
const commaSeparatedParameter = async search => {
  // Variable
  let dataObject = {};
  let param = search.split(",");
  const youtube = param.map(async (val, i) => {
    // Block Variable
    let playlistId = null;
    for (let play in playlist) {
      if (play == val) {
        let playArray = playlist[play].split("list=");
        playlistId = playArray[1];
        break;
      }
    }

    // Youtube Playlist Video Call
    return await api
      .youtubePlaylistVideo(playlistId)
      .then(result => {
        // Create Search JSON
        return createSearchJson(result.data.items, 2)
          .then(result => {
            console.log(val);
            dataObject.val = result;
            return dataObject;
          })
          .catch(error => {
            return Promise.reject(error);
          });
      })
      .catch(error => {
        return Promise.reject(error);
      });
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
    obj.thumbnails = json[i].snippet.thumbnails.high.url;
    obj.channelTitle = json[i].snippet.channelTitle;

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
          obj.viewCount = data[j].statistics.viewCount;
          obj.videoId = data[j].id;
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
