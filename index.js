
require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./dataBase/config');

//CREAR EL SERVIDOR DE EXPRESS 
const app = express();

//CONFIGURAR  CORS 
app.use(cors());

//LECTURA Y PARSEO DEL BODY
app.use( express.json());

// BASE DE DATOS
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios.router'));
app.use('/api/login', require('./routes/auth.router'));
app.listen(process.env.PORT, ()=>{

    console.log('Servidor corriendo en puerto'  + process.env.PORT);
});

//OJO
//NOTA IMPORTANTE {INSTALAR LOS SIGUIENTE PAQUERTES (npm i dotenv "trabajar con variable de entorno")}
//NOTA IMPORTANTE {INSTALAR LOS SIGUIENTE PAQUERTES (npm i cors    "trabajar con CORS control de dominio")}