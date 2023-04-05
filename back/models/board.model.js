module.exports = (sequelize, Sequelize) => {
    class Board extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    subject: {
                        type: Sequelize.STRING(100),
                        allowNull: false,
                    },
                    content: {
                        type: Sequelize.TEXT,
                        allowNull: false,
                    },
                    state: {
                        type: Sequelize.ENUM('blind', 'reserved', 'sold', 'public'),
                        defaultValue: 'public',
                        allowNull: false,
                    },
                    location: {
                        type: Sequelize.TEXT(),
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
            this.belongsTo(models.BoardCategory, {
                foreignKey: "category",
            });
            this.hasMany(models.BoardImage, {
                foreignKey: "boardid",
            })
            this.hasMany(models.PointUp, {
                foreignKey: 'boardid',
            })
            this.belongsToMany(models.User, {
                through: 'Hit',
                foreignKey: 'boardid',
            })
            this.belongsToMany(models.User, {
                through: 'Liked',
                foreignKey: 'boardid',
            })
            this.belongsToMany(models.Hash, {
                through: 'Hashtag',
                foreignKey: 'boardid',
            })
            this.belongsToMany(models.Keyword, {
                through: 'BoardKeyword',
                foreignKey: 'boardId'
            })
            this.hasMany(models.Chat, {
                foreignKey: 'boardid',
                as: "boardid"
            })
        }
    }
    Board.createTable()
}
