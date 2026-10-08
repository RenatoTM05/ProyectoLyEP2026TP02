const express= require('express');
const usuarioController= require('../controllers/usuarioController');
const router=express.Router();
const {protegerRuta}= require('../middleware/authMiddleware');

router.post('/registro',protegerRuta,usuarioController.registrarUsuario);
router.post('/login',usuarioController.login);
router.delete('/deleteUser/:id',protegerRuta,usuarioController.deleteUser);
router.get('/listar', usuarioController.listarUsuarios)// dejo esto oculto para que puedan ver los usuarios que estan creados asi se loguean
 module.exports = router;