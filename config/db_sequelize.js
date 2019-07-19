const Sequelize = require('sequelize');

const sequelizes = new Sequelize('IF3_kelompok8_tokobukuku', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  module.exports = sequelizes;


