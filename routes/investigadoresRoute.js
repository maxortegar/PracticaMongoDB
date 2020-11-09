/*
Investigadores
ruta: /api/investigadores
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../midlewares/validarCampos');
const { getInvestigadores, actualizarInvestigador, eliminarInvestigador, crearInvestigador } = require('../controllers/investigadoresController');

const { validarJWT } = require('../midlewares/validarJWT');


const router = Router();

router.get('/', getInvestigadores);


router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del investigador es obligatorio').not().isEmpty(),
        check('proyecto', 'El id del proyecto debe ser valido').isMongoId(),
        validarCampos
    ],
    crearInvestigador);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del investigador es obligatorio').not().isEmpty(),
        check('proyecto', 'El id del proyecto debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarInvestigador);

router.delete('/:id', validarJWT, eliminarInvestigador);



module.exports = router; //para exportar