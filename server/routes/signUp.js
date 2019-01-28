const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.post('/', function (req, res) {
	sess = req.session;
	const params = req.body;

	const name = params.name;
	const name2 = params.name2;
	const lastName = params.lastName;
	const lastName2 = params.lastName2;
	const email = params.email;
	const password = params.password;

	db.Users
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
			res.status(200).json(user);
		})
		.catch(err => {
			console.log(err);
			res.status(503).json({message:'An error has occurred, try again.', error:err});
		});
});

module.exports = router;