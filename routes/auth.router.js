
/*
Ruta:/api/login

*/

const { Router } = require('express');
const { check } = require('express-validator');
const {login} = require ('../controller/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
[
 check('email', 'El email es obrigadorio').isEmail(),
 check('password', 'El password es obrigadorio').not().isEmpty(),
 validarCampos
],
login

)



module.exports = router;