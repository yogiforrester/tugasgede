const sequelize = require('sequelize')

const sequelize = new Sequelize('IF3_kelompok8_bukuku', 'root', 'lpkia1989', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  module.exports = sequelize;
