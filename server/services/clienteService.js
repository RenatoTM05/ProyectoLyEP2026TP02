const Cliente = require('../models/Cliente');

const crearCliente = async (datosCliente) => {
  const nuevoCliente = new Cliente(datosCliente);
  return await nuevoCliente.save();
};

const obtenerClientes = async () => {
  return await Cliente.find();
};

module.exports = {
  crearCliente,
  obtenerClientes
};
