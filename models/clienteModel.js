const { Schema, model } = require('mongoose');
const ClienteSchema = Schema({
    codigoCliente: {
        type: String,
        required: true,
        unique: true
    },
    dni: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }

}, { collection: 'clientes' });

ClienteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Cliente', ClienteSchema);