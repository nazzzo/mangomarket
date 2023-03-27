module.exports = (sequelize, Sequelize) => {
    class Chat extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            content: {
              type: Sequelize.TEXT(),
              allowNull: false,
            },
            touser: {
              type: Sequelize.STRING(16),
              defaultValue: 'all'
            }
          },
          {
            sequelize,
            timestamp: true
          },
        );
      }
      static associate(models) {
          this.belongsTo(models.User, {
              foreignKey: "nickname"
          })
      }
    }
    Chat.createTable();
  };
