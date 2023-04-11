module.exports = (sequelize, Sequelize) => {
    class Temp extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    tempContent: {
                        type: Sequelize.TEXT(),
                        alloswNull: true,
                    },
                    tempSubject: {
                        type: Sequelize.STRING(100),
                        allowNull: true,
                    },
                },
                {
                    sequelize,
                    timestamps: true,
                }
            )
        }
        static associate(models) {
            this.belongsTo(models.User, {
                foreignKey: 'email',
            })
        }
    }
    Temp.createTable()
}
