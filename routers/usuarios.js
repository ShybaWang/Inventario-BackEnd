const mysql = require('mysql');
const express = require('express');

const routerUsuarios = express.Router();

//Conexión a SQL
var connection = require('../database').databaseConnection;

//Middleware
routerUsuarios.use(express.json());


//GET general
routerUsuarios.get('/', (req,res) => {
    let sql = `SELECT * FROM users`;
    connection.query(sql, (error, results) => {
      if (error) {
        console.error(error.message);
        res.status(404).send('hubo un error: ' + error.message);
      }
      console.log("Operación GET realizada correctamente");
      res.end(JSON.stringify(results));
    });
    
});


//GET de un solo elemento
routerUsuarios.get('/:id', (req,res) => {

  let sql = `SELECT * FROM users WHERE userID = ?`;
  connection.query(sql, [req.params.id], (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación GET realizada correctamente");
    res.end(JSON.stringify(results));
  });
  
});


//POST
routerUsuarios.post('/', (req,res) =>{

  let sql = 'INSERT INTO users SET ?';

  connection.query(sql, req.body, (error, results) => {
    if (error){
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación POST realizada correctamente");
    console.log('Rows affected:', results.affectedRows);
    res.end(JSON.stringify(results));
  });

  
})


//PUT
routerUsuarios.put('/:id', (req,res) => {

  var sql = mysql.format('UPDATE users SET ? WHERE userID = ?',[req.body, req.params.id] );
  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación PUT realizada correctamente");
    res.end(JSON.stringify(results));
  });
  
});


//DELETE
routerUsuarios.delete('/:id', (req,res) => {
  var sql = mysql.format('DELETE FROM users WHERE userID = ?',[req.params.id] );

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación DELETE realizada correctamente");
    res.end(JSON.stringify(results));
  });
  
});

module.exports = routerUsuarios;