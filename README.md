# Programacion de aplicaciones 2022

## Crearemos una nueva ruta para actualizar un documento de usuario

Esta ruta debe ser de tipo put y debe recibir el id del usuario que vamos a editar.
` router.put("/:id", actualizarUsuario);`
Fijese que estamos llamando a la funcion actualizarUsuario por lo que debemos de crear dicha funcion de tipo asincrona, tal como hemos hecho en los casos anteriores.

```
const actualizarUsuario = async (req, res = response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msje: "Error inesperado",
    });
  }
};
```

Al actualizar un usuario, podriamos configurar variables de manera de que estas sean requeridas, por ejemplo, el nombre, el email y el rol.

```
router.put("/:id", [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validarCampos,
], actualizarUsuario);
```

Ahora debemos verificar si existe el id en nuestra base de datos.

### Avancemos con el controlador.

Primero, obtengamos el id que viene en la url de la peticion, para ello, debemos acceder a los parametros de la peticion y acceder al valor que hemos especificado en la ruta.

` const uid = req.params.id;`

Enviemos como respuesta este id.

```
 try {
    res.json({
      uid,
    });
  }
```

Con esto ya deberiamos poder ver el id que enviamos por la url.
Con este id, podriamos verificar que el hay un usuario con dicha id, en el caso que no exista, respondemos con un error.

```
try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        msje: "No existe un usuario con la id proporcionada",
      });
    }

    res.json({
      uid,
    });
  } catch (error) {

```

Supongamos que ya hemos recibido el body sin errores, habran campos que vamos a recibir pero que no deberiamos sobreescribir, por ejemplo, el password y el boolean de google. Por ello, primero modificaremos el body borrando estos campos y luego actualizaremos el usuario.

```
try {
    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        msje: "Usuario creado",
        msje: "No existe un usuario con la id proporcionada",
      });
    }

    const campos = req.body;

    if (usuarioDB.email === req.body.email) {
      //El usuario no esta cambiando su email, asi es que, para no sobreescribir el email, lo borramos
      delete campos.email;
    } else {
      //El usuario esta cambiando su email
      //Verificar si el email que queremos ingresar no existe en la base de datos
    }

    delete campos.password;
    delete campos.google;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      msje: "Usuario actualizado",
      usuario: usuarioActualizado,
    });
  }
```

Al momento de actualizar por id, le entregamos el atributo `new:true` el cual le indica a la funcion que devuelva el usuario actualizado. Si esto no estuviera, mongoose nos entregaria el usuario que fue actualizado.

Intente hacer put de la id de un usuario creado entregandole el nombre, password, google, e email. Fijese que a pesar de que no hemos entregado el rol, aun asi nos permite actualizar el usuario y es que aun no validamos que este sea un filtro para generar la actualizacion.

Ahora, si intentamos actualizar el email de un usuario con email que ya existe el sistema se caera.

Manejemos ese error en el controlador.

```
        //El usuario esta cambiando su email
         //Verificar si el email que queremos ingresar no existe en la base de datos
      const existeEmail = await Usuario.findOne({ email: req.body.email });
      if (existeEmail) {
        return res.status(400).json({
          msje: "Ya existe un usuario con el email",
        });
```

Con esto, el sistema ya no deberia caerse al intentar actualizar el email de un usuario con un email que ya existe.

Faltaria agregar TOKENS que permitan que solo un usuario con permisos superiores pueda actualizar usuarios o que un usuario pueda actualizar solo datos del mismo usuario.
