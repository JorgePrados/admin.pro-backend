const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const getTodo = async(req, res) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    try {
        const [usuarios, medicos, hospitales] = await Promise.all([
            Usuario.find({ nombre: regex }),
            Medico.find({ nombre: regex }),
            Hospital.find({ nombre: regex })
        ]);


        res.json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const getDocumentosColeccion = async(req, res) => {
    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;

    try {
        const regex = new RegExp(busqueda, 'i');

        let data = [];
        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex })
                    .populate('usuario', 'nombre');
                break;

            case 'usuarios':
                data = await Usuario.find({ nombre: regex });
                break;
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuario/medicos/hospitales'
                })
        }

        res.json({
            ok: true,
            resultados: data
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}