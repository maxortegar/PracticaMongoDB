/*
    Ruta: /api/cliente
    tambien se puede utilizar paginacion
    http://localhost:3000/api/clientes?desde=10&&limite=5
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/clienteController');
const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', validarJWT, getClientes);


router.post('/', [
        check('codigoCliente', 'El codigo es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    crearCliente);

router.put('/:id', [
        validarJWT,
        check('codigoCliente', 'El codigo es obligatorio').not().isEmpty(),
        check('dni', 'El dni es obligatorio').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarCliente);

router.delete('/:id', validarJWT, eliminarCliente);



module.exports = router; //para exportar