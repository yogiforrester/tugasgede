const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');

module.exports.postRegister = (req, res) => {
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync(req.body.password, salt);

	User
		.findOrCreate({
			where: {email : req.body.email },
			defaults: {
				username: req.body.username,
				email: req.body.email,
				password: hash,
				roles: req.body.roles
			}
		})
		.then((user) => {
			res.json(user);
		})
		.catch((error) => {
			console.log(error);
		})

}

module.exports.postLogin = (req, res) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if(!user){
			res.status(400).send('Username Not Found');
		}

		bcrypt.compare(req.body.password, user.get('password'), function (err, isMatch) {
			if (err) {
				res.status(400).send('password error')
			};

			if (isMatch) {
				jwt.sign({ id: user.get('id'), roles : user.get('roles') }, process.env.SECRETKEY, (error, token) => {
					res.json({token: token});
				})
			} else {
				res.status(400).send('Wrong password')
			}
		})
	})
}
