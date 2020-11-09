const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');

const Cliente = require('../models/clienteModel');

const getClientes = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;

    const [clientes, total] = await Promise.all([
        Cliente.find({}, 'codigoCliente dni nombre telefono direccion').skip(desde).limit(limite),
        Cliente.countDocuments()
    ]);

    res.json({
        ok: true,
        msg: 'obtener clientes',
        clientes,
        total

    });
}

const crearCliente = async(req, res = response) => {

    //console.log(req.body);
    const { dni } = req.body;

    try {

        const existeDni = await Cliente.findOne({ dni });
        if (existeDni) {
            return res.status(400).json({
                ok: false,
                msg: 'El dni ya esta registrado'
            });
        }

        const cliente = new Cliente(req.body);

        //Generar el TOKEN
        const token = await generateJWT(cliente.id);
        await cliente.save();

        res.json({
            ok: true,
            msg: 'Creando cliente',
            cliente,
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

const actualizarCliente = async(req, res = response) => {

    const cid = req.params.id;

    try {
        const clienteDB = await Cliente.findById(cid);

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con este id'
            });
        }
        //Actualizaciones
        const { codigoCliente, dni, ...campos } = req.body;

        if (clienteDB.dni != dni) {

            const existeDni = await Cliente.findOne({ dni });
            if (existeDni) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un cliente con este dni'
                });
            }
        }
        campos.dni = dni;
        const clienteActualizado = await Cliente.findByIdAndUpdate(cid, campos, { new: true });

        res.json({
            ok: true,
            cliente: clienteActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado!!!!!! Revisar logs'
        });
    }
}

const eliminarCliente = async(req, res = response) => {
    const cid = req.params.id;

    try {

        const clienteDB = await Cliente.findById(cid);

        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cliente con este id'
            });
        }
        await Cliente.findByIdAndDelete(cid);

        res.status(200).json({
            ok: true,
            msg: 'Cliente eliminado'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: ' Error en eliminar cliente, comunicar al dba'
        });
    }
}

module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}