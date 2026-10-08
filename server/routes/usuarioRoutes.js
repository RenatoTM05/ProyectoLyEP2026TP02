const express= require('express');
const usuarioController= require('../controllers/usuarioController');
const router=express.Router();
const protegerRuta= require('../middleware/authMiddleware');

router.post('/createUser',protegerRuta,usuarioController.registrarUsuario);
router.get('loguearse',usuarioController.login);
router.delete('/deleteUser/:id',protegerRuta,usuarioController.deleteUser);
module.exports = router;