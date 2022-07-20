# Programacion de aplicaciones 2022

## Nos interiorizaremos con lo que se denomina paginacion

Basicamente, una paginacion es ordenar por cantidad de items cierto arreglo. De esta forma, cuando paginamos cierta peticion, ahorramos tiempo ya que limitamos la cantidad de items que retornamos al cliente.
Como se pueden imaginar hay muchas formas de paginar. En este caso, paginaremos mediante el envio de los limites desde la url.

### Agreguemos mas registros de usuario para aplicar la paginacion

De manera de comenzar a paginar, creemos varios usuarios para comenzar a generar nuestra paginacion al momento de retornar los usuarios del sistema.
Una vez que creemos varios usuarios, podremos ver que al momento de hacer peticion get de usuarios, el servidor nos responde con todos los usuarios. En el caso que sean muchos usuarios el servidor podria tomar mucho tiempo en devolver todo, es por ello que se recomienda paginar.

### Funcion limit de mongoose

Con limit, podemos indicar cuantos elementos queremos que retorne las funciones de peticiones de mongo. Limitemos nuestras peticiones a 5. Es decir, siempre nos va a devolver 5 items. Ahora, desde donde deberiamos partir devolviendo items? Este valor, como hemos indicado, queremos que venga de la url, y en caso que no venga, que sea por defecto.

Con express.js es bastante sencillo realizar esto, basta con acceder al parametro de la query del request. `req.query.<parametro>`
Entonces, si nuestra url es: `http://localhost:3000/api/usuarios?desde=5`, `req.query.desde` sera igual a **5**. Pero ese sera leido como un string, solo queda transformalo a numero mediante la funcion casting **_Number_**:

```
const desde = Number(req.query.desde) || 0;
```

Ahora que tenemos desde donde partir, podemos usar la funcion skip de mongoose para saltar items hasta la variable numerica **_desde_**.

### Nuestra paginacion

```
const usuarios = await Usuario.find({}, "nombre email").skip(desde).limit(5);
```

Podriamos agregar a la respuesta de la peticion la cantidad de usuarios que existen en la coleccion usuarios. Esto nos permitira analizar una nueva funcionalidad de Angular.

```
const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

  const usuarios = await Usuario.find({}, "nombre email").skip(desde).limit(5);

  const total = await Usuario.count();

  res.json({
    msje: "usuarios",
    usuarios,
    uid: req.uid,
    total,
  });
};
```

Si bien, esto funciona, podemos analizar que tenemos dos funciones await en nuestro controlador, es decir, para que se ejecute el segundo await, debe terminar de ejecutarse el primero.  
En Angular (mas bien en EcmaScript6) existe la funcion all de Promise, la cual ejecuta promesas de forma simultanea. De esta forma, disminuimos el tiempo de ejecucion de nuestro controlador.

```
  const [usuarios, total] = await Promise.all([
    Usuario.find({}, "nombre email").skip(desde).limit(5),
    Usuario.count(),
  ]);
```

Con esto, hemos hecho que nuestro controlador de getUsuarios retorne los usuarios paginados y de la forma mas eficiente posible.
