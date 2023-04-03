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
      this.belongsTo(models.User, {
        foreignKey: "email",
      });
      this.belongsToMany(models.Board, {
        through: 'BoardKeyword',
        foreignKey: 'keywordId'
      });
    }
  }
  Keyword.createTable();
};
