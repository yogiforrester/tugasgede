const books = require('../models/books.js')
const kategory = require('../models/Kategory.js')
const fs = require('fs')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
books.belongsTo(kategory)

module.exports.getAllBooks = (req, res) => {
    books.findAll().then((books) => {
        res.json(books)
    })
}

module.exports.getBooksId = (req, res) => {
	books.findByPk(req.params.id).then(buku => {
		res.json(buku)
	})
}

module.exports.createBooks = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error,authData)=>{
		if (error) {
			res.sendStatus(403);
		}else{
			if (authData['roles']=="admin") {
    books.create({
        judul_buku: req.body.judul_buku,
        pengarang: req.body.pengarang,
        penerbit: req.body.penerbit,
        jumlah_hal: req.body.jumlah_hal,
        harga: req.body.harga,
        deskripsi_buku: req.body.deskripsi_buku,
        tanggal_rilis: req.body.tanggal_rilis,
        category_name: req.body.kategori_name
    }).then((books) => {
        res.json(books)
    })

        }else{
            res.json("anda Harus Login Sebagai Admin Untuk Bisa menambah Buku")
         }
    }
}
)}

module.exports.updatebooks = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error,authData)=>{
        if (error) {
            res.sendStatus(403);
    }else{
        if (authData['roles']=="admin") {
        books.update({
            judul_buku: req.body.judul_buku,
            pengarang: req.body.pengarang,
            penerbit: req.body.penerbit,
            jumlah_hal: req.body.jumlah_hal,
            harga: req.body.harga,
            deskripsi_buku: req.body.deskripsi_buku,
            tanggal_rilis: req.body.tanggal_rilis,
            category_name: req.body.category_name,
            categoryId: req.body.id_kategori
         }, {
            where: {
                id: req.params.id
             }
        }).then((books) => {
              res.json(books);
        }).catch((error) => {
             throw error;
        })
    }
    }
    }
    )
}


module.exports.deletebooks = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error,authData)=>{
        if (error) {
            res.sendStatus(403);
        }else{
            if (authData['roles']=="admin") {
        books.destroy({
            where: {
                id: req.params.id
        }   
    }).then((books) => {
        res.json(books);
    }).catch((error) => {
        throw error;
    })
        }
        }
    })
}

