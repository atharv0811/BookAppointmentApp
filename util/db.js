const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('appointment_db', 'root', 'Atharv08112002', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;