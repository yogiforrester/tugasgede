const Sequelize = require('sequelize');

const sequelize = require('../config/db_sequelize');

class keranjang extends Sequelize.Model {}

keranjang.init({
  bookId: Sequelize.INTEGER,
  userId: Sequelize.INTEGER
}, { sequelize, modelName: 'keranjang' });

module.exports = keranjang;