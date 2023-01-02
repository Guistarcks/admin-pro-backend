

//getTodo

const { response } = require("express");

const Usuario = require ('../models/usuario.models'); 
const Doctor = require ('../models/doctores.models'); 
const Clinica = require ('../models/clinica.models'); 
const Cliente = require ('../models/clientes.models'); 

const getTodo = async (req, res = response) =>{

const busqueda =  req.params.busqueda;
const regex = new RegExp(busqueda, 'i');
const [usuarios, doctor, clinica, clientes] =  await Promise.all([

    Usuario.find({ nombre: regex }),
    Doctor.find({  nombre: regex }),
    Clinica.find({ nombre: regex }),
    Cliente.find({ nombre: regex }),

])

res.json({
ok: true,
usuarios,
doctor,
clinica,
clientes

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
                                //.populate('clinica', 'nombre img');
            break;
    
        case 'clinicas':
            data = await  Clinica.find({ nombre: regex })
                                 .populate('usuario', 'nombre img');
            break;
    
        case 'usuarios':
            data = await  Usuario.find({ nombre: regex });
                                   
            break;
       
            case 'clientes':
                data = await  Cliente.find({ nombre: regex })
                                     .populate('clinica', 'nombre img');
                break;
    
        default:
         return  res.status(400).json({
             ok:false,
             msg:'La tabla tiene que ser usuarios/doctores/clinicas/clientes'

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
