const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  telefono: { type: String },
  direccion: { type: String }
}, {
  timestamps: true,
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    }
  }
});

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
