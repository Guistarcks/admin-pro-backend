/*
'/api/clinicas'

*/

const { Router, response } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
   getClinicas,
   crearClinicas,
   actualizarClinicas,
   borrarClinicas

} = require ('../controller/clinicas.controller');

const router = Router();

router.get('/', getClinicas );

router.post('/',
[
   validarJWT,
   check('nombre', 'El nombre de la Clinica es necesario').not().isEmpty(),
   validarCampos
],
crearClinicas

 );

 router.put('/:id',
 [
    
 ],
 actualizarClinicas 
  );
  router.delete('/:id',
 
  borrarClinicas 
   );

module.exports = router;