const Sequelize = require('sequelize');

const sequelize = require('../config/db_sequelize.js');

class Customer extends Sequelize.Model {}

Customer.init({
    nama: Sequelize.STRING,
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING
}, {
    sequelize,
    modelName: 'customer'
});

module.exports = Customer;