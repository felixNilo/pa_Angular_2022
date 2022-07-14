# Programacion de aplicaciones 2022

## ERROR MongooseServerSelectionError: connection <monitor> to...

Durante la ejecucion de nuestra coneccion a la base de datos, es muy probable que el servidor en algun momento nos comience a denegar el acceso. Esto viene desde Atlas, asi es que debemos agregar una nueva direccion IP a nuestro cluster dada por 0.0.0.0.

## Creemos las rutas necesarias para nuestro sistema backend

La idea es que, tras ingresar por ejemplo a la ruta: `/api/usuarios`, el sistema nos entregue los usuarios del sistema.  
Ya hemos visto que la sintaxis `app.get('/')...` que vemos en index va configurando las rutas de nuestro sistema. Pero, si ingresamos todas las rutas en index.js, nuestro codigo seria muy complicado de leer al ser muy extenso.  
Entonces, al igual que los modelos de nuestro sistema backend, crearemos un directorio para las rutas.
Dentro de este directorio crearemos un nuevo archiv llamado usuarios.js el cual contendra todas las rutas a los servicios para el usuario.

### Creando las rutas de usuario

Dentro de usuarios.js importaremos Router desde express, instanciaremos Router, y tal como lo hicimos en el index, configuraremos las rutas de usuarios desde aqui solo que, en vez de utilizar el metodo get desde app, lo utilizaremos desde la instancia de Router.
Recuerde exportar el modulo router.

```
const { Router } = require("express");

const router = Router();

router.get("/api/usuarios", (req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
});

module.exports = router;
```

Ahora, desde index debemos utilizar estas rutas en vez de configurar las rutas desde el index.  
Entonces, en vez de configurar las rutas desde el index, utilizaremos la funcion use, de manera que, cuando nos llegue cierta peticion, repondamos con el modulo que estamos exportando desde usuarios.

```
app.use("/", require("./routes/usuarios"));
```

Podriamos especificar mas aun este uso de rutas, de manera que solo usemos las rutas de usuarios cuando solicitemos datos de usuarios.

```
app.use("/api/usuarios", require("./routes/usuarios"));
```

De esta forma, en nuestra configuracion de rutas de usuarios, solo daremos respuesta ante rutas vacias:

```
router.get("/", (req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
});
```

Ahora, si hacemos una peticion get a la ruta /api/usuarios, nuestro servidor nos respondera el mensaje: **_Primera respuesta_**.

### Ordenemos nuestro enrutador de usuarios

Ya nos podemos imaginar que dentro del archivo de rutas de usuarios, tendriamos que manejar la data que que deberiamos devolver tras peticiones, por ello, es recomendable que esta respuesta ante peticiones se realice fuera del enrutador.

Para ello, creemos una carpeta de controladores en la raiz de nuestro backend y dentro de la carpeta, creemos un archivo llamado usuarios.js el cual retornara datos tras recibir peticiones desde el enrutador.  
De esta forma, la funcion:

```
(req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
}
```

sera realizada por una funcion dentro del controlador usuarios.js

```
const getUsuarios = (req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
};
module.exports = { getUsuarios };
```

Fijese que estamos exportando un objeto que contiene la funcion getUsuarios, y es que, mas adelante, vamos a exportar mas funciones aparte de getUsuarios.

Ahora, desde el enrutador debemos hacer uso de esta funcion tal como lo hemos hecho en ocasiones anteriores. Primero, importamos la funcion desde controllers y luego la usamos en el enrutador.

```
const { getUsuarios } = require("../controllers/usuarios");
...
router.get("/", getUsuarios);
```
