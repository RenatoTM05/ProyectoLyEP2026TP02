require("dotenv").config();

const express = require("express");
const cors=require('cors');
const conectarBaseDeDatos = require("./config/database");
const clienteRoutes = require("./routes/clienteRoutes");
const usuarioRouter = require("./routes/usuarioRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use("/api/clientes", clienteRoutes);
app.use("/api/usuarios", usuarioRouter);

app.get("/", (req, res) => {
    res.json({ mensaje: "Servidor funcionando" });
});

conectarBaseDeDatos().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});