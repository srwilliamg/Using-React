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
		let pass = bcrypt.compareSync(password, user.get('password'));
		
		if(pass){
			let token = 'JWT '+jwt.sign(user.dataValues, 'reactSecret', {
				expiresIn: 60*1000
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