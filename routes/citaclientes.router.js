/*
ruta'/api/citaclientes'
*/

const { Router, response } = require ('express');

const { check } = require ('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { 

    crearCitas

} = require('../controller/citaclientes.controller');

const router = Router();

router.get('/' );


router.post('/',
[
    validarJWT,
    check('fechacita', 'Fecha cita  es necesario').not().isEmpty(),
    check('horacita','El email es obrigatorio').not().isEmpty(),
  
    validarCampos
],
crearCitas

 );



 
 

   
router.get('/:id',
validarJWT,

    );

module.exports = router;

