"use strict";
module.exports = (sequelize, DataTypes) => {
  var YoutubeCollection = sequelize.define(
    "youtube_collections",
    {
      youtube_id: DataTypes.STRING,
      playlist_id: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      thumb: DataTypes.STRING,
      uploader: DataTypes.STRING,
      duration: DataTypes.STRING,
      views: DataTypes.STRING,
      published_at: DataTypes.DATE,
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
  return YoutubeCollection;
};
