const express = require('express');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
const { protegerRuta, autorizarSector } = require('../middleware/authMiddleware');

router.post('/registro', protegerRuta, autorizarSector('Gerencia'), usuarioController.registrarUsuario);
router.post('/login', usuarioController.login);
router.delete('/deleteUser/:id', protegerRuta, autorizarSector('Gerencia'), usuarioController.deleteUser);
router.get('/listar', usuarioController.listarUsuarios);//se deja por el momento en caso de olvidarnos 

module.exports = router;