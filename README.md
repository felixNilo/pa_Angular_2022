# Programacion de aplicaciones 2022

## Crearemos una nueva ruta para usuarios

Esta vez, en vez de una ruta get, sera una ruta, post.

`router.post("/", createUsuario);`
Fijese que es la misma ruta que en la peticion get, con la diferencia que es otro tipo de peticion. Para comprobar esto mediante Postman, primero, debemos crear y exportar la funcion createUsuario en el controlador de usuarios.

```
const createUsuario = (req, res) => {
  res.json({
    msje: "Crear usuario",
  });
};
...

module.exports = { getUsuarios, createUsuario };
```

Ahora, vamos a Postman y hagamos una peticion de tipo post a la misma ruta. Deberiamos tener la respuesta:

```
{
    msje: "Crear usuario",
  }
```

Dentro de Postman vemos la opcion de modificar el body de nuestra peticion, desde aqui, podemos agregar datos junto a la peticion de manera que nuestro controlador pueda recibir dicha informacion. De esta forma, simulamos que estamos enviando informacion desde, por ejemplo, un formulario. Por ejemplo, si vamos a body, y luego a la opcion raw, podemos insertar un objeto de tipo JSON que contenga la informacion necesaria de un usuario:

```
{
    "nombre": "Felix",
    "password": "12345",
    "email":"felix@mail.com"
}
```

### Recibamos el body proveniente del cliente

Para recibir la data en nuestro backend debemos incluir un nuevo middleware dado por la funcion json de express.

```//Middleware express.json
app.use(express.json());
```

Con esto, toda peticion sera pasada por la funcion json() antes de entrar a las rutas.
Ahora, desde nuestro controlador, imprimamos por consola el body de la variable de peticion **_req_**.

```
const createUsuario = (req, res) => {
  console.log(req.body);
  res.json({
    msje: "Crear usuario",
  });
};
```

Con esto, si hacemos una peticion POST a la ruta `/` deberiamos ver por consola el body de dicha peticion.

Ya tenemos la informacion, extraigamos los datos desde el body:
` const {email, password, nombre} = req.body;`

Usemos el modelo que hemos creado para cargar los datos y subirlos con mongoose. En este punto, hay que recordar, que, al igual que la funcion que se conecta a la base de datos, la funcion para guardar un dato en Atlas es una promesa, la cual toma tiempo para ser ejecutada. Por esto, declararemos asincrona la funcion que sube el dato y haremos await al momento de subir el documento de usuario.

```
const Usuario = require('../models/usuario');
...
const createUsuario = async (req, res) => {
  //console.log(req.body);
  const {email, password, nombre} = req.body;

  const usuario = new Usuario(req.body);
  await usuario.save();

  res.json({
    msje: "Usuario creado",
    usuario
  });
};
```

En este caso, hemos utilizado el body en su completitud para subir el documento a mongo Atlas, y al momento de crearlo, se responde con un json que entrega un elemento msje y el usuario creado.
Si intentamos subir la misma data, por consola deberiamos ver un error de mongoAtlas, y es que estamos duplicando la llave email.

Si revisamos mongoCompass o mongoAtlas, deberiamos ver la base de datos test, una nueva coleccion llamada usuarios y un documento el cual es el que acabamos de crear. El nombre de la base de datos se creo segun la url de conexion que hemos usado para conectarnos a mongoAtlas.

De manera de practicar y verificar la funcionalidad de crear modelos, borre el documento desde mongoAtlas o mongoCompass para enviar una nueva peticion post agregando un atributo que no este en el modelo. Vera que a pesar de enviar elementos que no estan en el modelo, mientras se envien los datos que son requeridos (**_required_**) mongo creara el documento segun los datos del modelo.
