const {
    sequelize: {
        models: { Community, User, Comment, HelpDesk },
    },
    sequelize,
} = require('../../models/index')

const { Sequelize } = require('sequelize')
const CommunityRepository = require('./community.repository')
const CommunityService = require('./community.service')
const CommunityController = require('./community.controller')
const config = require('../../config')
const UserRepository = require('../users/user.repository')

const userRepository = new UserRepository({ sequelize, User, Sequelize })
const repository = new CommunityRepository({ Community, sequelize, User, Comment, HelpDesk })
const service = new CommunityService({ communityRepository: repository, config, userRepository })
const controller = new CommunityController({ communityService: service })

module.exports = {
    repository,
    service,
    controller,
}
