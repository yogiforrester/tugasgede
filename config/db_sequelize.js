const sequelize = require('sequelize')

const sequelizes = new sequelize('IF3_kelompok8_tokobukuku', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  module.exports = sequelizes;


