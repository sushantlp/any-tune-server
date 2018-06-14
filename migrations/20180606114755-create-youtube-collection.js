"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("youtube_collections", {
      collect_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      youtube_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      playlist_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "playlists", key: "playlist_id" }
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      thumb: {
        type: Sequelize.STRING,
        allowNull: false
      },
      uploader: {
        type: Sequelize.STRING,
        allowNull: false
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: false
      },
      views: {
        type: Sequelize.STRING,
        allowNull: false
      },
      published_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
      },
      createdAt: {
        field: "created_at",
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        field: "updated_at",
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("youtube_collections");
  }
};
