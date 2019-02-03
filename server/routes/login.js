var express = require('express');
var router = express.Router();
const User = require('../models/index').Users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', (req, res) => {
	// var parametros = JSON.parse(Buffer.from(req.body.data, 'base64'));
	console.log('Request:',req.body);
	var params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({
		where: {email: email}
	})
	.then(user => {

		if(!user){
			throw "error";
		}
		
		let pass = bcrypt.compareSync(password, user.get('password'));
		
		if(pass){
			let token = 'JWT '+jwt.sign(user.dataValues, 'OtherSecret', {
				expiresIn: 60*1000
			});
			res.status(200).json(
				{
					token:token, 
					name: user.name, 
					name2: user.name2,
					lastname: user.lastname,
					lastname2: user.lastname2,
					email: user.email
				}
			);
		}
		else{
			res.status(401).json({
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