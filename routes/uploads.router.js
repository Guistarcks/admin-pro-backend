
/*
 ruta: api/uploads/
*/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { fileUpload, retornaImage } = require('../controller/uploads.controller');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload );

router.get('/:tipo/:foto', retornaImage );
module.exports = router;