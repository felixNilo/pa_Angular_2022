# Programacion de aplicaciones 2022

## Almacenamiento de nuestros datos

Para almacenar los datos que vamos a manejar en nuestro backend, utilizaremos mongoDB y mongoAtlas. MongoDb es un motor de base de datos no relacionales, mientras que mongoAtlas, es un gestor de base de datos que funciona en la nube. Nos entrega la posibilidad de guardar 500MB de forma gratuita asi es que esto sera mas que suficiente para almacenar nuestra base de datos.

Iremos a la pagina oficial de mongoAtlas https://www.mongodb.com/es/cloud/atlas/efficiency

Desde aqui, crearemos una cuenta para crear un cluster con la configuracion por defecto. Para acceder a este cluster de forma sencilla, utlizaremos el software mongoCompass (https://www.mongodb.com/try/download/compass).
Entonces, descarguemos e instalemos mongoDB Compass.

Ya cuando tengamos arriba nuestro cluster e instalado mongoCompass, conectaremos ambos softwares.  
Desde Atlas, en nuestro cluster, daremos click a conectar, crearemos un usuario y contraseña para nuestra base de datos y seleccionaremos conectar la base de datos mediante mongoCompass. Esto nos dara una url que debemos copiar para pegarla en mongoCompass.  
Luego, desde mongoCompass, damos click sobre conectar, ingresamos la url, y reemplazamos el texto `<password>` con la contraseña que hemos creado para la base de datos. Con ello, deberiamos poder conectarnos a mongoAtlas.

### Creemos un usuario para nuestra aplicacion

Desde mongoAtlas, iremos a Database acces para crear un usuario llamado mean_user, el cual sera el usuario que por ahora modificara nuestra base de datos. Creelo solo con autenticacion por contraseña. Una vez tenga el usuario y la contraseña, guarde estas credenciales en el archivo index.js

Conectemonos a mongoAtlas con estas nuevas credenciales.

### Conectemonos desde nuestro servidor al mongoAtlas

Para esto, utilizaremos mongoose.js (https://mongoosejs.com/).
Primero, bajaremos el servido, instalaremos mongoose: `npm install mongoose` y volveremos a iniciar el servidor: `npm run start:dev`
En nuestro directorio de backend crearemos una nueva carpeta que contendra la configuracion de conexion a nuestra base de datos. Cree una carpeta llamada database, y dentro de ella cree un archivo llamado config.js.  
Dentro de este archivo javascript instanciaremos la conexion a la base de datos y exportaremos esa conexion. Ademas utilizaremos nuestra url de acceso que ya hemos usado para conectar compass con Atlas.
Nuestro codigo en config deberia verse algo asi:

```
const mongoose = require("mongoose");
const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mean_user:vKFPXQVGekO0oXYY@cluster0.sajs8.gcp.mongodb.net/test"
    );
    console.log("DB conectada");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha conectado a la DB");
  }
};
module.exports = {
  dbConnection,
};
```

Aqui hay que destacar tres cosas:

1. El conectarse a una base de datos requiere de procedimientos asincronos. Por esto es que, en javascript, usamos async y await, ya que, debemos indicar que proceso es asincrono mediante async, y en que momento debemos esperar respuesta con await.
2. Este procedimiento de conectar a la base de datos, puede no ser exitoso, asi es que, debemos manejar el error cuando no se puede conectar.
3. Exportamos el modulo mediante la funcion exports de la variable global module de javascript.

Con esto claro, podemos importar el modulo que hemos importado desde config.js en nuestro index.js e iniciar la funcion dbConnection() despues de inicializar la variable express.

```
const { dbConnection } = require("./database/config");

const express = require("express");
const { dbConnection } = require("./database/config");

//Instanciamos el servidor express en una variable
const app = express();

//Base de datos
dbConnection();

```
