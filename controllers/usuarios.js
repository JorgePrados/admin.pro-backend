const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt')


const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario
    //     .find({}, 'nombre email role google')
    //     .limit(5)
    //     .skip(desde);

    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario
        .find({}, 'nombre email role google img')
        .limit(5)
        .skip(desde),
        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async(req, res = response) => {

    const { email, password, nombre } = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El email ya está registrado'
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Generar el TOKEN -JWT
        const token = await generarJWT(usuario.id);
        // Guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            usuario, // usuario: usuario
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inseperado'
        })

    }
}

const actualizarUsuario = async(req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    const {} = req.body;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        //Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

        }
        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findOneAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}