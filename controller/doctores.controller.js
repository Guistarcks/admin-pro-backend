
const { response } = require ('express');

const Doctor = require('../models/doctores.models');


const getDoctores = async (req, res = response) =>{

const doctores = await Doctor.find()
                              .populate('usuario','nombre img');
                              //.populate('clinica','nombre img')
                                                       
 res.json({
  ok:true,
  doctores

 })

}

const crearDoctores = async (req, res = response) =>{
   
const uid = req.uid;
const doctor = new Doctor({
 usuario:uid,
 ...req.body
});

   try {
      
    const doctorDB = await doctor.save();
    res.json({
        ok:true,
        doctor: doctorDB
      
       });

   } catch (error) {
       console.log(error);
       res.status(500).json({
           ok:false,
           msg:'Hable con el administrador'
       })
   }
      
   }
   const actualizarDoctores = (req, res = response) =>{
    res.json({
     ok:true,
     msg: 'ActualizarDoctor'
   
    });
   
   }

   const borrarDoctores = (req, res = response) =>{
    res.json({
     ok:true,
     msg: 'BorrarDoctor'
   
    });
   
   }
module.exports = {
    getDoctores,
    crearDoctores,
    actualizarDoctores,
    borrarDoctores
}