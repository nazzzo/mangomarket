const {
    sequelize: {
        models: { User, Temp },
    },
    sequelize,
} = require('../../models/index')

const TempRepository = require('./temp.repository')
const TempService = require('./temp.service')
const TempController = require('./temp.controller')

const repository = new TempRepository({ sequelize, User, Temp })
const service = new TempService({ tempRepository: repository })
const controller = new TempController({ tempService: service })

module.exports = {
    repository,
    service,
    controller,
}
