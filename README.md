# Programacion de aplicaciones 2022

## Validemos el save del usuario

Partamos creando un procedimiento try/catch de manera que intente crear el usuario y si es que hay un error, responda un status(500).

```
const createUsuario = async (req, res = response) => {
  //console.log(req.body);
  const { email, password, nombre } = req.body;
  try {

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
      msje: "Usuario creado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        msje: "Error inesperado... revisar logs"
    })
  }
};
```

Con esto, solo intentamos que se cree el usuario, pero no estamos filtrando un error especifico. Vemos ademas, que hemos importado `response` de express. Esto, principalmente, para que dentro de la funcion, siempre se cree una respuesta, a pesar de que haya error. Recuerdan que antes solo respondiamos cuando todo iba bien?, ahora queremos responder cuando algo este mal, entonces, debemos especificar que siempre habra una respuesta de tipo response.

### Filtremos el error de duplicacion de email.

Para filtrar el error por duplicacion de email, intentemos buscar un documento por email, si encuentra un documento entonces genere una respuesta http 400 y avise mediante un json:

```
try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        msje: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.json({
      msje: "Usuario creado",
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error inesperado... revisar logs",
    });
  }
```

Ahora, si intentamos crear un usuario con un email ya registrado, nuestro backend seguira en pie y nos avisara que el email ya fue registrado. Mientras que, si creamos un usuario con un email que no ha sido registrado, el usuario se creara.

### Validando con Express-validator

Ya nos podemos imaginar que deberiamos hacer una serie de if para informar de forma mas precisa los errores que puedan generarse a la hora de hacer save a un documento en mongo. Por ello, y para facilitar la tarea de desarrollo, existe una libreria que permite generar validaciones de este tipo.  
Instalemos express-validator: `npm install express-validator`. Esta libreria entrega funciones middleware que pueden ser utilizadas en antes de acceder a un controlador de cierta peticion. En este caso, utilizaremos la funcion check 3 veces, antes de ejecutar el controlador de post para usuarios.  
Para esto, debemos saber que la sintaxis para utilizar middlewares en rutas es la siguiente:

```
router.<peticion>(<ruta>, middleware, controlador)
```

Fijese que middleware es solo uno, aunque, este puede ser un arreglo que contenga varios middleware en su interior. En nuestro caso utilizaremos 3 veces la funcion check, de manera de verificar que `nombre` y `password` no se encuentren vacios y que `email` es un email.

```
router.post(
  "/",
  [
    check("nombre").not().isEmpty(),
    check("password").not().isEmpty(),
    check("email").isEmail(),
  ],
  createUsuario
);
```

Si probamos esto con un body que le falte un dato requerido:

```
{
    "nombre": "Felix",
    "password": "12345"
}
```

Pareciera ser que no haya ninguna validacion. De hecho, el backend se cae. Aunque, en verdad, si se hace la validacion, solo debemos atrapar los resultados de la validacion en nuestro controlador.

```
const { validationResult } = require("express-validator");
...
const createUsuario = async (req, res = response) => {
  //console.log(req.body);
  const { email, password, nombre } = req.body;
  const errores = validationResult(req);
  if (errores){
    return res.status(400).json({
        msje: "Se detectaron errores",
        errors: errores.mapped()
    })
  }
  ...
}
```

Si probamos esto ya tenemos una respuesta del servidor permitiendo asi que el servidor siga con vida. Aunque, los errores que vemos mapeados no son muy descriptivos. Para ello, podriamos agregar en el middleware algun string que nos especifique el error.

```
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
  ],
  createUsuario
);
```
