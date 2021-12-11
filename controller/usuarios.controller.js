
// PAQUETE PARA ENCRIPTAR PASS  npm i bcryptjs OJO;

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.models');
const { generarJWT } = require('../helper/jwt');


//Devuelve una lista de usuarios
const getUsuarios = async ( req, res) => {
    
    const usuarios = await Usuario.find({},'nombre email google');

    res.json({
       ok:true,
      uid: req.uid
   });
 
 }
 
 //Función creación usuarios
 const crearUsuarios = async ( req, res = response ) => {

  const {nombre, password, email} = req.body;
 
  try {
 //comprobamos si existe el email
  const existeEmail = await Usuario.findOne({ email});
  
  if( existeEmail ){
   return res.status(500).json({
     ok: false,
     msg: 'El correo ya está registrado'
   });
  }



  const usuario = new Usuario( req.body );

  //Encriptar Pass
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync( password, salt);
  
  //Guardar Usuario
  await usuario.save();

  //GENERAR JWT
  const token = await generarJWT( usuario.id);


  res.json({
     ok:true,
    usuario,
    token
    
 });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok:false,
      msg:'Error inesperado... revisar logs '
    })
  }


  
}

//Función actualizar usuarios
const actualizarUsuarios = async ( req, res = response ) =>{

// VALIDAR TOKEN Y COMPROBAR SI EL USUARIO CORRECTO.

 const uid = req.params.id;

  try {
  //COMPROBAMOS LA EXISTENCIA DEL ID. 
  const existeusuarioDB = await Usuario.findById( uid );
   
  if( !existeusuarioDB ){
  return res.status(404).json({
  ok:false,
  msg: 'No existe un usuario por ese id'

  });  
  }

  //CAMPOS QUE NO NECESITAMOS QUE SE ACTUALICEN.
  const {password, google, email, ...campos }= req.body;

  if( existeusuarioDB.email !== req.body.email){

    const existeEmail = await Usuario.findOne({ email });

    if( existeEmail ){
     return res.status( 400 ).json({
      ok:false,
      msg : 'Ya existe un usuario con este Email'

     })
    }
  }
  campos.email = email;
  //LANZAMOS LA ACTUALIZACIÓN 
  const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new:true});

   res.json({
    ok:true,
    usuario: usuarioActualizado

   });
      
  } catch (error) {
      console.log(error);
      res.status(500).json({
       ok:false,
       msg:'Error inesperado al actualizar usuario'
      });
      
  }
  }
//Función deletar usuarios

 const borrarUsuarios = async ( req, res) =>{
  
  const uid = req.params.id;

  try {

   const usuarioDB = await Usuario.findById( uid);

   if ( !usuarioDB ){
    
    return res.status(404).json({
     ok: false,
     msg: 'No existe un usuario por este id'

    });

   }
   
   await Usuario.findByIdAndDelete( uid);

    res.json({
      ok:true,
      msg: 'Usuario eliminado'
  
     });


  } catch (error) {
    console.log(error);
    res.status(500).json({
     ok:false,
     msg: 'Hable con el administrador'

    })
  }

 }

 module.exports = {
     getUsuarios,
     crearUsuarios,
     actualizarUsuarios,
     borrarUsuarios
    }