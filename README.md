# Programacion de aplicaciones 2022

## Validemos las rutas con el token generado

Primero, debemos dejar claro que todas las rutas que deberian ser sensibles al rol del usuario deberian contener el token, o mas bien, el token deberia ser comunicado en algun lugar de la peticion.  
Usaremos el header de la peticion para guardar el token.
Primero, generaremos un middleware que valide el token. Para ello, crearemos un archivo en middlewares llamado validarJWT. En este archivo tendremos la funcion que valide el JWT, el cual, debe leer el header de la peticion en algun atributo. Podriamos llamarle al atributo que contendra el token **_x-token_**.

```
const validarJWT = (req, res, next) => {
  //Leer token
  const token = req.header("x-token");

  console.log(token);

  next();
};

module.exports = {
  validarJWT,
};
```

Ahora, llamemos el middleware cuando solicitemos lo usuarios para verificar que estamos accediendo al valor x-token. Por ello, en postman, solicitaremos la funcion get para obtener los usuarios y agregaremos al header el atributo x-token con algun valor arbitrario.

Llamemos el middleware:

```
router.get("/", validarJWT, getUsuarios);
```

Ahora, generemos el llamado de la funcion getUsuarios agregando al header el atributo **_x-token_**

Por consola, deberiamos poder ver que nuestro atributo en el header esta siendo leido.

### Filtremos cuando no exista un token

Simplemente, debemos filtrar cuando no haya un token. En dicho caso, responderemos con un error 404 y un mensaje que indique que no hay token.

```
if(!token){
    return res.status(401).json({
        msje: "No hay token"
    })
  }
```

Luego de ello, debemos verificar la validez del token, para ello, usaremos la funcion verify de jwt el cual requiere del token que queremos verificar y la clave que hemos generado en el entorno. Como esto puede generar un error (en el caso que el token no sea valido), esto debe estar dentro de un try catch. Ahora, en el caso que la funcion verify, valide el token, nos entregara el payload, el cual contiene la id del usuario.

```
const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next) => {
  //Leer token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msje: "No hay token",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(uid);
  } catch (error) {
    return res.status(401).json({
      msje: "Token no valido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};

```

Probemos nuestra funcion pasandole a nuestro header un token invalido y un token valido.

### Agreguemos un atributo a la request cuando el token sea valido

Suponiendo que el token es valido, podriamos agregar la id del usuario a la request de manera que podamos recuperar la id en otro controlador. Ademas, para hacer el codigo mas limpio, podriamos agregar el next luego de generar el codigo indicado anteriormente.

```
try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(uid);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      msje: "Token no valido",
    });
  }
```

Con esto, ya podemos saber que usuario esta haciendo peticiones ya que tendremos registrada la id del usuario en la peticion. Compruebe ello imprimiendo la id del usuario cuando se envian los usuarios en la funcion getUsuarios.

```
const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email");

  res.json({
    msje: "usuarios",
    usuarios,
    uid: req.uid
  });
};
```

Realicemos lo mismo al momento de actualizar el usuario. Claro esta que, si no hay token, nisiquiera deberiamos verificar si hay errores en los campos, asi es que validamos el token primero que todo.

```
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);
```

Lo mismo para borrar un usuario.

```
router.delete("/:id", validarJWT, borrarUsuario);
```
