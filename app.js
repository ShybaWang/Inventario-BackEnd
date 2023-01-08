const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const path = require('path');

//inicializar express
const app = express();



app.use(cors());

app.use(express.json());

//Conexión a SQL
var connection = require('./database.js').databaseConnection;

//Routers
const routerLogin = require('./routers/login.js');
app.use("/api/v1/login", routerLogin);

const routerMateriales = require('./routers/materiales.js');
app.use("/api/v1/materiales", routerMateriales);

const routerUsuarios = require('./routers/usuarios.js');
app.use("/api/v1/usuarios", routerUsuarios);

const routerTickets = require('./routers/tickets.js');
app.use("/api/v1/tickets", routerTickets);

//Servir el front con Express
console.log( path.join(__dirname,"dist/inventario-front"))
app.use("/website", express.static(path.join(__dirname,"/dist/inventario-front"))); 

// puerto de escucha
const PUERTO = process.env.PORT || 3000;

app.listen( PUERTO, () =>{
    console.log(`El servidor está escuchando en el puerto ${PUERTO}...`);
});