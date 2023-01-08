const mysql = require('mysql');
const express = require('express');

const routerMateriales = express.Router();

//Conexión a SQL
var connection = require('../database').databaseConnection;

//Middleware
routerMateriales.use(express.json());

//GET general
routerMateriales.get('/', (req,res) => {
    let sql = `SELECT * FROM materiales`;
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
routerMateriales.get('/:id', (req,res) => {

  let sql = `SELECT * FROM materiales WHERE materialID = ?`;
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
routerMateriales.post('/', (req,res) =>{

  let sql = 'INSERT INTO materiales SET ?';

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
routerMateriales.put('/:id', (req,res) => {

  var sql = mysql.format('UPDATE materiales SET ? WHERE materialID = ?',[req.body, req.params.id] );
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
routerMateriales.delete('/:id', (req,res) => {
  var sql = mysql.format('DELETE FROM materiales WHERE materialID = ?',[req.params.id] );

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación DELETE realizada correctamente");
    res.end(JSON.stringify(results));
  });
  
});

module.exports = routerMateriales;