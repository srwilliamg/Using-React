var conexion = require('./SQLconnection.js');

//Realiza consultas a la base datos
//Recibe consultas SQL en forma de string, sus parámetros en un array y los retorna como un JSON
function execute(strQuery,arrParams,callback){

	var jsonResult = {status:false, data:[]};
	// ejecución del query con sus parametros
	conexion.query(strQuery, arrParams, function(err, rows) {
		// Si hay un error en la consulta
		if (err) {
			// eslint-disable-next-line no-console
			console.error('Error in query: ' +err.stack);
			// La consulta no fue exitosa entonces false
			jsonResult.status = false;

			callback(jsonResult);
		}

		//Se guarda resultado de la consulta
		jsonResult.data = rows;
		//Fue existosa la consulta
		jsonResult.status = true;

		callback(jsonResult);
	});
}

module.exports = execute;
