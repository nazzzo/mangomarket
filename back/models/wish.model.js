module.exports = (sequelize, Sequelize) => {
    class Hash extends Sequelize.Model {
      static createTable() {
        return this.init(
          {
            tagname: {
              type: Sequelize.STRING(30),
              allowNull: false,
              primaryKey: true,
            },
          },
          {
            sequelize
          }
        );
      }
      static associate(models) {
        this.belongsToMany(models.Board, {
          through: "Hashtag",
          foreignKey: 'tagname'
        })
      }
    }
    Hash.createTable();
  };
  