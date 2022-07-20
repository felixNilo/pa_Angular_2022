const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { dbConnection } = require("./database/config");

//Instanciamos el servidor express en una variable
const app = express();

//Middleware CORS
app.use(cors());

//Middleware express.json
app.use(express.json());

//Base de datos
dbConnection();

//Rutas
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/hospitales", require("./routes/hospitales"));
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/todo", require("./routes/todo"));

//Iniciamos el servidor en el puerto 3000 y luego, imprimimos por consola
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto ", process.env.PORT);
});
