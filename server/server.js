require("dotenv").config();

const express = require("express");
const conectarBaseDeDatos = require("./config/database");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ mensaje: "Servidor funcionando" });
});

conectarBaseDeDatos().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    });
});