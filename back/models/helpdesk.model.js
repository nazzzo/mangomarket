module.exports = (sequelize, Sequelize) => {
    class HelpDesk extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    subject: {
                        type: Sequelize.STRING(100),
                        allowNull: false,
                    },
                    content: {
                        type: Sequelize.TEXT(),
                        allowNull: false,
                    },
                    category: {
                        type: Sequelize.ENUM('계정/인증', '동네생활', '기타'),
                    },
                    pageState: {
                        type: Sequelize.ENUM('문의하기', '신고하기'),
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
    HelpDesk.createTable()
}
