module.exports = (sequelize, Sequelize) => {
  class Chat extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          content: {
            type: Sequelize.TEXT(),
            allowNull: false,
          },
          sender: {
            type: Sequelize.STRING(30),
            allowNull: false,
            references: {
              model: "User",
              key: "email",
            },
          },
          receiver: {
            type: Sequelize.STRING(30),
            allowNull: false,
            references: {
              model: "User",
              key: "email",
            },
          },
        },
        {
          sequelize,
          timestamps: true
        },
      );
    }
    static associate(models) {
      this.belongsTo(models.Board, {
        foreignKey: "boardid",
      });
    }
  }
  Chat.createTable();
};
