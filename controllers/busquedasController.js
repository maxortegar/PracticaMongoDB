const { response } = require('express');
const Usuario = require('../models/usuarioModel');
const Investigador = require('../models/investigadorModel');
const Proyecto = require('../models/proyectoModel');


const getBusquedaGlobal = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i'); // i es de insensible

    // Este codigo funciona pero demora mas
    // const usuarios = await Usuario.find({ nombre: regexp });
    // const investigadores = await Investigador.find({ nombre: regexp });
    // const proyectos = await Proyecto.find({ nombre: regexp });

    const [usuarios, investigadores, proyectos] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Investigador.find({ nombre: regexp }),
        Proyecto.find({ nombre: regexp })
    ]);


    res.json({
        ok: true,
        msg: 'getBusquedaGlobal',
        usuarios,
        investigadores,
        proyectos
    });

}

const getBusquedaPorColleccion = async(req, res = response) => {

    const coleccion = req.params.coleccion;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i'); // i es de insensible

    let data = [];


    switch (coleccion) {
        case 'proyectos':
            data = await Proyecto.find({ nombre: regexp })
                .populate('usuario', 'nombre img');
            break;
        case 'investigadores':
            data = await Investigador.find({ nombre: regexp })
                .populate('usuario', 'nombre img')
                .populate('proyecto', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regexp });
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La coleccion debe ser proyectos-investigadores-usuarios'
            });

    }
    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getBusquedaGlobal,
    getBusquedaPorColleccion
}