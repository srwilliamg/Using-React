/* eslint-disable no-console */
const express = require('express');
const passport = require('passport');
const router = express.Router();
const Tasks = require('../models/tasks');

// Consult every task pending user's task
router.post('/consultTasks', passport.authenticate('jwt', {
	session: false
}), (req, res) => {
	var sess = req.session;

	console.log(req.body.idUser);

	let jsonResponse = {
		data: {},
		status: false
	};

	Tasks.findAll()
		.then(data => {
			jsonResponse.data = data
			res.json(jsonResponse);
		})
		.catch(err => {
			console.log(err);
			res.json(jsonResponse);
		})
});

// Edita una tarea en la BD respecto a los adatos enviados (is, nombre, prioridad y fecha)
// Envia true o false respecto a si fue existosa la edición o no.
router.post('/editTask', passport.authenticate('jwt', {
	session: false
}), function (req, res) {
	var params = req.body;

	var id = params.id;
	var idUser = params.idUser;
	var name = params.name;
	var priority = params.priority;
	var date = params.date;

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
	.catch(err => res.json({message:"Something was wrong", error:err}));
});

//Inserta una nueva tarea en la BD respecto alos datos enviados del cliente
//Envia true o false respecto a si fue existosa la inserción o no.
router.post('/createTask', passport.authenticate('jwt', {
	session: false
}), function (req, res) {
	var sess = req.session;
	// var parametros = JSON.parse(Buffer.from(req.body.data, 'base64'));
	var params = req.body;

	var strNombre = params.nombre;
	var strPrioridad = params.prioridad;
	var strFecha = params.fecha;

	var objResponse = {
		status: false
	};

	Tasks
		.create({
			idUser: 1,
			name: "testCreation",
			priority: "3",
			completionDate: '1970-01-01 00:00:01',
		})
		.then(task => {
			objResponse.status = true;
			res.json(objResponse);
		})
		.catch(err => {
			console.log(err);
			res.json(objResponse);
		});

});

//logout
router.get('/logout', function (req, res) {
	req.logout();
	res.redirect('/');
});

module.exports = router;