const { Schema, model } = require('mongoose');

//Definicion de las colecciones en mongoose (definicion del esquema de bd)
const AutomovilSchema = Schema({
    placa: {
        type: String,
        required: true,
        unique: true
    },
    codigoModelo: {
        type: String,
        required: true
    },
    disponibilidad: {
        type: String,
        required: true
    }

}, { collection: 'automoviles' }); // codigo utilizado para asignar el nombre de la colleccion en mongodb
// sino asignamos un nombre mongodb creara la coleccion asignandole una s al final


AutomovilSchema.method('toJSON', function() {
    //codigo para modificar el _id por default por uid pero solo para visualizacion en 
    //la base de datos seguira igual
    const { __v, ...object } = this.toObject();

    return object;

})

//para poder exponer esta definicion  para que pueda ser utilizado desde fuera
module.exports = model('Automovil', AutomovilSchema);