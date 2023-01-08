const mysql = require('mysql');
const express = require('express');
const path = require('path');

const routerLogin = express.Router();

//Conexión a SQL
var connection = require('../database').databaseConnection;

//Middleware
routerLogin.use(express.json());


routerLogin.use(express.json());
routerLogin.use(express.urlencoded({ extended: true }));
routerLogin.use(express.static(path.join(__dirname, 'static')));

//POST PARA HACER LOGIN
routerLogin.post('/', (request,response) =>{
  // Capturamos email y contraseña
  let email = request.body.email;
  let password = request.body.password;
  // No aseguramos de que los campos están rellenos.
  if (email && password) {
    // Ejecutar consulta de SQL Que buscará la información completa de los usuarios según el email y la contraseña 
    connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
    // Si hay algún problema, sacamos un error.
      if (error) throw error;
      // Si la cuenta existe
      if (results.length > 0) {
        console.log('LogIn realizado correctamente.')
        response.end(JSON.stringify(results[0]));
      } else {
        response.send('¡Email y/o contraseña incorrectos!');
      }			
        response.end();
      });
    } else {
      response.send('Por favor, ingrese email y contraseña');
      response.end();
    }
    
  })


module.exports = routerLogin;