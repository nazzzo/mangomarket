const {
    sequelize: {
        models: { Board, BoardImage, Temp, History, Hashtag, Comment, User, Hash, Liked, Hit, PointUp },
    },
    sequelize,
} = require("../../models/index");

const { Sequelize } = require("sequelize");
const BoardRepository = require("./board.repository");
const BoardService = require("./board.service");
const BoardController = require("./board.controller");
const UserRepository = require("../users/user.repository")
const JWT = require("../../lib/jwt");
const crypto = require("crypto");
const config = require("../../config");
console.log(config);

const jwt = new JWT({ crypto });

const userRepository = new UserRepository({ sequelize, User, PointUp, Sequelize });
const repository = new BoardRepository({ sequelize, Board, BoardImage, Temp, History, Hashtag, Comment, User, Hash, Liked, Hit, PointUp, Sequelize });
const service = new BoardService({ boardRepository: repository,  userRepository, config, jwt });
const controller = new BoardController({ boardService: service });

module.exports = {
    repository,
    service,
    controller,
};

