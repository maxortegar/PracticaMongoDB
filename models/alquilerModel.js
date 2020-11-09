const { Schema, model } = require('mongoose');

const AlquilerSchema = Schema({
    placa: {
        type: String,
        required: true
    },
    codigoCliente: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: String,
        required: true
    },
    fechaFin: {
        type: String,
        required: true
    },
    descuento: {
        type: String,
        required: true
    },
    precioTotal: {
        type: String,
        required: true
    }

}, { collection: 'alquileres' });

AlquilerSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Alquiler', AlquilerSchema);