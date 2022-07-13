# Programacion de aplicaciones 2022

## Veremos como agregar rutas en nuestro backend

Es importante reconocer como funciona el protocolo http, el cual, entre muchas otras funciones, nos responde con codigos ante las peticiones que se reciben desde uno o mas clientes. Para ello, se ha agregado un archivo pdf que nos indica los codigos de respuesta http.

Con ello, ya podemos avanzar.

### Creemos una ruta ante un get del cliente.

Luego de instanciar la variable app, antes de levantar el servidor, configuraremos una ruta de tipo get:

```
app.get("/", (req, res) => {
  return res.json({
    msje: "Primera respuesta",
  });
});
```

Este codigo hace lo siguiente: luego de recibir un get en la ruta `/`, crea dos variables, una llamada req (de request) y res (de response), luego, retorna con la variable de respuesta (res), un archivo javascript (json) el cual contiene `msje: "Primera respuesta"`.

Ahora, si accedemos a nuestro servidor en la ruta `/`, el servidor ejecutara el codigo de respuesta que acabamos de crear. Javascript, por defecto utilizara la variable de respuesta como elemento a retornar, de esta forma, el return podria no estar en la funcion.

```
app.get("/", (req, res) => {
  res.json({
    msje: "Primera respuesta",
  });
});
```

Si bien, a traves del navegador podemos generar comunicacion con el backend, existe software especializado para gestionar las peticiones al backend. En nuestro caso, utilizaremos Postman para gestionar nuestro backend.
Descarguemos el software en su pagina oficial e instalemoslo.
https://www.postman.com/downloads/?utm_source=postman-home

Estando dentro de Postman, crearemos un request con la misma direccion que ingresamos por el navegador para analizar lo que podemos ver en el software. Con esto, Postman deberia respondernos lo mismo que vemos en el navegador, con la diferencia que podemos guardar la respuesta, guardar la peticion, verificar el codigo de respuesta http, el tiempo que demoro en responder, entre muchos otros elementos que iremos explorando a medida que avancemos.

Desde nuestro index.js, le podemos indicar que entregue un codigo de respuesta de 400 mediante el siguiente codigo: `res.status(400).json({ msje: "Primera respuesta", });`

Esta respuesta (400) indica error por mala peticion, generalmente, esto se entrega como ultima instancia desde el servidor. Dejaremos nuestro index como estaba en un principio.
