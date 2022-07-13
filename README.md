# Programacion de aplicaciones 2022

## Comencemos iniciando el servidor

Primero, creemos un archivo en la raiz de nuestro backend llamado index.js
Dentro de el, agregemos una linea de codigo que solo imprima por consola `console.log('Hola mundo')`

Si llamamos a este archivo utilizando node, simplemente nos dara una respuesta por consola dada por **_Hola mundo_**

`node index.js`

Desde index.js vamos a llamar a instanciar express. Recuerden que hemos cambiado de programar en typescript en Angular a programar solo en javascript con express.

### Importemos e inicialicemos el servidor

```
const express = require("express");

//Instanciamos el servidor express en una variable
const app = express();

//Iniciamos el servidor en el puerto 3000 y luego, imprimimos por consola
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

```

Ahora, si ejecutamos nuevamente el index.js mediante node ya podriamos acceder a nuestro servidor mediante el navegador.

`node index.js`

Si accedemos al navegador a nuestra maquina local mediante el puerto 3000, el servidor nos respondera que no puede responder a la peticion y es que no hemos manejado ninguna peticion.

Hasta aqui, cada vez que hagamos un cambio en index.js, deberiamos bajar y volver a subir el servidor, para ello, existe un framework llamado `nodemon` el cual recarga de forma automatica el servidor al detectar cambios.

### Instalemos nodemon

Primero, bajemos el servidor (ctrl + c) e instalemos nodemon mediante el siguiente comando:
`npm install -g nodemon`

Una vez instalado el framework, podemos utilizarlo de igual forma que node: `nodemon index.js`

Si ejecutamos el comando, veremos que ahora el servicio nodemon esta ejecutando el archivo index.js, y si hacemos un cambio en index.js veremos que el servidor se reinicia automaticamente.

### Configuremos un script para iniciar el servidor

Vamos al archivo package.json e ingresemos un nuevo valor en el arreglo de scripts:

```
"scripts": {
    "start:dev": "nodemon index.js"
  },
```

Ahora, cada vez que ingresemos por consola `start:dev`, la consola ejecutara `nodemon index.js`
