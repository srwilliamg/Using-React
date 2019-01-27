/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const router = express.Router();
const Tasks = require('../models/index').Tasks;
const Users = require('../models/index').Users;

// Consult every task pending user's task
router.post('/consultTasks', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	
	const idUser = req.body.idUser;

	Users.findByPk(idUser,{
		include : ['Tasks']
	})
		.then(user => {
			res.status(200).json(user.Tasks);
		})
		.catch(err => {
			console.log(err);
			res.status(503).json(err);
		})
});

// Edita una tarea en la BD respecto a los adatos enviados (is, nombre, prioridad y fecha)
// Envia true o false respecto a si fue existosa la edición o no.
router.post('/editTask', passport.authenticate('jwt', {
	session: false
}), function (req, res) {
	var params = req.body;

	const id = params.id;
	const idUser = params.idUser;
	const name = params.name;
	const priority = params.priority;
	const date = params.date;

	Tasks.update({
		idUser: idUser,
		name: name,
		priority: priority,
		completionDate: date,
	}, {
		where: {
			idTask: id
		},
	})
	.then((res) => console.log(res))
	.then(() => res.status(200).end())
	.catch(err => res.status(503).json({
		message: "Something was wrong",
		error: err
	}));
});

//Inserta una nueva tarea en la BD respecto alos datos enviados del cliente
//Envia true o false respecto a si fue existosa la inserción o no.
router.post('/createTask', passport.authenticate('jwt', {
	session: false
}), function (req, res) {
	var params = req.body;

	const idUser = params.idUser;
	const name= params.name;
	const priority = params.priority;
	const date = params.date;

	Tasks
		.create({
			idUser: idUser,
			name: name,
			priority: priority,
			completionDate: date,
		})
		.then(task => {
			res.status(200).json(task);
		})
		.catch(err => {
			console.log(err);
			res.status(503).json(err);
		});

});

//logout
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;