const express= require('express');
const usuarioController= require('../controllers/usuarioController');
const router=express.Router();

router.post('/createUser',usuarioController.registrarUsuario);
router.get('loguearse',usuarioController.login);
router.delete('/deleteUser/:id',deleteUser);
module.exports = router;