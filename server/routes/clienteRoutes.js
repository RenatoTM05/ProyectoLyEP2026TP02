const express = require('express');

const router = express.Router();

const {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
} = require('../controllers/clienteController');

const { protegerRuta, autorizarSector } = require('../middleware/authMiddleware');

// Lectura y creación: usuarios autenticados
router.get('/', protegerRuta, obtenerClientes);
router.get('/:id', protegerRuta, obtenerClientePorId);
router.post('/', protegerRuta, crearCliente);

// Edición y eliminación: exclusivo Gerencia
router.put('/:id', protegerRuta, autorizarSector('Gerencia'), actualizarCliente);
router.delete('/:id', protegerRuta, autorizarSector('Gerencia'), eliminarCliente);

module.exports = router;
