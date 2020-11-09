const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizarImagen");



const fileUpload = (req, res = response) => {

    const coleccion = req.params.coleccion;
    const id = req.params.id;
    //validar tipo de colleccion
    const coleccionesValidas = ['investigadores', 'proyectos', 'usuarios'];
    if (!coleccionesValidas.includes(coleccion)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una coleccion valida (usuarios, investigadores, proyectos)'
        });
    }

    //Valida que exista un archivo 
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo para cargar'
        });
    }

    //Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.'); //miArchivo.1.2.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension valida'
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`;

    //Path para guardar imagen
    const path = `./uploads/${coleccion}/${nombreArchivo}`;

    //Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al copiar imagen'
            });
        }

        //Actualizar base de datos
        actualizarImagen(coleccion, id, nombreArchivo);


        res.json({
            ok: true,
            msg: ' Archivo subido',
            nombreArchivo
        });
    });
}


const retornarImagen = (req, res = response) => {
    const coleccion = req.params.coleccion;
    const foto = req.params.idImagen;

    const pathImage = path.join(__dirname, `../uploads/${coleccion}/${foto}`);

    //image por defecto
    if (fs.existsSync(pathImage)) {
        res.sendFile(pathImage);
    } else {
        const pathImage = path.join(__dirname, `../uploads/no_image.png`);
        res.sendFile(pathImage);
    }


}


module.exports = {
    fileUpload,
    retornarImagen

}