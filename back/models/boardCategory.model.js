module.exports = (sequelize, Sequelize) => {
    class BoardCategory extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            category: {
              type: Sequelize.STRING(50),
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
          })
      }
    }
    BoardCategory.createTable();
  };