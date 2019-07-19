const express = require('express');

const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/register', UserController.postRegister);

router.post('/login', UserController.postLogin);

module.exports = router;