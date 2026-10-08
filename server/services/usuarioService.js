const usuarioModel = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CrearUsuario = async (bodyUsuario) => {
  const { email, password, nombre, sector } = bodyUsuario;
  const usuarioExistente = await usuarioModel.findOne({ email });
  if (usuarioExistente) {
    throw new Error('El Email ya está registrado');
  }
  const saltoEncriptacion = await bcrypt.genSalt(10);
  const passwordHasheo = await bcrypt.hash(password, saltoEncriptacion);

  const nuevoUsuario = new usuarioModel({
    email,
    password: passwordHasheo,
    nombre,
    sector
  });
  return await nuevoUsuario.save();
};

const loginUsuario = async (email, password) => {
  const usuario = await usuarioModel.findOne({ email });
  if (!usuario) throw new Error('Credenciales inválidas');

  const passwordValido = await bcrypt.compare(password, usuario.password);
  if (!passwordValido) throw new Error('Credenciales inválidas');

  const token = jwt.sign(
    { id: usuario._id, sector: usuario.sector },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  return { token, usuario };
};

const eliminarUsuario = async (id) => {
  const usuario = await usuarioModel.findById(id);
  if (!usuario) {
    throw new Error('Usuario No Encontrado');
  }
  return await usuarioModel.findByIdAndDelete(id); 
};

module.exports = {
  CrearUsuario,
  eliminarUsuario,
  loginUsuario
};