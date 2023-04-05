const {
    sequelize: {
        models: { Community, User, Comment, HelpDesk },
    },
    sequelize,
} = require('../../models/index')

const { Sequelize } = require('sequelize')
const HelpDeskRepository = require('./helpdesk.repository')
const HelpDeskService = require('./helpdesk.service')
const HelpDeskController = require('./helpdesk.controller')
const config = require('../../config')
const UserRepository = require('../users/user.repository')

const userRepository = new UserRepository({ sequelize, User, Sequelize })
const repository = new HelpDeskRepository({ HelpDesk, Community, sequelize, User, Comment })
const service = new HelpDeskService({ helpdeskRepository: repository, config, userRepository })
const controller = new HelpDeskController({ helpdeskService: service })

module.exports = {
    repository,
    service,
    controller,
}
