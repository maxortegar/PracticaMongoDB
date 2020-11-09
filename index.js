//usuario:MaxOrtega password:pbKgfdFCisZdtZvx
//string de conexion: mongodb+srv://MaxOrtega:<password>@cluster0.ojpsa.mongodb.net/test


require('dotenv').config();

const express = require('express');

const cors = require('cors');

const { dbconection } = require('./database/config');

const app = express();

app.use(cors());

app.use(express.json());

dbconection();

//rutas del API

app.use('/api/usuarios', require('./routes/usuariosRoute'));
app.use('/api/login', require('./routes/authRoute'));
app.use('/api/proyectos', require('./routes/proyectosRoute'));
app.use('/api/investigadores', require('./routes/investigadoresRoute'));

app.use('/api/clientes', require('./routes/clientesRoute'));
app.use('/api/automoviles', require('./routes/automovilesRoute'));
app.use('/api/modelos', require('./routes/modelosRoute'));
app.use('/api/alquileres', require('./routes/alquileresRoute'));

app.use('/api/buscar', require('./routes/busquedasRoute'));
app.use('/api/upload', require('./routes/uploadsRoute'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})