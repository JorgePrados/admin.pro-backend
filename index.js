require('dotenv').config();

const express = require('express');
var cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

app.use(cors())
//Base de datos
dbConnection();

// Rutas
app.get( '/', (req, res) =>{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en puerto ' + process.env.PORT);
});