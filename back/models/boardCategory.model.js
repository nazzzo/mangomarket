module.exports = (sequelize, Sequelize) => {
  class BoardCategory extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          category: {
            type: Sequelize.STRING(50),
            primaryKey: true
          },
        },
        {
          sequelize,
        }
      );
    }
    static associate(models) {
      this.hasMany(models.Board, {
        foreignKey: "category",
      });
    }
  }
  BoardCategory.createTable();
};
