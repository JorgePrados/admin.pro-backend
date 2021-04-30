require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

app.use(cors());

//Lectura y parseo del body
app.use(express.json());
//Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));


app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto ' + process.env.PORT);
});