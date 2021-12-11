/*
Ruta:/api/Usuarios

*/

const { Router, response } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuarios } = require('../controller/usuarios.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/',validarJWT, getUsuarios );

router.post('/',
[
check('nombre', 'El nombre es obrigatorio').not().isEmpty(),
check('password','El password es obrigatorio').not().isEmpty(),
check('email','El email es obrigatorio').isEmail(),
validarCampos,
],
crearUsuarios

 );

 router.put('/:id',
 [
    validarJWT,
    check('nombre', 'El nombre es obrigatorio').not().isEmpty(),
    check('role','El role es obrigatorio').not().isEmpty(),
    check('email','El email es obrigatorio').isEmail(),
    validarCampos,
 ],
  actualizarUsuarios 
  );
  router.delete('/:id',
  validarJWT,
  borrarUsuarios 
   );

module.exports = router;