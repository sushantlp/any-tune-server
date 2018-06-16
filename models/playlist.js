"use strict";

module.exports = (sequelize, DataTypes) => {
  var Playlist = sequelize.define(
    "playlist",
    {
      playlist_id: DataTypes.INTEGER,
      playlist_name: DataTypes.STRING,
      playlist_url: DataTypes.TEXT,
      status: DataTypes.BOOLEAN
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Playlist;
};
