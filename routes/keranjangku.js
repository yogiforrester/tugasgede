const express = require('express');

const CartController = require('../controllers/chartcontroller');

const router = express.Router();

const auth = require('../configs/auth');

router.post('/',  CartController.getAll);

router.post('/postCart', auth.verifyToken, CartController.postAddCart);


module.exports = router;