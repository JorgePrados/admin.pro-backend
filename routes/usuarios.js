/*
    Ruta: /api/usuarios

*/
const { Router } = require('express');
const { getUsuarios, crearUsuario } = require('../usuarios/controllers/usuarios');

const router = Router();

router.get( '/', getUsuarios);
router.post( '/', crearUsuario);


module.exports = router;