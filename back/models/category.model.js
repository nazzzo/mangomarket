module.exports = (sequelize, Sequelize) => {
    class Category extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            path: {
              type: Sequelize.STRING(100),
              allowNull: false,
            },
            name: {
                type: Sequelize.STRING(100),
                allowNull: false,
              },
            isLogin: {
                type: Sequelize.BOOLEAN,
              },  
          },
          {
            sequelize,
            timestamps: false
          }
        );
      }
    }
    Category.createTable();
  };