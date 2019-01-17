/* eslint-disable no-console */
const express = require('express');
const execute = require('../db/executeQuery.js');
const router = express.Router();


// Consult every task pending user's task
router.post('/consultTasks',(req,res) => {
	var sess = req.session;

	console.log(req.body.idUser);
	

	let jsonResponse = {
		data:{},
		status: false
	};

	// query
	var strQuery = `SELECT
								*
								FROM
								tasks t
								WHERE
								idUser = ? `;

	// query params
	var queryParams = [req.body.idUser];

	execute(strQuery, queryParams, function(response){
		if(response.status){
			jsonResponse.data = response.data;
			jsonResponse.status = true;
		}else{
			jsonResponse.status = false;
		}
		// response to client
		res.json(jsonResponse);
	});
});

// Edita una tarea en la BD respecto a los adatos enviados (is, nombre, prioridad y fecha)
// Envia true o false respecto a si fue existosa la edición o no.
router.post('/editTask',function(req,res){
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
	var queryParams = [ strNombre, strPrioridad, strFecha, strId];

	execute(strQuery,queryParams, function(response){
		//console.log(response);
		jsonResponse.status = response.status;
		// response to client
		strResponse = JSON.stringify(jsonResponse);
		res.send(new Buffer(strResponse).toString('base64'));
	});

});

//Inserta una nueva tarea en la BD respecto alos datos enviados del cliente
//Envia true o false respecto a si fue existosa la inserción o no.
router.post('/createTask',function(req,res){
	var sess = req.session;
	var parametros = JSON.parse(Buffer.from(req.body.data, 'base64'));

	var strNombre = parametros.nombre;
	var strPrioridad = parametros.prioridad;
	var strFecha = parametros.fecha;

	var strResponse = '';

	var jsonResponse = {
		status: false
	};

	// consulta
	var strQuery = 'INSERT INTO tarea (nombre, prioridad, vencimiento, idusuario) VALUES (?,?,?,?); ';

	// query params
	var queryParams = [ strNombre, strPrioridad, strFecha, sess.usuario];

	execute(strQuery,queryParams, function(response){
		//console.log(response);
		jsonResponse.status = response.status;
		// response to client
		strResponse = JSON.stringify(jsonResponse);
		res.send(new Buffer(strResponse).toString('base64'));
	});

});

//Elimina una tarea en la BD respecto al id enviado
//Envia true o false respecto a si fue existosa la eliminación o no.
router.post('/deleteTask',function(req,res){
	var parametros = JSON.parse(Buffer.from(req.body.data, 'base64'));

	var idTarea = parametros.id;

	var strResponse = '';

	var jsonResponse = {
		status: false
	};

	// consulta
	var strQuery = 'DELETE FROM tarea WHERE idtarea = ?; ';

	// query params
	var queryParams = [ idTarea];

	execute(strQuery,queryParams, function(response){
		console.log(response);
		jsonResponse.status = response.status;
		// response to client
		strResponse = JSON.stringify(jsonResponse);
		res.send(new Buffer(strResponse).toString('base64'));
	});

});

//cerrar sesión
router.get('/cerrarSesion',function(req,res){
	req.session.destroy(function(err) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

module.exports = router;
