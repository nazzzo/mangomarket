module.exports = (sequelize, Sequelize) => {
  class BoardImage extends Sequelize.Model {
    static createTable() {
      return this.init(
        {
          image: {
            type: Sequelize.TEXT(),
            allowNull: false,
            defaultValue: null,
          },
        },
        {
          sequelize,
        }
      );
    }
    static associate(models) {
    }
  }
  BoardImage.createTable();
};
