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
            validate: {
              is: /^[A-Za-z가-힣0-9]{2,16}$/,
            },
          },
          userpw: {
            type: Sequelize.STRING(64),
            allowNull: false,
          },
          birth: {
            type: Sequelize.DATEONLY,
            validate: {
              isAfter: "1900-01-01",
              isBefore: "2010-01-02",
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
            defaultValue: "",
          },
          provider: {
            type: Sequelize.ENUM("local", "kakao"),
            allowNull: false,
            defaultValue: "local",
          },
          snsId: {
            type: Sequelize.STRING(30),
            allowNull: true,
          },
          level: {
            type: Sequelize.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
        },
        {
          sequelize,
        }
      );
    }
    static associate(models) {
      this.hasMany(models.Community, {
        foreignKey: "email",
      });
    }
  }
  User.createTable();
};
