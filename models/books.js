const Sequelize = require('sequelize')

const sequelize = require('../config/db_sequelize.js')

class Book extends Sequelize.Model {}

Book.init({
	judul_buku: Sequelize.STRING,
	pengarang: Sequelize.STRING,
	penerbit: Sequelize.STRING,
	jumlah_hal: Sequelize.STRING,
	harga: Sequelize.INTEGER,
	deskripsi_buku: Sequelize.STRING,
	tanggal_rilis: Sequelize.DATE,
	category_name: Sequelize.STRING,
	categoryId: Sequelize.INTEGER
}, {
	sequelize,
	modelName: 'book'
});

module.exports = Book;