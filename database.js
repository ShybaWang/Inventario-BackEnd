const mysql = require('mysql');

let config = require('./node-mysql/config.js');

let connection = mysql.createConnection(config);

connection.connect((err => {
    if(err) throw err;
    console.log('MySQL Connected');
}));
 
// 3.
exports.databaseConnection = connection;