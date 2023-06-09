module.exports = (sequelize, Sequelize) => {
    class Community extends Sequelize.Model {
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
                        type: Sequelize.ENUM('잡담', '질문', '정보공유', '요청', '공지사항'),
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
            this.hasMany(models.Comment, {
                foreignKey: 'communityid',
            })
            this.hasMany(models.PointUp, {
                foreignKey: 'communityid',
            })
        }
    }
    Community.createTable()
}
