/*
    Ruta: /api/modelo
    tambien se puede utilizar paginacion
    http://localhost:3000/api/modelos?desde=10&&limite=5
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');

const { getModelos, crearModelo, actualizarModelo, eliminarModelo } = require('../controllers/modeloController');
const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', validarJWT, getModelos);


router.post('/', [
        check('codigoModelo', 'El codigo es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('marca', 'La marca es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    crearModelo);

router.put('/:id', [
        validarJWT,
        check('codigoModelo', 'El codigo es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo es obligatorio').not().isEmpty(),
        check('marca', 'La marca es obligatorio').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        validarCampos,

    ],
    actualizarModelo);

router.delete('/:id', validarJWT, eliminarModelo);



module.exports = router; //para exportar