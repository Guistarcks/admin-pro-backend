
//FILESYSTEM
const fs = require('fs');
const Usuario = require('../models/usuario.models');
const Doctor = require('../models/doctores.models');
const Clinica = require('../models/clinica.models');

//Simplificando  el codigo de actualizar Imagen;
const borrarImagen = async( path) =>{
        
  if(fs.existsSync( path )){
    //Borrar imagen Vieja
    fs.unlinkSync(path);
  }
}

//Actualizar Imagen 
const actualizarImagen =  async (tipo,id, nombreArchivo) =>{

switch (tipo) {
    case 'doctores':
        const doctor = await Doctor.findById(id);
        if(!doctor ){
        console.log('No se encotro el doctor');
         return false;
    
        }
        const pathViejoDoctores =`./uploads/doctores/${ doctor.img}`;
        borrarImagen(pathViejoDoctores);
     
        doctor.img = nombreArchivo;
        await doctor.save();
        return true;
               break;
       
         case 'clinicas':
          const clinica = await Clinica.findById(id);
          if(!clinica ){
          console.log('No se encotro la clinica');
           return false;
      
          }
          const pathViejoClinicas =`./uploads/clinicas/${ clinica.img}`;
          borrarImagen(pathViejoClinicas);
       
          clinica.img = nombreArchivo;
          await clinica.save();
          return true; 

        break;
        
        case 'usuarios':
          const usuario = await Usuario.findById(id);
          if(!usuario ){
          console.log('No se encotro el usuario indicado');
           return false;
      
          }
          const pathViejoUsuarios =`./uploads/usuarios/${ usuario.img}`;
          borrarImagen(pathViejoUsuarios);
       
          usuario.img = nombreArchivo;
          await usuario.save();
          return true; 
        break;      

    
}
}


module.exports ={
actualizarImagen

}