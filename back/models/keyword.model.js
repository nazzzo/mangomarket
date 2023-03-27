module.exports = (sequelize, Sequelize) => {
  class Keyword extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          keyword: {
            type: Sequelize.STRING(50),
            allowNull: true,
          },
        },
        {
          sequelize,
        }
      );
    }
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: "boardid",
      });
      this.belongsTo(models.User, {
        foreignKey: "email",
      });
    }
  }
  Keyword.createTable();
};
