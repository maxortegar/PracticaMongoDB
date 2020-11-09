const { response, request } = require('express');
const { generateJWT } = require('../helpers/jwt');

const Alquiler = require('../models/alquilerModel');

const getAlquileres = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [alquileres, total] = await Promise.all([
        Alquiler.find({}, 'placa codigoCliente fechaInicio fechaFin descuento precioTotal').skip(desde).limit(limite),
        Alquiler.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'obtener alquileres',
        alquileres,
        total

    });
}

const crearAlquiler = async(req, res = response) => {

    //console.log(req.body);
    const { placa } = req.body;

    try {

        const existePlaca = await Alquiler.findOne({ placa });
        if (existePlaca) {
            return res.status(400).json({
                ok: false,
                msg: 'Este automovil ya esta registrado'
            });
        }

        const alquiler = new Alquiler(req.body);

        //Generar el TOKEN
        const token = await generateJWT(alquiler.id);
        await alquiler.save();

        res.json({
            ok: true,
            msg: 'Creando alquiler',
            alquiler,
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

const actualizarAlquiler = async(req, res = response) => {

    const qid = req.params.id;

    try {
        const alquilerDB = await Alquiler.findById(qid);

        if (!alquilerDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un alquiler con este id'
            });
        }
        //Actualizaciones
        const { placa, ...campos } = req.body;

        if (alquilerDB.placa != placa) {

            const existePlaca = await Alquiler.findOne({ placa });
            if (existePlaca) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un alquiler con esta placa'
                });
            }
        }
        campos.placa = placa;
        const alquilerActualizado = await Alquiler.findByIdAndUpdate(qid, campos, { new: true });

        res.json({
            ok: true,
            alquiler: alquilerActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }
}


const eliminarAlquiler = async(req, res = response) => {
    const id = req.params.id;

    try {

        const alquiler = await Alquiler.findById(id);
        if (!alquiler) {
            return res.status(404).json({
                ok: true,
                msg: 'Alquiler no existe'

            });
        }

        await Alquiler.findByIdAndDelete(id);
        return res.json({
            ok: true,
            msg: 'Alquiler Eliminado'

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
    getAlquileres,
    crearAlquiler,
    actualizarAlquiler,
    eliminarAlquiler,
}