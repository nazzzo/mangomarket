const {
    sequelize: {
      models: { User, Board, Chat },
    },
    sequelize,
  } = require("../../models/index");
  
  const { Sequelize } = require("sequelize");
  const ChatRepository = require("./chat.repository");
  const ChatService = require("./chat.service");
  const ChatController = require("./chat.controller");
  const config = require("../../config");
  
  const repository = new ChatRepository({ Chat, Board, User, sequelize, Sequelize });
  const service = new ChatService({ chatRepository: repository, config });
  const controller = new ChatController({ chatService: service });
  
  module.exports = {
    controller,
    repository
  };
  