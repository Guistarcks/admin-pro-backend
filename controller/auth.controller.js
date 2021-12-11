

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario  = require ('../models/usuario.models');
const{ generarJWT } = require ('../helper/jwt')

const login = async (req, res = response) =>{

const{ email, password  } = req.body;

try {

    // VERIFICAR EMAIL
 const usuarioDB = await Usuario.findOne({ email });
  
 if( !usuarioDB ){
   return res.status(404).json({
   ok:false,
   msg:'Email no encontrado'

   });
  }

   //VERIFICAR PASSWORD
    const validarPassword = bcrypt.compareSync( password, usuarioDB.password );
      if( !validarPassword ){
          return res.status(400).json({
          ok:false,
          msg: 'Contraseña no valida'

          });
      }
    //GENERAR JWT
    const token = await generarJWT( usuarioDB.id);

 res.json({
  ok:true,
  token

 })

    
} catch (error) {
  console.log(error)
  res.status(500).json({
   ok:false,
   msg:'Hable con el administrador'


  });    
}

}
module.exports = {
    login
}