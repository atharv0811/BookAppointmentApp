const { Sequelize } = require("sequelize");
const sequelize = require("../util/db");
const data = sequelize.define('appointments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        notNull: true
    },
    name: {
        type: Sequelize.STRING,
        notNull: true
    },
    phoneNo: {
        type: Sequelize.DECIMAL,
        notNull: true
    },
    email: {
        type: Sequelize.STRING,
        notNull: true
    }
});

module.exports = data;