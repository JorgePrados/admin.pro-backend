const { response } = require('express');
const Medico = require('../models/medico');





const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');

    res.json({
        ok: true,
        medicos
    });
}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;

    try{
        const medicos = await Medico.findById(id)
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre');

        res.json({
            ok: true,
            medicos
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const crearMedico = async(req, res = response) => {

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });
    const uid = req.uid;


    try {
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const actualizarMedico = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const MedicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });

        res.json({
            ok: true,
            medico: MedicoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const borrarMedico = async(req, res = response) => {


    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'Médico no encontrado'
            });
        }

        await Medico.findOneAndDelete(id);

        res.json({
            ok: true,
            msg: 'Médico borrado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}