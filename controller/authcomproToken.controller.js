const { response } = require('express');
const Usuario  = require ('../models/usuario.models');
const{ generarJWT } = require ('../helper/jwt')

const novoToken = async( req, res = response) =>{

const idUser = req.uid;
//Generar nuevoToken
const token = await generarJWT (idUser);

res.json({
ok:true,
token

});

}
module.exports = {
novoToken

}