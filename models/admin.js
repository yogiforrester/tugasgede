const Sequelize = require('sequelize');

const sequelize = require('../config/db_sequelize.js');

class Admin extends Sequelize.Model {}

Admin.init({
    nama: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    sequelize,
    modelName: 'admin'
});

module.exports = Admin;