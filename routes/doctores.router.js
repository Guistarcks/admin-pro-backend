/*
 ruta'/api/doctores'

*/

const { Router, response } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDoctores,
    crearDoctores,
    actualizarDoctores,
    borrarDoctores
} = require ('../controller/doctores.controller');

const router = Router();

router.get('/', getDoctores );

router.post('/',
[
    validarJWT,
    check('nombre', 'El nombre del doctor es necesario').not().isEmpty(),
    check('clinica', 'El id Clinica debe de ser válido').isMongoId(),
    validarCampos
],
crearDoctores

 );

 router.put('/:id',
 [
    validarJWT,
    check('nombre', 'El nombre del Doctor es necesario').not().isEmpty(),
    check('clinica', 'El id Clinica debe de ser válido').isMongoId(),
    validarCampos
 ],
 actualizarDoctores 
 
 );
  router.delete('/:id',
  validarJWT,
  borrarDoctores 
   );

module.exports = router;