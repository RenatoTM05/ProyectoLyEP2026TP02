const clienteService = require('../services/clienteService');

const crearCliente = async (req, res) => {
  try {
    const clienteGuardado = await clienteService.crearCliente(req.body);

    res.status(201).json(clienteGuardado);

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al crear el cliente',
      error: error.message
    });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerClientes();

    res.status(200).json(clientes);

  } catch (error) {
    res.status(500).json({
      mensaje: 'Error al obtener los clientes',
      error: error.message
    });
  }
};

const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await clienteService.obtenerClientePorId(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.status(200).json(cliente);

  } catch (error) {
    res.status(400).json({
      mensaje: 'ID de cliente inválido',
      error: error.message
    });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await clienteService.actualizarCliente(
      req.params.id,
      req.body
    );

    if (!clienteActualizado) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.status(200).json(clienteActualizado);

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al actualizar el cliente',
      error: error.message
    });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const clienteEliminado = await clienteService.eliminarCliente(
      req.params.id
    );

    if (!clienteEliminado) {
      return res.status(404).json({
        mensaje: 'Cliente no encontrado'
      });
    }

    res.status(200).json({
      mensaje: 'Cliente eliminado correctamente',
      cliente: clienteEliminado
    });

  } catch (error) {
    res.status(400).json({
      mensaje: 'Error al eliminar el cliente',
      error: error.message
    });
  }
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
};