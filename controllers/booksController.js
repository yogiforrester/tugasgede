const books = require('../models/books.js')
const kategory = require('../models/Kategory.js')
const Katalogku = require('../models/Katalogku.js')
const fs = require('fs')

books.belongsTo(kategory)
books.belongsTo(katalogku)

module.exports.getAllBooks = (req, res) => {
    books.findAll().then((books) => {
        res.json(books)
    })
}

module.exports.createBooks = (req, res) => {
    books.create({
        judul_buku: req.body.judul_buku,
        pengarang: req.body.pengarang,
        penerbit: req.body.penerbit,
        jumlah_hal: req.body.jumlah_hal,
        gambar: req.body.gambar,
        harga: req.body.harga,
        deskripsi_buku: req.body.deskripsi_buku,
        tanggal_rilis: req.body.tanggal_rilis,
        categoryId: req.body.id_kategori,
        catalogId: req.body.id_katalog
    }).then((books) => {
        res.json(books)
    })
}