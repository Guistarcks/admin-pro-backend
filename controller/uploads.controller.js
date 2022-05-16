
//OJO PATH
const path = require('path');
const fs = require('fs');

const { response } = require ('express');
const { json } = require('express/lib/response');
//Creación id para imagenes
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helper/actualizarimagen.helper');

const fileUpload = (req, res = response ) => {


    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['clinicas', 'doctores','usuarios'];
    
    //Validar el tipo 
    if( !tiposValidos.includes(tipo)){
    return res.status(400).json({
     ok: false,
     msg:'No es un doctor, usuario u clinica (tipo)'
    });
    }
    // Validar que exista un archivo 
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
        ok: false,
        msg: 'No hay ningun archivo'
        });
      }

     // Procesar la imagen.. 
       const file = req.files.imagen;
       const nombreCortado = file.name.split('.'); 
       const extensionArchivo = nombreCortado[ nombreCortado.length -1];

        //Validar extensiones Imagenes 
        const extensionesValida= ['png', 'jpg','jpeg','gif'];
         if( !extensionesValida.includes(extensionArchivo)){
        return res.status(400).json({
        ok:false, 
        msg:'No es uma extensión permitida'
        });             
        }
        //Generar el nombre del archivo
         const nombreArchivo =`${uuidv4()}.${extensionArchivo}`;
        // Path para guargar la Imagen 
         const path = `./uploads/${ tipo }/${ nombreArchivo }`;
         
         // Mover la image 
         file.mv(path, function(err) {
         if (err){
         console.log(err)
          return res.status(500).json({
              ok:false,
              msg:'Error al Mover la Imagen '
          });
        }

        //Actualizar Imagen Helper/actualizarimagen
         actualizarImagen(tipo,id, nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo subido correctamente',
            nombreArchivo
            });
          });
   
    }
const retornaImage = ( req, res = response) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/${ tipo }/${ foto }` );
    //imagen por defecto
 if  (fs.existsSync(pathImg)){
    res.sendFile( pathImg );

 } else{
    const pathImg = path.join(__dirname,`../uploads/img_nodisponible.png` );
    res.sendFile( pathImg );
 }
  

}
    
module.exports ={
    fileUpload,
    retornaImage
}