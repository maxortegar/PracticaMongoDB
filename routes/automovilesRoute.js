/*
    Ruta: /api/automovil
    tambien se puede utilizar paginacion
    http://localhost:3000/api/automoviles?desde=10&&limite=5
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getAutomoviles, crearAutomovil, actualizarAutomovil, eliminarAutomovil } = require('../controllers/automovilController');
const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', validarJWT, getAutomoviles);


router.post('/', [
        check('placa', 'La placa es obligatorio').not().isEmpty(),
        check('codigoModelo', 'El codigo del modelo es obligatorio').not().isEmpty(),
        check('disponibilidad', 'La disponibilidad es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    crearAutomovil);

router.put('/:id', [
        validarJWT,
        check('placa', 'La placa es obligatorio').not().isEmpty(),
        check('codigoModelo', 'El codigo del modelo es obligatorio').not().isEmpty(),
        check('disponibilidad', 'La disponibilidad es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarAutomovil);

router.delete('/:id', validarJWT, eliminarAutomovil);



module.exports = router; //para exportar