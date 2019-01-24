/* eslint-disable no-console */
const express = require('express');
const execute = require('../db/executeQuery.js');
const router = express.Router();
const Tasks = require('../models/tasks');

// Consult every task pending user's task
router.post('/consultTasks', (req, res) => {
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
router.post('/editTask', function (req, res) {
	var parametros = JSON.parse(Buffer.from(req.body.data, 'base64'));

	var strId = parametros.id;
	var strNombre = parametros.nombre;
	var strPrioridad = parametros.prioridad;
	var strFecha = parametros.fecha;

	var strResponse = '';

	var jsonResponse = {
		status: false
	};

	// consulta
	var strQuery = `UPDATE
									tarea SET
									nombre = ?,
									prioridad = ?,
									vencimiento = ?
									WHERE idtarea = ? `;

	// query params
	var queryParams = [strNombre, strPrioridad, strFecha, strId];

	execute(strQuery, queryParams, function (response) {
		//console.log(response);
		jsonResponse.status = response.status;
		// response to client
		strResponse = JSON.stringify(jsonResponse);
		res.send(new Buffer(strResponse).toString('base64'));
	});

});

//Inserta una nueva tarea en la BD respecto alos datos enviados del cliente
//Envia true o false respecto a si fue existosa la inserción o no.
router.post('/createTask', function (req, res) {
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

//cerrar sesión
router.get('/logout', function (req, res) {
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

module.exports = router;