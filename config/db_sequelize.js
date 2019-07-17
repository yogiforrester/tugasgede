const Sequelize = require('sequelize');

const sequelize = new Sequelize('IF3_kelompok8_bukuku', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  module.exports = sequelize;


