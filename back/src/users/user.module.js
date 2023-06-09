const {
    sequelize: {
        models: { User, PointUp, Keyword },
    },
    sequelize,
} = require("../../models");

const { Sequelize } = require("sequelize");
const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");

const JWT = require("../../lib/jwt");
const crypto = require("crypto");
const config =require("../../config")
const SALT = config.salt

const jwt = new JWT({ crypto, SALT })
const userRepository = new UserRepository({ sequelize, User, PointUp, Keyword, Sequelize });
const userService = new UserService({ userRepository, jwt, config });
const userController = new UserController({ userService });

module.exports = {
    userRepository,
    userController,
};
