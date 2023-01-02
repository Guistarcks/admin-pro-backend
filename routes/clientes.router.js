/*
 ruta'/api/clientes'

*/

const { Router, response } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require ('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearCliente,
    getClientes,
    getClientesById,
    actualizarClientes,
    borrarClientes
  
 
} = require ('../controller/clientes.controller');

const router = Router();

router.get('/',validarJWT, getClientes );


router.post('/',
[
    validarJWT,
    check('nombre', 'El nombre del Cliente  es necesario').not().isEmpty(),
    check('email','El email es obrigatorio').isEmail(),
    //check('email', 'El email  es obrigatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obrigatorio').not().isEmpty(),
    validarCampos
],
crearCliente

 );

 router.put('/:id',
 [
    validarJWT,
    check('nombre', 'El nombre del Cliente  es necesario').not().isEmpty(),
    check('email', 'El email  es obrigatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obrigatorio').not().isEmpty(),
    validarCampos   

 ],
 actualizarClientes
 
 
 );
  router.delete('/:id',
   validarJWT,
   borrarClientes
   );
   
router.get('/:id',
validarJWT,
getClientesById  
    );

module.exports = router;