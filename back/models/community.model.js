module.exports = (sequelize, Sequelize) => {
  class Community extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          content: {
            type: Sequelize.TEXT(),
            allowNull: false,
          },
        },
        {
          sequelize,
          timestamps: true
        }
      );
    }
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: "email"
        })
    }
  }
  Community.createTable();
};