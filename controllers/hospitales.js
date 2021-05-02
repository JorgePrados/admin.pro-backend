const { response } = require('express');
const Hospital = require('../models/hospital');





const getHospitales = async(req, res = response) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospitales
    });
}

const crearHospital = (req, res = response) => {

    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    const uid = req.uid;


    try {
        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'actualizarHospital'
    });
}

const borrarHospital = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'borrarHospital'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}