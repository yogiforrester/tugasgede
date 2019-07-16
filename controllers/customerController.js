const bcrypt = require('bcryptjs')
const customer = require('../models/customer.js')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config();


module.exports.getIndexCustomer = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'OK',
                authData: authData
            })
        }
    })
}


module.exports.postRegister = (req, res) => {
    var salt = bcrypt.genSaltSync(10)
    var hash = bcrypt.hashSync(req.body.password, salt)

    customer.findOrCreate({
        where: {
            email: req.body.email
        },
        defaults: {
            nama: req.body.nama,
            username: req.body.username,
            email: req.body.email,
            password: hash
        }
    }).then((customer) => {
        res.json(customer)
    }).catch((error) => {
        console.log(error)
    })
}

module.exports.postLogin = (req, res) => {
    customer.findOne({
        where: {
            username: req.body.username
        }
    }).then((customer) => {
        if (!customer) {
            res.status(400).send('Username not found')
        }
        bcrypt.compare(req.body.password, customer.get('password'), function (err, isMatch) {
            if (err) {
                res.status(400).send('Password Error')
            }

            if (isMatch) {
                jwt.sign({
                    id: customer.get('id')
                }, process.env.SECRETKEY, (error, token) => {
                    res.json({
                        token: token
                    })
                })
            } else {
                res.status(400).send('Wrong Password')
            }
        })
    })
}