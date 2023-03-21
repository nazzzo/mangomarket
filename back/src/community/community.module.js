const {
  sequelize: {
    models: { Community },
  },
  sequelize,
} = require("../../models/index");

const CommunityRepository = require("./community.repository");
const CommunityService = require("./community.service");
const CommunityController = require("./community.controller");
const config = require("../../config");

const repository = new CommunityRepository({ Community, sequelize });
const service = new CommunityService({ communityRepository: repository, config });
const controller = new CommunityController({ communityService: service });

module.exports = {
  repository,
  service,
  controller,
};
