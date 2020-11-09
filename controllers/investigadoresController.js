const { response } = require('express');
const Investigador = require('../models/investigadorModel');

const getInvestigadores = async(req, res = response) => {
    const investigadores = await Investigador.find().
    populate('usuario', 'nombre img').
    populate('proyecto', 'nombre img');

    res.json({
        ok: true,
        investigadores
    });
}
const crearInvestigador = async(req, res = response) => {
    const uid = req.uid;

    const investigador = new Investigador({
        usuario: uid,
        ...req.body
    });

    try {

        const investigadorDB = await investigador.save();
        res.json({
            ok: true,
            investigador: investigadorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Error inesperado hablar con el administrador'
        });
    }
}
const actualizarInvestigador = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const investigador = await Investigador.findById(id);
        if (!investigador) {
            return res.status(404).json({
                ok: true,
                msg: 'Investigador no existe'

            });
        }

        const cambiosInvestigador = {
            ...req.body,
            usuario: uid
        }

        const investigadorActualizado = await Investigador.findByIdAndUpdate(id, cambiosInvestigador, { new: true });

        return res.json({
            ok: true,
            investigador: investigadorActualizado

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperados hable con el administrador'
        });
    }
}
const eliminarInvestigador = async(req, res = response) => {
    const id = req.params.id;

    try {

        const investigador = await Investigador.findById(id);
        if (!investigador) {
            return res.status(404).json({
                ok: true,
                msg: 'Investigador no existe'

            });
        }

        await Investigador.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Investigador Eliminado'

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
    getInvestigadores,
    crearInvestigador,
    actualizarInvestigador,
    eliminarInvestigador
}