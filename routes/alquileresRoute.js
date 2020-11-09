/*
    Ruta: /api/alquiler
    tambien se puede utilizar paginacion
    http://localhost:3000/api/alquileres?desde=10&&limite=5
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getAlquileres, crearAlquiler, actualizarAlquiler, eliminarAlquiler } = require('../controllers/alquilerController');
const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', validarJWT, getAlquileres);


router.post('/', [
        check('placa', 'La placa es obligatorio').not().isEmpty(),
        check('codigoCliente', 'El codigo del cliente es obligatorio').not().isEmpty(),
        check('fechaInicio', 'La fecha de inicio es obligatorio').not().isEmpty(),
        check('fechaFin', 'La fecha de fin es obligatorio').not().isEmpty(),
        check('descuento', 'el descuento es obligatorio').not().isEmpty(),
        check('precioTotal', 'el precio total es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    crearAlquiler);

router.put('/:id', [
        validarJWT,
        check('placa', 'La placa es obligatorio').not().isEmpty(),
        check('codigoCliente', 'El codigo del cliente es obligatorio').not().isEmpty(),
        check('fechaInicio', 'La fecha de inicio es obligatorio').not().isEmpty(),
        check('fechaFin', 'La fecha de fin es obligatorio').not().isEmpty(),
        check('descuento', 'el descuento es obligatorio').not().isEmpty(),
        check('precioTotal', 'el precio total es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarAlquiler);

router.delete('/:id', validarJWT, eliminarAlquiler);



module.exports = router; //para exportar