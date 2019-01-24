var express = require('express');
var router = express.Router();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', function (req, res) {
	// var parametros = JSON.parse(Buffer.from(req.body.data, 'base64'));
	console.log('Request:',req.body);
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({
		where: {email: email}
	})
	.then(user => {
		// console.log('Query result:',user);
		let pass = user.get('password') == bcrypt.hashSync(password, 10);
		// console.log(user.get('password'), bcrypt.hashSync(password, 10));
		
		if(pass){
			let token = jwt.sign(user.dataValues, 'reactSecret', {
				expiresIn: 600000
			});
			res.json({...user.dataValues, ...{token:token}});
		}
		else{
			res.json({
				message: 'Password incorrect'
			});
		}
	})
	.catch(err => {
		console.log(err);
		res.json({
			message: 'Something is not working'
		});
	});
});

module.exports = router;