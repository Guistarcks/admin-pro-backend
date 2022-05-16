
require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./dataBase/config');

//CREAR EL SERVIDOR DE EXPRESS 
const app = express();

//CONFIGURAR CORS 
app.use(cors());

//LECTURA Y PARSEO DEL BODY
app.use( express.json());

// BASE DE DATOS CONECTION
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios.router'));
app.use('/api/clinicas', require('./routes/clinicas.router'));
app.use('/api/doctores', require('./routes/doctores.router'));
app.use('/api/todo', require('./routes/busquedas.router'));
app.use('/api/login', require('./routes/auth.router'));
app.use('/api/uploads', require('./routes/uploads.router'));
app.listen(process.env.PORT, ()=>{

    console.log('Servidor conectado en el puerto'  + process.env.PORT);
});

