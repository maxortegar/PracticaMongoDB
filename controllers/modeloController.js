const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt');
const Modelo = require('../models/modeloModel');


const getModelos = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [modelos, total] = await Promise.all([
        Modelo.find({}, 'codigoModelo modelo marca precio').skip(desde).limit(limite),
        Modelo.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'obtener modelos',
        modelos,
        total

    });
}

const crearModelo = async(req, res = response) => {

    //console.log(req.body);
    const { codigoModelo } = req.body;

    try {

        const existeModelo = await Modelo.findOne({ codigoModelo });
        if (existeModelo) {
            return res.status(400).json({
                ok: false,
                msg: 'El modelo ya esta registrado'
            });
        }

        const modelo = new Modelo(req.body);

        //Generar el TOKEN
        const token = await generateJWT(modelo.id);
        await modelo.save();

        res.json({
            ok: true,
            msg: 'Creando modelo',
            modelo,
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

const actualizarModelo = async(req, res = response) => {

    const mid = req.params.id;

    try {
        const modeloDB = await Modelo.findById(mid);

        if (!modeloDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un modelo con este id'
            });
        }
        //Actualizaciones
        const { codigoModelo, ...campos } = req.body;

        if (modeloDB.codigoModelo != codigoModelo) {

            const existeModelo = await Modelo.findOne({ codigoModelo });
            if (existeModelo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un modelo con este codigo'
                });
            }
        }
        campos.codigoModelo = codigoModelo;
        const modeloActualizado = await Modelo.findByIdAndUpdate(mid, campos, { new: true });

        res.json({
            ok: true,
            modelo: modeloActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }

}

const eliminarModelo = async(req, res = response) => {
    const mid = req.params.id;

    try {

        const modeloDB = await Modelo.findById(mid);

        if (!modeloDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un modelo con este id'
            });
        }
        await Modelo.findByIdAndDelete(mid);

        res.status(200).json({
            ok: true,
            msg: 'Modelo eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Error en eliminar modelo, comunicar al dba'
        });
    }
}


module.exports = {
    getModelos,
    crearModelo,
    actualizarModelo,
    eliminarModelo,
}