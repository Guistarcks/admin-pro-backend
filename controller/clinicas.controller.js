
const { response } = require ('express');
const Clinicas = require ('../models/clinica.models');

const getClinicas = async (req, res = response) =>{


 const clinicas = await Clinicas.find()
                                .populate('usuario','nombre img')
                                
 res.json({
  ok:true,
  clinicas

 });

}

const crearClinicas =  async (req, res = response) =>{
   
    const uid = req.uid;
    const clinicas = new Clinicas( { 
    usuario: uid, ...req.body
        
    });
    
    
   try {

    const clinicaDB =  await clinicas.save();


    res.json({
        ok:true,
        clinica:clinicaDB
              
       });

       
   } catch (error) {
       console.log(error);
       res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
       });
   }
   
   }
   const actualizarClinicas = (req, res = response) =>{
    res.json({
     ok:true,
     msg: 'ActualizarClinicas'
   
    });
   
   }

   const borrarClinicas = (req, res = response) =>{
    res.json({
     ok:true,
     msg: 'BorrarClinicas'
   
    });
   
   }
module.exports = {
    getClinicas,
    crearClinicas,
    actualizarClinicas,
    borrarClinicas
}