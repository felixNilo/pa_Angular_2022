const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./database/config");

//Instanciamos el servidor express en una variable
const app = express();

//Base de datos
dbConnection();

//Rutas
app.get("/", (req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
});

//Iniciamos el servidor en el puerto 3000 y luego, imprimimos por consola
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto ", process.env.PORT);
});
