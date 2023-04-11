module.exports = (sequelize, Sequelize) => {
  class Reservation extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          reservation: {
            type: Sequelize.TEXT(),
            allowNull: false,
          },
          address: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          latitude: {
            type: Sequelize.FLOAT(10,6),
            allowNull: false,
          },
          longitude: {
            type: Sequelize.FLOAT(10,6),
            allowNull: false,
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
      this.belongsTo(models.Chat, {
        foreignKey: "chatid",
      });
    }
  }
  Reservation.createTable();
};
