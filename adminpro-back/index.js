const express = require("express");

//Instanciamos el servidor express en una variable
const app = express();

//Iniciamos el servidor en el puerto 3000 y luego, imprimimos por consola
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
