require("dotenv").config();

const express = require("express");
const conectarBaseDeDatos = require("./config/database");
const clienteRoutes = require("./routes/clienteRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/api/clientes", clienteRoutes);

app.get("/", (req, res) => {
    res.json({ mensaje: "Servidor funcionando" });
});

conectarBaseDeDatos().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});