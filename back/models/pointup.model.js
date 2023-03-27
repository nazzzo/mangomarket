module.exports = (sequelize, Sequelize) => {
    class PointUp extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    email: {
                        type: Sequelize.STRING(16),
                    },
                    boardid: {
                        type: Sequelize.INTEGER,
                    },
                    community: {
                        type: Sequelize.ENUM("0", "1"),
                        defaultValue: "0",
                    },
                    communityid: {
                        type: Sequelize.INTEGER,
                        allowNull: true,
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
            this.belongsTo(models.Board, {
                foreignKey: "boardid",
            });
            this.belongsTo(models.Community, {
                foreignKey: "communityid",
            });
        }
    }
    PointUp.createTable();
};

