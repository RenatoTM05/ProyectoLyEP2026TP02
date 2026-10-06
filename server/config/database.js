const mongoose = require("mongoose");

const conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexión con MongoDB establecida");
    } catch (error) {
        console.error("Error al conectar con MongoDB:", error.message);
        process.exit(1);
    }
};

module.exports = conectarBaseDeDatos;