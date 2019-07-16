const express = require('express')
const app = express.Router()
const booksController = require('../controllers/booksController.js')
const customerController = require('../controllers/customerController.js')
const categoryController = require('../controllers/kategoryController.js')
const catalogController = require('../controllers/katalogkuController.js')
const auth = require('../config/auth.js')
/*
Baris Ini diisi oleh instansiasi model
*/

//Masuk Ke Koding Router

app.get('/', (req, res) => {
    res.render('index.nj')
})

app.get('/customer', auth.verifyToken, customerController.getIndexCustomer)
app.post('/customer/register', customerController.postRegister)
app.post('/customer/login', customerController.postLogin)

app.get('/books', booksController.getAllBooks)
app.post('/books/create', booksController.createBooks)


app.get('/books/category', categoryController.getAllCategory)
app.post('/books/category/create', categoryController.createCategory)
app.post('/books/category/update', categoryController.updateCategory)
app.post('/books/category/delete', categoryController.deleteCategory)

app.get('/books/catalog', catalogController.getAllCatalog)
app.post('/books/catalog/create', catalogController.createCatalog)
app.post('/books/catalog/update', catalogController.updateCatalog)
app.post('/books/catalog/delete', catalogController.deleteCatalog)

app.use(function (req, res, next) {
    res.status(404).render('partials/404notfound.nj');
});

module.exports = app