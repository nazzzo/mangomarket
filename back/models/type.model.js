module.exports = (sequelize, Sequelize) => {
    class Type extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
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
          })
      }
    }
    Type.createTable();
  };
  