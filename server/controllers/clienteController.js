const clienteService = require('../services/clienteService');

const crearCliente = async (req, res) => {
  try {
    const clienteGuardado = await clienteService.crearCliente(req.body);
    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el cliente', error: error.message });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerClientes();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los clientes', error: error.message });
  }
};

module.exports = {
  crearCliente,
  obtenerClientes
};
