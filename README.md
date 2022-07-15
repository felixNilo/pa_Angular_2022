# Programacion de aplicaciones 2022

## Creemos nuestro propio middleware

Esto con el fin de que se evite acceder al controlador en caso de que la funcion check detecte un error.
Para ello, crearemos un directorio llamado middlewares, y al interior crearemos un archivo llamado validar-campos.js  
Dentro de validar-campos realizaremos una funcion para la validacion de los errores que podrian generarse tras funciones check. Incorporaremos a la funcion una nueva variable denominada next, la cual indicara a la funcion padre que continue con la siguiente operacion.

```
const { response } = require("express");
const { validationResult } = require("express-validator");
const validarCampos = (req, res = response, next) => {
  const errores = validationResult(req);
  if (errores) {
    return res.status(400).json({
      msje: "Se detectaron errores",
      errors: errores.mapped(),
    });
  }

  next();
};

module.exports = { validarCampos };
```

Vemos que es basicamente lo mismo que hemos hecho en el controlador de crear usuarios, de esta forma, ya no vamos a necesitar que esto se realice desde dicho controlador.

### Usemos el middleware

Finalmente, dentro del manejador de rutas, luego de instanciar las funciones check, instanciaremos nuestra funcion que acabamos de crear.

```
const { validarCampos } = require("../middlewares/validar-campos");
...
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos(),
  ],
  createUsuario
);
```

En terminos empiricos, nuestra aplicacion deberia estar funcionando de la misma forma. Pero, a nivel de codificacion, hemos mejorado nuestro codigo ya que ahora podemos validar los campos utilizando el middleware que acabamos de crear, de manera de evitar sobreescribir codigo.
