const Cliente = require('../models/Cliente');

const crearCliente = async (datosCliente) => {
  const nuevoCliente = new Cliente(datosCliente);
  return await nuevoCliente.save();
};

const obtenerClientes = async () => {
  return await Cliente.find();
};

const obtenerClientePorId = async (id) => {
  return await Cliente.findById(id);
};

const actualizarCliente = async (id, datosCliente) => {
  return await Cliente.findByIdAndUpdate(
    id,
    datosCliente,
    {
      new: true,
      runValidators: true
    }
  );
};

const eliminarCliente = async (id) => {
  return await Cliente.findByIdAndDelete(id);
};

module.exports = {
  crearCliente,
  obtenerClientes,
  obtenerClientePorId,
  actualizarCliente,
  eliminarCliente
};