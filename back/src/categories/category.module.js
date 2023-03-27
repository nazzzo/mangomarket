const {
    sequelize: {
      models: { Category, BoardCategory },
    },
    sequelize,
  } = require("../../models/index");
  
  const CategoryRepository = require("./category.repository");
  const CategoryService = require("./category.service");
  const CategoryController = require("./category.controller");
  const config = require("../../config");
  
  const repository = new CategoryRepository({ Category, BoardCategory, sequelize });
  const service = new CategoryService({ categoryRepository: repository, config });
  const controller = new CategoryController({ categoryService: service });
  
  module.exports = {
    controller,
  };
  