const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");
const config = require("../config");
const db = config.db[config.env];

const sequelize = new Sequelize(db.database, db.username, db.password, db);

fs.readdirSync(__dirname)
    .filter((v) => v.indexOf("model") !== -1)
    .forEach((filename) => {
        require(path.join(__dirname, filename))(sequelize, Sequelize);
    });

const { models } = sequelize;

for (const v in models) {
    if (typeof models[v].associate !== "function") continue;
    sequelize.models[v].associate(models);
}

module.exports = {
    sequelize,
};

