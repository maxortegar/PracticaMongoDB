/*
ruta: api/buscar/
*/

const { Router } = require('express');
const { getBusquedaGlobal, getBusquedaPorColleccion } = require('../controllers/busquedasController');
const { validarJWT } = require('../midlewares/validarJWT');

const router = Router();

router.get('/:busqueda', validarJWT, getBusquedaGlobal);
router.get('/coleccion/:coleccion/:busqueda', validarJWT, getBusquedaPorColleccion);


module.exports = router;