const express = require("express");
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
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
