/*
ruta: api/uploads
*/

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { fileUpload, retornarImagen } = require('../controllers/uploadsController');

const { validarJWT } = require('../midlewares/validarJWT');

const router = Router();

router.use(expressFileUpload());


router.put('/:coleccion/:id', validarJWT, fileUpload);
router.get('/:coleccion/:idImagen', retornarImagen);


module.exports = router;