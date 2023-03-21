require("dotenv").config();
const BadRequest = require("./exceptions/BadRequest");

const config = {
  exception: {
    BadRequest,
  },
  salt: process.env.SALT,
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || "",
  db: {
    development: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      port: process.env.DB_PORT || "",
      host: process.env.DB_HOST || "",
      dialect: "mysql",
      define: { freezeTableName: true, timestamp: false },
    },
    test: {
      username: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_DATABASE || "",
      port: process.env.DB_PORT || "",
      host: process.env.DB_HOST || "",
      dialect: "mysql",
      logging: false,
    },
  },
};


module.exports = config