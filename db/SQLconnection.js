const mysql = require('mysql');

const config = {
  host: '127.0.0.1',
  user: 'william',
  password: '123456',
  database : 'usingReact',
  multipleStatements: true
};

var connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) throw err;
  console.log("Data base connected");
});

module.exports = connection;
