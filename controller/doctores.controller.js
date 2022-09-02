
const { response } = require ('express');

const Doctor = require('../models/doctores.models');


const getDoctores = async (req, res = response) =>{


const doctores = await Doctor.find()
                              .populate('usuario','nombre img')
                              .populate('clinica','nombre img')
                                                       
 res.json({
  ok:true,
  doctores

 })

   }

const getDoctoreById = async (req, res = response) =>{
  const id = req.params.id;
   try {
    
    const doctor = await Doctor.findById( id )
                                .populate('usuario','nombre img')
                                .populate('clinica','nombre img')
    res.json({
        ok:true,
        doctor
      
       })

   } catch (error) {
    res.json({
        ok:false,
        msg:'Hable con el administrador'
      
       })
      
    
   }
   
                                                           
    
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


const actualizarDoctores = async (req, res = response) =>{

const idDoctor = req.params.id;
const uid = req.uid;
try {

const doctor =await Doctor.findById (idDoctor);

if(! doctor ){
 return res.status ( 404 ).json({
  ok:true,
  msg:'Doctor no encontrado por id',

 });
}

const cambiosDoctor ={ ... req.body, usuario: uid}
const doctorActualizado = await Doctor.findByIdAndUpdate (idDoctor, cambiosDoctor, {new:true})

res.json({
ok: true,
doctor: doctorActualizado})
  
} catch ( error ) {

console.log( error );
res.status( 500 ).json({

ok:false,
msg:'Hable con el administrador'

});

}
 
   }

const borrarDoctores = async (req, res = response) =>{
   
    const idDoctor = req.params.id;
    try {
        
    const doctor = await Doctor.findById ( idDoctor );

    if(! doctor ){
     return res.status ( 404 ).json({
     ok:true, 
     msg:'Doctor no encotrado por id'

     });
    }

    await Doctor.findByIdAndDelete( idDoctor);
    res.json({
        ok:true,
        msg: 'Doctor Borrado con éxito'
      
       });

    } catch (error) {
        console.log( error );
       res.status( 500 ).json({
       ok:false,
       msg:'Hable con el administrador '

       });
    }
     
   
   }
module.exports = {
    getDoctores,
    crearDoctores,
    actualizarDoctores,
    borrarDoctores,
    getDoctoreById
}