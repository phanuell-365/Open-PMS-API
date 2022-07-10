const sequelize = require("../models/config.db");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const Sessions = new SequelizeStore({
  db: sequelize
});

module.exports = Sessions;
