"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "playlists",
      [
        {
          playlist_name: "Popular",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Latest",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59akA2PflFpeQG9L01VFg90wS",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "India",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59alF0GjxEs0V_XFCe7LM3ReH",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Weekly",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Electronic",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFPg_IUxqnZNnACUGsfn50DySIOVSkiKI",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Popular_Music_Videos",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "New_Music_This_Week",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Top_Tracks",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59alcyTM2lkWJU34KtfPXQDaX",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Hip_Hop_and_RB_Hotlist",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59amBBTCULGWSotJu2CkioYkj",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Pop_Hotlist",
          playlist_url:
            "https://www.youtube.com/playlist?list=PLFgquLnL59altZg1f_Kr1kGUYE6j-NE0M",
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          playlist_name: "Most_Viewed",
          playlist_url:
            "https://www.youtube.com/playlist?list=PL8A83124F1D79BD4F",
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("playlists", null, {});
  }
};
