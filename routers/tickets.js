const mysql = require('mysql');
const express = require('express');

const routerTickets = express.Router();

//Conexión a SQL
var connection = require('../database').databaseConnection;

//Middleware
routerTickets.use(express.json());

//GET todos los tickets de un usuario
routerTickets.get('/userID=:id', (req,res) => {
  var userID = req.params.id;
  let sql = `SELECT * FROM tickets WHERE userID= ` + mysql.escape(userID);
  connection.query(sql, [req.params.id], (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación GET realizada correctamente");
    res.end(JSON.stringify(results));
  });
    
});

//GET todos los tickets de un material que tengan un ticket abierto
routerTickets.get('/materialID=:id', (req,res) => {
  var materialID = req.params.id;
  let sql = `SELECT * FROM tickets WHERE closeDate is null AND materialID=` + mysql.escape(materialID);
  connection.query(sql, [req.params.id], (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación GET realizada correctamente");
    res.end(JSON.stringify(results));
  });
    
});

//GET todos los tickets
routerTickets.get('/', (req,res) => {
    let sql = `SELECT * FROM tickets`;
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
routerTickets.get('/:id', (req,res) => {

  let sql = `SELECT * FROM tickets WHERE ticketID = ?`;
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
routerTickets.post('/', (req,res) =>{

  let sql = 'INSERT INTO tickets SET ?';

  connection.query(sql, req.body, (error, results) => {
    if (error){
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación POST realizada correctamente");
    console.log('Lineas afectadas:', results.affectedRows);
    res.end(JSON.stringify(results));
  });

  
})

//PUT
routerTickets.put('/:id', (req,res) => {

  var sql = mysql.format('UPDATE tickets SET `closeDate`= CURRENT_TIME() WHERE ticketID = ?');
  connection.query(sql, [req.params.id], (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación PUT realizada correctamente");
    res.end(JSON.stringify(results));
  });
  
});

//DELETE
routerTickets.delete('/:id', (req,res) => {
  var sql = mysql.format('DELETE FROM tickets WHERE ticketID = ?',[req.params.id] );

  connection.query(sql, (error, results) => {
    if (error) {
      console.error(error.message);
      res.status(404).send('hubo un error: ' + error.message);
    }
    console.log("Operación DELETE realizada correctamente");
    res.end(JSON.stringify(results));
  });
  
});

module.exports = routerTickets;