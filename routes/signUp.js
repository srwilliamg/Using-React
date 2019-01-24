const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.post('/', function (req, res) {
	sess = req.session;
	const params = req.body;

	const name = params.name;
	const name2 = params.name2;
	const lastName = params.lastName;
	const lastName2 = params.lastName2;
	const email = params.email;
	const password = params.password;

	User
		.create({
			name: name,
			name2: name2,
			lastName: lastName,
			lastName2: lastName2,
			email: email,
			password: password,
		})
		.then(user => {
			console.log(user); 
			res.json(user);
		})
		.catch(err => {
			console.log(err);
			res.json({message:'Something is not working'});
		});
});

function notNull(param) {
	let x = param.trim();
	return x == null || x == undefined || x == '';
}

module.exports = router;