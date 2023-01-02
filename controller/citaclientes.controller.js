


const { response} = require ('express');

const Cita =require ('../models/citaclientes.models');



const crearCitas = async (req, res = response) =>{

    res.json({
     ok: true, 
     msg:'Respuesta Cita ok'

    })
}


module.exports = {
crearCitas

}