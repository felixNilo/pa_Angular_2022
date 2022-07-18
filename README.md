# Programacion de aplicaciones 2022

## Comenzaremos a verificar que las credenciales sean validas

Crearemos una nueva ruta para el proceso de autenticar. Para ello, crearemos un nuevo archivo de rutas llamado auth.js.  
A su vez, debemos indicar que este archivo sera el encargado de manejar las rutas en nuestro index principal del servidor. ` app.use("/api/login", require("./routes/auth"));`

Sabemos que tenemos que importar el metodo Router de express en nuestro archivo de rutas, instanciar este router en una variable, configurar los metodos para las rutas y exportar esta variable.

```
/*
Path: '/api/login'
*/

const { Router } = require("express");

const router = Router();

router.post("/", []);

module.exports = router;
```

Tambien debemos crear la funcion controladora para el login en nuevo archivo llamado auth.js dentro de controllers. Recuerde que la funcion debe ser asincrona, debe manejar errores, y ademas, en el controlador, debemos exportar las funciones que manejan las peticiones.

```
const { response } = require("express");

const login = async (req, res = response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error en el auth login",
    });
  }
};

module.exports = {
  login,
};

```

Con el controlador exportado, ya podemos llamarlo en el metodo post: `router.post("/", [], login);`

Para verificar que este todo okey, podriamos responder con el controlador un hola mundo mediante protocolo http.

```
try {
    res.status(200).json({
      msje: "Hola mundo",
    });
  }
```

Una vez que verifiquemos que estemos recibiendo respuesta con una peticion POST a `/api/login` ya podemos comenzar a utilizar los middlewares para verificar que viene el email y la contraseña en nuestro post.

```
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
```

Ahora, verifiquemos que esto funciona enviando un post sin datos en el body, con ello, nuestro middleware deberia responder con los mensajes que hemos configurado, mientras que, si enviamos email y password en el body, nuestro servidor deberia respondernos con un status 200 y un msje con Hola mundo.

### Extraigamos el email y pass del body en el controlador

Al igual que los casos anteriores, debemos extraer los elementos que vienen en el body de la peticion, crear una variable de tipo modelo de Usuario y verificar:

1. Que exista el usuario buscandolo por el email
2. Si existe un usuario con el email entregado, verificar que la contraseña coincida
3. Si la contraseña coincide debemos generar un token de usuario registrado

Para realizar el segundo paso debemos desencriptar la contraseña utilizando bcrypt, asi es que, tal como en el controlador de usuarios, debemos importar bcrypt.

```
const bcrypt = require("bcrypt");

...

const { email, password } = req.body;

  try {
    //Verificar email
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        msje: "Email no encontrado",
      });
    }

    //Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      return res.status(400).json({
        msje: "Contraseña no valida",
      });
    }

    //Generar Token JWT (lo haremos mas adelante)
    res.status(200).json({
      msje: "Todo okey",
    });

  }
```
