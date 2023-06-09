module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
        static createTable() {
            return this.init(
                {
                    email: {
                        primaryKey: true,
                        type: Sequelize.STRING(30),
                        validate: {
                            isEmail: true,
                        },
                    },
                    username: {
                        type: Sequelize.STRING(16),
                        allowNull: false,
                    },
                    userpw: {
                        type: Sequelize.STRING(64),
                        allowNull: false,
                    },
                    birth: {
                        type: Sequelize.DATEONLY,
                        validate: {
                            isAfter: '1900-01-01',
                            isBefore: '2010-01-02',
                        },
                    },
                    phoneNumber: {
                        type: Sequelize.STRING(11),
                        validate: {
                            is: /^010[0-9]{8}$/,
                        },
                    },
                    userImg: {
                        type: Sequelize.STRING(200),
                        allowNull: false,
                        defaultValue: '',
                    },
                    provider: {
                        type: Sequelize.ENUM('local', 'kakao'),
                        allowNull: false,
                        defaultValue: 'local',
                    },
                    snsId: {
                        type: Sequelize.STRING(30),
                        allowNull: true,
                    },
                    level: {
                        type: Sequelize.ENUM('user', 'admin'),
                        allowNull: false,
                        defaultValue: 'user',
                    },
                    address: {
                        type: Sequelize.STRING(50),
                        allowNull: true,
                    },
                    latitude: {
                        type: Sequelize.FLOAT(10, 6),
                        allowNull: true,
                    },
                    longitude: {
                        type: Sequelize.FLOAT(10, 6),
                        allowNull: true,
                    },
                    alarm: {
                        type: Sequelize.BOOLEAN(),
                        defaultValue: false,
                    },
                },
                {
                    sequelize,
                }
            )
        }
        static associate(models) {
            this.hasMany(models.Board, {
                foreignKey: 'email',
            })
            this.hasMany(models.Comment, {
                foreignKey: 'email',
            })
            this.hasMany(models.History, {
                foreignKey: 'email',
            })
            this.hasMany(models.Keyword, {
                foreignKey: 'email',
            })
            this.hasMany(models.PointUp, {
                foreignKey: 'email',
            })
            this.belongsToMany(models.Board, {
                through: 'Hit',
                foreignKey: 'email',
            })
            this.belongsToMany(models.Board, {
                through: 'Liked',
                foreignKey: 'email',
            })
            this.hasMany(models.Community, {
                foreignKey: 'email',
            })
            this.hasMany(models.Temp, {
                foreignKey: 'email',
            })
            this.hasMany(models.Chat, {
                foreignKey: 'email',
                as: 'sender',
            })
            this.hasMany(models.Chat, {
                foreignKey: 'email',
                as: 'receiver',
            })
            this.hasMany(models.Reservation, {
                foreignKey: 'email',
            })
        }
    }
    User.createTable()
}
