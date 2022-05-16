/*
 ruta: api/todo/:busqueda
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {getTodo } = require('../controller/busquedas.controller');
const {getDocumentosColeccion } = require('../controller/busquedas.controller');


const router = Router();

router.get('/:busqueda', validarJWT, getTodo)

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)

module.exports = router;