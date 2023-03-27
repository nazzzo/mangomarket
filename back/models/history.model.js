module.exports = (sequelize, Sequelize) => {
    class History extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            email: {
              type: Sequelize.STRING(16),
              primaryKey: true,
            },
            boardid: {
              type: Sequelize.INTEGER,
              primaryKey: true,
            },
          },
          {
            sequelize,
            timestamps: true,
          }
        );
      }
      static associate(models) {
        this.belongsTo(models.User, {
          foreignKey: "email",
        });
      }
    }
    History.createTable();
  };
  