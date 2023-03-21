const {
  sequelize: {
    models: { Comment },
  },
  sequelize,
} = require("../../models/index");

const CommentRepository = require("./comment.repository");
const CommentService = require("./comment.service");
const CommentController = require("./comment.controller");
const config = require("../../config");

const repository = new CommentRepository({ Comment, sequelize });
const service = new CommentService({ commentRepository: repository, config });
const controller = new CommentController({ commentService: service });

module.exports = {
  repository,
  service,
  controller,
};
