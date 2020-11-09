const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const ModeloSchema = Schema({
    codigoModelo: {
        type: String,
        required: true,
        unique: true
    },
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    }

}, { collection: 'modelos' });


ModeloSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, _id, ...object } = this.toObject();

    object.mid = _id;
    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Modelo', ModeloSchema);