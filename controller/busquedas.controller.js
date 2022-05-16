

//getTodo

const { response } = require("express");

const Usuario = require ('../models/usuario.models'); 
const Doctor = require ('../models/doctores.models'); 
const Clinica = require ('../models/clinica.models'); 

const getTodo = async (req, res = response) =>{

const busqueda =  req.params.busqueda;
const regex = new RegExp(busqueda, 'i');
const [usuarios, doctor, clinica] =  await Promise.all([

    Usuario.find({ nombre: regex }),
    Doctor.find({ nombre: regex }),
    Clinica.find({ nombre: regex }),

])

res.json({
ok: true,
usuarios,
doctor,
clinica

})

}
//BUSQUEDA COLECCION ESPECIFICA
const getDocumentosColeccion = async (req, res = response) =>{
   
    const tabla = req.params.tabla;
    const busqueda =  req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
      
    let data = [];

       switch ( tabla ) {
        case 'doctores':
            data = await  Doctor.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('Clinica', 'nombre img');
            break;
    
        case 'clinicas':
            data = await  Clinica.find({ nombre: regex })
                                 .populate('usuario', 'nombre img');
            break;
    
        case 'usuarios':
            data = await  Usuario.find({ nombre: regex });
            break;
    
        default:
         return  res.status(400).json({
             ok:false,
             msg:'La tabla tiene que ser usuarios/doctores/clinicas'

            });
           
    }
        
    res.json({
        ok:true,
        resultados :data

    })
    
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}
