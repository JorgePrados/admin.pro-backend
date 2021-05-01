/*
    Ruta: /api/usuarios

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../usuarios/controllers/usuarios');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post('/', [
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('password', 'Password obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').isEmail(),
    validarCampos
], crearUsuario);

router.put('/:id', [
    validarJWT,
    check('nombre', 'nombre obligatorio').not().isEmpty(),
    check('email', 'Email obligatorio').isEmail(),
    check('role', 'role obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);
module.exports = router;