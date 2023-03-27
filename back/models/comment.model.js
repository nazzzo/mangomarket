module.exports = (sequelize, Sequelize) => {
    class Comment extends Sequelize.Model {
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
                    timestamp: true,
                }
            );
        }
        static associate(models) {
            this.belongsTo(models.Community, {
                foreignKey: "communityid",
            });
            this.belongsTo(models.User, {
                foreignKey: "email",
            });
            this.hasMany(models.PointUp, {
                foreignKey: "commentid",
            });
        }
    }
    Comment.createTable();
};

