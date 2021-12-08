
require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./dataBase/config');

//CREAR EL SERVIDOR DE EXPRESS 
const app = express();

//CONFIGURAR  CORS 
app.use(cors());

// BASE DDE DATOS
dbConnection();



console.log( process.env );

app.get('/',( req, res) => {

    res.json({
       ok:true,
       msg:'Hola Mundo', 
    })


});

app.listen(3000, ()=>{

    console.log('Servidor corriendo en puerto'  + process.env.PORT);
});

//OJO
//NOTA IMPORTANTE {INSTALAR LOS SIGUIENTE PAQUERTES (npm i dotenv "trabajar con variable de entorno")}
//NOTA IMPORTANTE {INSTALAR LOS SIGUIENTE PAQUERTES (npm i cors    "trabajar con CORS control de dominio")}