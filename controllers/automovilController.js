const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt');

const Automovil = require('../models/automovilModel');

const getAutomoviles = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [automoviles, total] = await Promise.all([
        Automovil.find({}, 'placa codigoModelo disponibilidad').skip(desde).limit(limite),
        Automovil.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'obtener automoviles',
        automoviles,
        total

    });
}

const crearAutomovil = async(req, res = response) => {

    //console.log(req.body);
    const { placa } = req.body;

    try {

        const existePlaca = await Automovil.findOne({ placa });
        if (existePlaca) {
            return res.status(400).json({
                ok: false,
                msg: 'El dni ya esta registrado'
            });
        }

        const automovil = new Automovil(req.body);

        //Generar el TOKEN
        const token = await generateJWT(automovil.id);
        await automovil.save();

        res.json({
            ok: true,
            msg: 'Creando cliente',
            automovil,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }
}

const actualizarAutomovil = async(req, res = response) => {

    const aid = req.params.id;

    try {
        const automovilDB = await Automovil.findById(aid);

        if (!automovilDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un automovil con este id'
            });
        }
        //Actualizaciones
        const { placa, ...campos } = req.body;

        if (automovilDB.placa != placa) {

            const existePlaca = await Automovil.findOne({ placa });
            if (existePlaca) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un automovil con esta placa'
                });
            }
        }
        campos.placa = placa;
        const automovilActualizado = await Automovil.findByIdAndUpdate(aid, campos, { new: true });

        res.json({
            ok: true,
            automovil: automovilActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }
}

const eliminarAutomovil = async(req, res = response) => {
    const id = req.params.id;

    try {

        const automovil = await Automovil.findById(id);
        if (!automovil) {
            return res.status(404).json({
                ok: true,
                msg: 'Automovil no existe'

            });
        }

        await Automovil.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Automovil Eliminado'

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}

module.exports = {
    getAutomoviles,
    crearAutomovil,
    actualizarAutomovil,
    eliminarAutomovil,
}