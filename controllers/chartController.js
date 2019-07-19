const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const Cart = require('../models/keranjang');
module.exports.getAll = (req, res) =>{
	Cart.findAll().then(Cart=> {
		res.json(Cart);
	}).catch((error)=>{
		console.log(error);
	});
}

module.exports.postAddbox = (req, res) =>{
	jwt.verify(req.token, process.env.SECRETKEY, (error,authData)=>{
		if (error) {
				res.sendStatus(403);
		}else{
			if (authData['roles']=="user") {
                var bookId = req.body.bookId;
				Cart.create({
						userId: authData['id'],
						bookId : bookId
				})
				.then(Cart => {
						res.json(Cart);
				});
			}else{
				res.send("Anda Harus Login Menggunakan Akun User jangan Akun Admin");
			}
		}
	});
}