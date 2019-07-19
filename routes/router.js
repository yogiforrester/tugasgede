const express = require('express')
const app = express.Router()
const booksController = require('../controllers/booksController.js')
const userController = require('../controllers/userController.js')
const chartController = require('../controllers/chartController')
const categoryController = require('../controllers/kategoryController.js')

const auth = require('../config/auth.js')

app.get('/', (req, res) => {
    res.render('index.ejs')
})


app.post('/user/register', userController.postRegister)
app.post('/user/login', userController.postLogin)

app.get('/books', booksController.getAllBooks)
app.get('/books/findbuku/:id', booksController.getBooksId);
app.post('/books/create', auth.verifyToken, booksController.createBooks);
app.put('/books/update/:id', auth.verifyToken, booksController.updatebooks);
app.delete('/books/delete/:id', auth.verifyToken, booksController.deletebooks);

app.get('/category', categoryController.getAllCategory)
app.post('/category/create', categoryController.createCategory)
app.put('/category/update/:id', categoryController.updateCategory)
app.delete('/category/delete/:id', categoryController.deleteCategory)

app.get('/books/tampilall', booksController.getAllBooks);
app.post('/pesan', auth.verifyToken, chartController.postAddbox );
app.get('/listpesanan', chartController.getAll);


module.exports = app